import z from "zod";

const jobSchema = z.object({
  email: z.string().email(),
  content: z.string().min(5),
});
