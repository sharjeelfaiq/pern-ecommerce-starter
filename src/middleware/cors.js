import { env } from "#config/index.js";

const { FRONTEND_URL, DASHBOARD_URL } = env;

export const corsOptions = {
  origin: [FRONTEND_URL, DASHBOARD_URL],
  credentials: true,
};
