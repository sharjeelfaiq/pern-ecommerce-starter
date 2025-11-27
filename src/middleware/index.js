import cors from "cors";
import xss from "xss-clean";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@as-integrations/express4";

// eslint-disable-next-line no-unused-vars
import { logTheme } from "./colors.js";
import { corsOptions } from "./cors.js";
import { apiRateLimiter } from "./rate-limiter.js";
import { tokenUtils } from "#utils/index.js";

export const setupMiddleware = (app, apolloServer) => {
  app.use(helmet()); // secure HTTP headers

  app.use(compression()); // res compression

  app.use(cookieParser()); // parse cookies

  (app.use(cors(corsOptions)),
    app.use(
      "/graphql",
      cors(corsOptions),
      apiRateLimiter,
      express.json({ limit: "10mb" }),
      xss(), // sanitize input
      expressMiddleware(apolloServer, {
        context: ({ req, res }) => {
          let user = null;

          const accessToken = req.cookies["accessToken"];
          if (accessToken) {
            try {
              user = tokenUtils.verify(accessToken);
            } catch {
              user = null;
            }
          }

          return { user, req, res };
        },
        csrfPrevention: true, // optional for browser clients
      }),
    ));
};
