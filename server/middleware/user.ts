import JWT from "jsonwebtoken";
import type { User } from "@prisma/client";

declare module "h3" {
  interface H3EventContext {
    user: Omit<User, "password"> | null;
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, "nuxt-prisma-auth_token");

  if (!token) {
    event.context.user = null;
  } else {
    try {
      const user = JWT.verify(token, config.auth.secret) as Omit<
        User,
        "password"
      >;

      event.context.user = user;
    } catch (_) {
      event.context.user = null;
    }
  }
});
