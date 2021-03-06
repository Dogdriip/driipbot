export default () => async (ctx, next) => {
    console.time(`Processing update ${ctx.update.update_id}`)
    await next()
    console.timeEnd(`Processing update ${ctx.update.update_id}`)
}