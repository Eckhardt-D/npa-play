<script lang="ts" setup>
// Would get this from inputs
const user = reactive({
  email: "test@test.com",
  password: "test",
});

const signIn = async () => {
  await useUser().signIn(user.email, user.password);
  useRouter().push("/");
}
</script>

<template>
  <h1>Auth page</h1>
  <button @click="signIn">Sign in</button>
</template>