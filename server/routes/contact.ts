import express, { Request, Response } from "express";
const router = express.Router();

import { check, validationResult } from "express-validator";

import { sendEmail } from "../utils/email";
import { errorSort } from "../utils/errors";

router.post(
  "/send",
  [
    check("email", "Invalid format").isEmail().isLength({ max: 30 }),
    check("name", "Name length should be 10 to 20 characters").isLength({
      min: 2,
      max: 40,
    }),
    check("phone", "Invalid format").isLength({
      min: 10,
      max: 10,
    }),
    check(
      "message",
      "Message must contain between 150 to 3000 characters"
    ).isLength({
      min: 150,
      max: 3000,
    }),
  ],
  async (req: Request, res: Response) => {
    const { name, email, phone, message } = req.body;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = errorSort(errors.mapped());

        return res.status(400).json(err);
      }

      await sendEmail({
        email: process.env.INBOUND_EMAIL as string,
        subject: `Message from ${name}`,
        html: `
          <h3>Name: ${name}</h3>
          <h3>Email: ${email}</h3>
          <h3>Phone number: ${phone}</h3>
          <p>${message}</p>
        `,
      });

      return res
        .status(200)
        .json(
          "Your message has been sent, it will be reviewed as soon as possible"
        );
    } catch (error) {}
  }
);

export default router;
