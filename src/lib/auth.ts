import crypto from "crypto";

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET environment variable is not set");
  }
  return secret;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(username: string): string {
  const payload = `${username}.${Date.now() + SESSION_TTL_MS}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const parts = decoded.split(".");
    if (parts.length !== 3) return false;
    const [username, expiresAt, signature] = parts;
    const expected = sign(`${username}.${expiresAt}`);
    const expectedBuf = Buffer.from(expected);
    const signatureBuf = Buffer.from(signature);
    if (expectedBuf.length !== signatureBuf.length) return false;
    if (!crypto.timingSafeEqual(expectedBuf, signatureBuf)) return false;
    return Date.now() < Number(expiresAt);
  } catch {
    return false;
  }
}

export function verifyCredentials(username: string, password: string): boolean {
  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;
  if (!validUsername || !validPassword) return false;

  const usernameBuf = Buffer.from(username);
  const validUsernameBuf = Buffer.from(validUsername);
  const passwordBuf = Buffer.from(password);
  const validPasswordBuf = Buffer.from(validPassword);

  const userMatch =
    usernameBuf.length === validUsernameBuf.length &&
    crypto.timingSafeEqual(usernameBuf, validUsernameBuf);
  const passMatch =
    passwordBuf.length === validPasswordBuf.length &&
    crypto.timingSafeEqual(passwordBuf, validPasswordBuf);

  return userMatch && passMatch;
}
