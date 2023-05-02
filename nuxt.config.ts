export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      secret: process.env.AUTH_SECRET,
    },
  },
});
