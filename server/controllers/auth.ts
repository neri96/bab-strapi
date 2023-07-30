require("dotenv").config();

import { Request, Response } from "express";

import crypto from "crypto";
import bcrypt from "bcrypt";

import { validationResult } from "express-validator";

import User from "../model/User";

import { createToken, decode } from "../utils/jwt";
import { sendEmail } from "../utils/email";
import { recapValidate } from "../utils/recapVerif";

import { JwtPayload } from "jsonwebtoken";
import { TokenData } from "../ts/interfaces";

const setTokens = (input: { id: string; name: string; email: string }) => {
  const accessToken = createToken(input, "1min");
  const refreshToken = createToken(input, "7d");

  return { accessToken, refreshToken };
};

const setCookies = (res: Response, token: string) => {
  const now = new Date();

  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    expires: new Date(now.setDate(now.getDate() + 7)),
  });
};

export const login = async (req: Request, res: Response) => {
  const { name, password, recapToken } = req.body;

  try {
    const recapValid = await recapValidate(recapToken);

    if (!recapValid) {
      return res.status(404).json("Validation failed");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json("Invalid values");
    }

    const user = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
      active: true,
    });

    if (!user) return res.status(404).json("Invalid credentials");

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) return res.status(404).json("Invalid credentials");

    const tokenInput: TokenData = {
      id: String(user._id),
      name,
      email: user.email!,
    };

    const { accessToken, refreshToken } = setTokens(tokenInput);

    setCookies(res, refreshToken);

    const { id, name: userName, role } = user;

    return res.status(200).json({
      id,
      userData: {
        name: userName,
        role,
      },
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json("Invalid values");
    }

    const existingUser = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (existingUser) return res.status(409).json("User already exists");

    const hashedPass = await bcrypt.hash(password, 10);

    const url = process.env.CLIENT;
    const confirmLink = crypto.randomBytes(20).toString("hex");

    await new User({
      name,
      email,
      password: hashedPass,
      confirmLink,
    }).save();

    try {
      await sendEmail({
        email,
        subject: "Babushka Market, Deli & Cafe, email confirmation",
        html: `
      <h1>Babushka Market, Deli & Cafe</h1>
      <p>Welcome to Babushka! In order to confirm your account, please click the button down below</p>
      <a href='${url + "/confirmation/" + confirmLink}'>
        <button style="background:red">Confirm account</button>
      </a>
      ----
      Babushka Market, Deli & Cafe
      1475 Newell Avenue Walnut Creek, CA, 94521
    `,
      });
    } catch (error) {
      return res.status(500).json("Something went wrong");
    }

    return res.status(200).json("Account has been successfully created");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const confirm = async (req: Request, res: Response) => {
  const confirmLink = req.body.link;

  try {
    const user = await User.findOne({ confirmLink });

    if (user) {
      user.active = true;
      await User.updateOne({ _id: user._id }, { $unset: { confirmLink: 1 } });

      await user.save();

      return res.status(200).json({ confirmed: true });
    }
    return res.status(200).json({ confirmed: false });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(200).json("User is not authenticated");

    const userData = decode(token);

    if (!userData) return res.status(400).json("User data is not found");

    const user = await User.findOne({ _id: (userData as JwtPayload).id });
    if (!user) return res.status(400).json("User is not found");

    const { _id: id, name, email, role }: any = user;

    const accessToken = createToken({ id, name, email }, "15min");

    return res.status(200).json({
      id,
      userData: {
        name,
        role,
      },
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    return res.status(200).json("Logged out");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
