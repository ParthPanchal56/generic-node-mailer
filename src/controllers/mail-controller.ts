import { Request, Response } from "express";
import { sendMail } from "../services/mailer-service";

export const sendMailToUser = async (req: Request, res: Response) => {
  try {
    const { to, subject, templateName, data } = req.body;
    await sendMail(to, subject, templateName, data);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
