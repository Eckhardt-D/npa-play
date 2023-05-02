export default defineEventHandler(async (event) => {
  if (!event.context.user) return [];
  return await event.context.prisma.post.findMany({
    where: {
      userId: event.context.user?.id,
    },
  });
});
