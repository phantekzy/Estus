import { Request, Response } from "express";
import z from "zod";
import { ApiResponse, EmailJobPayload } from "../types/index.js";
import { emailQueue } from "../queues/email.queue.js";

const JobSchema = z.object({
  email: z.email({ error: "Please Enter a valid email" }),
  content: z.string().min(5, { error: "Email content is very short " }),
});

export const dispatchTask = async (
  req: Request,
  res: Response<ApiResponse>,
): Promise<any> => {
  try {
    const payLoad: EmailJobPayload = JobSchema.parse(req.body);
    const job = await emailQueue.add("process-email", payLoad, {
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
    });
    return res.status(202).json({
      success: true,
      jobId: job.id,
      message: "Task dispatched to worker",
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: "Payload validation failed",
      error: err.errors?.[0]?.message || "Invalid input",
    });
  }
};
