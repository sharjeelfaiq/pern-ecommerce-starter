import { PrismaClient } from "@prisma/client";

import { env } from "./env.config.js";
import { logger } from "#utils/index.js";

const prisma = new PrismaClient();
const { DATABASE_URL } = env;

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    logger.info(`[connected] Database (url: ${DATABASE_URL})`.service);
  } catch (error) {
    logger.error(`[connection_failed] Database (error: ${error.message})`.error);
    process.exit(1);
  }
};

export { prisma };
