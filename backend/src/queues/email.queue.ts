import { Queue, Worker, type Job } from "bullmq";
import { redisConfig } from "../config/redis.js";
import { EmailJobPayload } from "../types/index.js";

const QUEUE_NAME = "email-tasks";

export const emailQueue = new Queue<EmailJobPayload>(QUEUE_NAME, {
  connection: redisConfig,
});

export const emailWorker = new Worker<EmailJobPayload>(
  QUEUE_NAME,
  async (job: Job<EmailJobPayload>) => {
    const { email, content } = job.data;
    console.log(`[Worker] Processing Job ${job.id} targeting ${email}`);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(`[Worker] Job ${job.id} execution completed.`);
    return { status: "success" };
  },
  { connection: redisConfig },
);

emailWorker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed: ${err.message}`);
});
