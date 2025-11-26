import depthLimit from "graphql-depth-limit";

import { ApolloServer } from "@apollo/server";
import { typeDefs, resolvers } from "#modules/index.js";

const requestLoggerPlugin = {
  async requestDidStart(requestContext) {
    const { request } = requestContext;
    const operationName = request.operationName || "Unnamed";
    const query = request.query ? request.query.replace(/\s+/g, " ").trim() : "";
    const variables = request.variables || {};
    const hasInlineArgs = query.includes("{") && Object.keys(variables).length === 0;

    console.group(`[GraphQL Request] ${operationName}`);
    console.log("Query:", query);
    if (Object.keys(variables).length > 0) {
      console.log("Variables:", JSON.stringify(variables, null, 2));
    } else if (hasInlineArgs) {
      console.log("Variables: None (inline arguments used)");
    }
    console.groupEnd();

    return {
      async willSendResponse({ response }) {
        const status = response.http?.status || "OK";
        const payload = response.body?.singleResult || response.body || {};
        console.group(`[GraphQL Response] ${operationName}: ${status}`);
        console.log("Response:", JSON.stringify(payload, null, 2));
        console.groupEnd();
      },
    };
  },
};

const formatError = (error) => {
  console.error("GraphQL Error:", {
    message: error.message,
    path: error.path,
  });

  return {
    message: error.message || "An unexpected error occurred.",
    path: error.path || [],
  };
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
  allowBatchedHttpRequests: true,
  validationRules: [depthLimit(5)], // prevent very deep queries
  plugins: [requestLoggerPlugin],
});
