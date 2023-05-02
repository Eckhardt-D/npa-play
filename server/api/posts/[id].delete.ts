export default defineEventHandler(async (event) => {
  const params = event.context.params;
  await event.context.prisma.post.deleteMany({
    where: {
      id: params?.id,
      userId: event.context.user?.id,
    },
  });
  return {
    data: params?.id,
    error: null,
  };
});
