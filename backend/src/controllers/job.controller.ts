import { Request, Response } from "express";
import z from "zod";
import { ApiResponse } from "../types/index.js";

const JobSchema = z.object({
  email: z.email({ error: "Please Enter a valid email" }),
  content: z.string().min(5, { error: "Email content is very short " }),
});

export const dispatchTask = async (
  req: Request,
  res: Response<ApiResponse>,
): Promise<any> => {};
