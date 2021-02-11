export default () => (ctx) => {
  const text = ctx.message.text;
  const match = text.match(/^\/([^\s]+)\s?(.+)?/);
  ctx.deleteMessage(ctx.message.message_id);
  if (match[2]) {
    ctx.reply(match[2]);
  }
};
