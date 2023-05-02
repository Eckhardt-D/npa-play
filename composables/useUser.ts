import type { User } from "@prisma/client";
type ClientUser = Omit<User, "password">;

export default () => {
  const user = useState<ClientUser | null>("user");

  const signIn = async (email: string, password: string) => {
    const response = await $fetch("/api/auth", {
      redirect: "follow",
      method: "PUT",
      body: {
        email,
        password,
      },
    });

    if (response) {
      user.value = response;
    }
  };

  const signOut = () => {
    const cookie = useCookie("nuxt-prisma-auth_token");

    if (cookie.value) {
      cookie.value = null;
    }

    user.value = null;
    useRouter().push("/auth");
  };

  const getUser = async () => {
    if (user.value) return user.value;
    const response = await $fetch("/api/user", {
      headers: {
        cookie: useRequestHeaders().cookie ?? "",
      },
    });

    if (!response?.user) {
      return null;
    }

    user.value = response.user;
    return user.value;
  };

  return {
    signIn,
    signOut,
    getUser,
  };
};
