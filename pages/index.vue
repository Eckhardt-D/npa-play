<script lang="ts" setup>
const postStore = usePosts();

const { pending } = await useLazyAsyncData(async () => {
  return postStore.fetchPosts();
});

const postContent = ref("");
const error = ref("");

const savePost = async () => {
  const response = await postStore.create(postContent.value)
  error.value = response?.error ?? "";
  postContent.value = "";
}
</script>

<template>
  <main>

    <button @click="useUser().signOut">Logout</button>
    
    <h1>Protected Posts Page</h1>
    
    <section v-if="!pending">
      <div v-for="post in postStore.posts.value" :key="post.id">
        <button @click="() => postStore.deleteById(post.id)">x</button>{{ post.content }}
      </div>
    </section>
    
    <form @submit.prevent>
      <h2>Add new post</h2>
      <textarea v-model="postContent" required />
      <br>
      <button @click="savePost">Save</button>
    </form>
    
    <p v-if="error">{{ error }}</p>
    
  </main>
</template>

<style scoped></style>
