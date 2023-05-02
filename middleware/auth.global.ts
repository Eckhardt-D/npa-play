export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path !== "/auth") {
    const user = await useUser().getUser();
    if (!user) {
      return navigateTo("/auth");
    }
  }
});
