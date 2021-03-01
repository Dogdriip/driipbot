interface Option {
  delete: boolean;
}

export default (option: Option) => async (ctx) => {
  try {
    const text = ctx.message.text;
    const match = text.match(/^\/([^\s]+)\s?(.+)?/);
    if (match[2]) {
      await ctx.reply(match[2]);
    }
    if (option.delete) {
      await ctx.deleteMessage(ctx.message.message_id);
    }
  } catch (e) {
    console.error(e);
  }
};
