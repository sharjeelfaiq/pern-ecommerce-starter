import dotenv from "dotenv";
import { cleanEnv, str, port, email, url, testOnly } from "envalid";

import { logger } from "#utils/index.js";

dotenv.config();

const validators = {
  PORT: port({ devDefault: 3000, desc: "Port number" }),
  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development",
    desc: "Environment type",
  }),

  BACKEND_URL: url({ desc: "Backend URL" }),
  FRONTEND_URL: url({ desc: "Frontend URL" }),
  DASHBOARD_URL: url({ desc: "Dashboard URL" }),

  DATABASE_URL: url({ desc: "Database Connection String" }),

  JWT_SECRET: str({
    devDefault: testOnly("test-secret"),
    desc: "JWT secret key",
  }),

  EMAIL_HOST: str({ desc: "Email host" }),
  EMAIL_PORT: port({ desc: "Email port" }),
  USER_EMAIL: email({ desc: "Email address" }),
  USER_PASSWORD: str({ desc: "Email password" }),

  SUPER_ADMIN_ID: str({ desc: "Super admin id" }),
  SUPER_ADMIN_EMAIL: email({ desc: "Super admin email" }),
  SUPER_ADMIN_NAME: str({ desc: "Super admin name" }),
  SUPER_ADMIN_PASSWORD: str({ desc: "Super admin password" }),
};

export const env = cleanEnv(process.env, validators, {
  reporter: ({ errors }) => {
    const invalidVars = Object.keys(errors);
    if (invalidVars.length > 0) {
      logger.error(`Invalid ENV variables: ${invalidVars}`);
      process.exit(1);
    }
  },
});
