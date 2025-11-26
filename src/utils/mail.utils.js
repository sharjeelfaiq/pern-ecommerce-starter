import { readFile, access, constants } from "fs/promises";
import path, { dirname, join } from "path";
import createError from "http-errors";
import { fileURLToPath } from "url";

import { env, transporter } from "#config/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VIEWS_DIRECTORY = path.join(__dirname, "../views");
const { USER_EMAIL, NODE_ENV } = env;

// Supported email types
const SUPPORTED_HTML_TEMPLATES = ["otp-email", "verification-email", "reset-email"];

// In-memory template cache
const templateCache = new Map();

// Escape HTML special characters
const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Read template with caching
const getEmailTemplate = async (type, templateName = "index.html") => {
  const cacheKey = `${type}/${templateName}`;
  if (templateCache.has(cacheKey)) return templateCache.get(cacheKey);

  const filePath = join(VIEWS_DIRECTORY, type, templateName);
  try {
    await access(filePath, constants.R_OK);
    const template = await readFile(filePath, "utf-8");
    templateCache.set(cacheKey, template);
    return template;
  } catch (error) {
    throw createError(
      500,
      `Failed to load email template "${type}/${templateName}": ${error.message}`,
    );
  }
};

// Replace variables in template
const processTemplate = (template, variables) => {
  return Object.entries(variables).reduce(
    (processed, [key, value]) =>
      processed.replace(new RegExp(`\\$\\{${key}\\}`, "g"), escapeHtml(String(value))),
    template,
  );
};

// Send email via transporter
const sendMail = async ({ to, subject, html }) => {
  try {
    return await transporter.sendMail({ from: USER_EMAIL, to, subject, html });
  } catch (error) {
    if (NODE_ENV !== "production") console.error("[Email Send Error]", error);
    throw createError(500, "Failed to send email.");
  }
};

/**
 * Send an email
 * @param {string} type - Template folder type (must be in SUPPORTED_HTML_TEMPLATES)
 * @param {object} options - { email, subject, ...variables }
 */
export const sendEmail = async (type, options) => {
  if (!SUPPORTED_HTML_TEMPLATES.includes(type)) {
    throw createError(
      400,
      `Invalid email type: "${type}". Supported types: ${SUPPORTED_HTML_TEMPLATES.join(", ")}`,
    );
  }

  const { email, subject, ...variables } = options;
  if (!email || !subject) throw createError(400, "Email and subject are required.");

  const template = await getEmailTemplate(type);
  const html = processTemplate(template, { ...variables, email });

  return sendMail({ to: email, subject, html });
};
