export default () => async (ctx) => {
  const re = /^[0-9+\-*/^()]+$/g;
  const text = ctx.message.text.split("=")[0];
  if (re.test(text)) {
    try {
      const eval_text = eval(text);
      await ctx.reply(eval_text);
    } catch (e) {
      console.error(e);
    }
  }
};
