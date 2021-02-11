export default () => (ctx, next) => {
  console.log(
    `[${new Date(ctx.message.date)}] [${ctx.update.update_id}] ${
      ctx.message.from.first_name
    } ${ctx.message.from.last_name}: ${ctx.message.text}`
  );
  return next();
};
