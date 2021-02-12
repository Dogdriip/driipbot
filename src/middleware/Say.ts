interface Option {
  delete: boolean;
}

export default (option: Option) => (ctx) => {
  const text = ctx.message.text;
  const match = text.match(/^\/([^\s]+)\s?(.+)?/);
  if (match[2]) {
    ctx.reply(match[2]);
  }
  if (option.delete) {
    ctx.deleteMessage(ctx.message.message_id);
  }
};
