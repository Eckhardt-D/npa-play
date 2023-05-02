import { verify } from "argon2";
import { DateTime } from "luxon";
import JWT from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const user = await event.context.prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    navigateTo("/auth");
    return;
  }

  if (!(await verify(user.password, password))) {
    navigateTo("/auth");
    return;
  }

  const config = useRuntimeConfig();
  const clientUser = { id: user.id, email: user.email, name: user.name };
  const token = JWT.sign(clientUser, config.auth.secret);

  setCookie(event, "nuxt-prisma-auth_token", token, {
    expires: DateTime.now().plus({ days: 7 }).toJSDate(),
    sameSite: "strict",
  });

  return clientUser;
});
