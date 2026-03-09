import { Queue } from "bullmq";
import { EmailJobPayload } from "../types/index.js";
import { redisConfig } from "../config/redis.js";

const QUEUE_NAME = "email_tasks";

export const emailQueue = new Queue<EmailJobPayload>(QUEUE_NAME, {
  connection: redisConfig,
});
