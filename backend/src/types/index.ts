export interface EmailJobPayload {
  email: string;
  content: string;
}

export interface ApiResponse {
  success: boolean;
  jobId?: string;
  message: string;
  error?: string;
}
