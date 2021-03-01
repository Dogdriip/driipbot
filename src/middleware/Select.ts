export default () => async (ctx) => {
  try {
    const { args } = ctx.state.command;
    const rand_idx: number = Math.floor(Math.random() * args.length);
    await ctx.reply(`${args[rand_idx]}`);
  } catch (e) {
    console.error(e);
  }
};
