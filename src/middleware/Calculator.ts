export default () => (ctx) => {
  const re = /^[0-9+\-*/^()]+$/g;
  const text = ctx.message.text.split("=")[0];
  if (re.test(text)) {
    ctx.reply(eval(text));
  }
};
