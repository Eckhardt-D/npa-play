export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!event.context.user || !body.content || body.content.length > 255) {
    return {
      data: null,
      error: "Could not create post, too long.",
    };
  }

  const created = await event.context.prisma.post.create({
    data: {
      userId: event.context.user.id,
      content: body.content,
    },
  });

  return {
    data: created,
    error: null,
  };
});
