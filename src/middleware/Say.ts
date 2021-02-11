export default () => (ctx) => {
  const text = ctx.message.text;
  const match = text.match(/^\/([^\s]+)\s?(.+)?/);
  if (match[2]) {
    ctx.reply(match[2]);
  }
};
