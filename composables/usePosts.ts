import type { Post } from "@prisma/client";

export default () => {
  const _posts = useState("posts", () => [] as Post[]);

  const fetchPosts = async () => {
    const response = await $fetch("/api/posts", {
      headers: {
        cookie: useRequestHeaders().cookie,
      },
    });
    _posts.value = response;
    return _posts.value;
  };

  const create = async (content: string) => {
    if (content.length < 1 || content.length > 255) {
      return;
    }
    const response = await $fetch("/api/posts", {
      method: "post",
      body: {
        content,
      },
    });

    if (response.error) {
      return response;
    }

    if (response.data) {
      _posts.value.push(response.data);
    }
  };

  const deleteById = async (id: string) => {
    const { data } = await $fetch(`/api/posts/${id}`, {
      method: "delete",
    });

    if (data) {
      _posts.value = _posts.value.filter((post) => {
        return post.id !== data;
      });
    }
  };

  return {
    posts: readonly(_posts),
    fetchPosts,
    deleteById,
    create,
  };
};
