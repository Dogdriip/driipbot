export default () => (ctx) => {
  const { args } = ctx.state.command;
  const rand_idx: number = Math.floor(Math.random() * args.length);
  ctx.reply(`${args[rand_idx]}`);
};
