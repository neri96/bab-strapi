import { Request, Response } from "express";
import { validationResult } from "express-validator";

import ShortUniqueId from "short-unique-id";

import Catering from "../model/Catering";

import { sendEmail } from "../utils/email";

export const some = async (req: Request, res: Response) => {
  const { category } = req.query;

  try {
    const catering = await Catering.find({ category }).select(
      "-category -__v -updatedAt -createdAt"
    );

    return res.status(200).json(catering);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const add = async (req: Request, res: Response) => {
  const { name, category, description } = req.body;

  try {
    const uid = new ShortUniqueId({ length: 10 });

    const newCateringDish = new Catering({
      id: uid(),
      name,
      category,
      image: req.file?.filename,
      description,
    });

    await newCateringDish.save();

    newCateringDish.category = category._id;

    return res.status(201).json("Catering dish has been successfully created");
  } catch (error) {
    console.log(error);

    return res.status(500).json("Something went wrong");
  }
};

export const send = async (req: Request, res: Response) => {
  const { name, email, phone, location, date, guests, message } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json("Invalid values");
    }

    await sendEmail({
      email: process.env.INBOUND_EMAIL as string,
      subject: `Catering request`,
      html: `
        <h3>Name: ${name}</h3>
        <h3>Email: ${email}</h3>
        <h3>Phone number: ${phone}</h3>
        <h3>Guests: ${guests}</h3>
        <h3>Location: ${location}</h3>
        <h3>Date: ${date}</h3>
        ${message ? `<p>${message}</p>` : ""}
      `,
    });

    return res
      .status(200)
      .json(
        "Your catering request has been sent, it will be reviewed as soon as possible"
      );
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
