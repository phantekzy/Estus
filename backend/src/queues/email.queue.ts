import { Job, Queue, Worker } from "bullmq";
import { EmailJobPayload } from "../types/index.js";
import { redisConfig } from "../config/redis.js";

const QUEUE_NAME = "email-tasks";

export const emailQueue = new Queue<EmailJobPayload>(QUEUE_NAME, {
  connection: redisConfig,
});

export const emailWorker = new Worker<EmailJobPayload>(
  QUEUE_NAME,
  async (job: Job<EmailJobPayload>) => {
    const { email, content } = job.data;
    console.log(`[Worker] Processing Job ${job.id} targeting {email}`);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(`[Workder] Job ${job.id} execution completed`);
    return { status: "success" };
  },
  { connection: redisConfig },
);
