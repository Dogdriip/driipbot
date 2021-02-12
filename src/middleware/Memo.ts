import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Markup } from "telegraf";

@modelOptions({ options: { customName: "Memo" } })
class MemoModel {
  @prop()
  message_id: number;

  @prop()
  chat_id: number;

  @prop()
  name: string;
}

export default () => async (ctx, next) => {
  const memoModel = getModelForClass(MemoModel);

  const name = ctx.message.text.slice(1);
  if (!name) {
    return next();
  }

  let memo = await memoModel.findOne({
    chat_id: ctx.message.chat.id,
    name,
  });

  if (!ctx.message.reply_to_message) {
    // forward memo
    if (!memo) {
      await ctx.reply(`Cannot found "${name}".`);
      return next();
    }

    try {
      await ctx.telegram.forwardMessage(
        ctx.chat.id,
        ctx.chat.id,
        memo.message_id
      );
    } catch (e) {
      console.log(e.description);
      return next();
    }
  } else {
    // create memo
    let msg = `Saved "${name}".`;
    if (memo) {
      await memoModel.deleteOne({
        chat_id: ctx.chat.id,
        name,
      });
      msg += " (Overwritten)";
    }

    memo = await memoModel.create({
      chat_id: ctx.chat.id,
      message_id: ctx.message.reply_to_message.message_id,
      name,
    });
    await memo.save();

    try {
      await ctx.reply(
        msg,
        Markup.inlineKeyboard([Markup.button.callback("Delete", "memodel")]) // TODO Implement memodel
      );
    } catch (e) {
      console.log(e.description);
      return next();
    }
  }
};
