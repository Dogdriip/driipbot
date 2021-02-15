import axios from "axios";

interface Option {
  brand: "tj" | "kumyoung";
}

interface Song {
  brand: string;
  no: string;
  title: string;
  singer: string;
  composer: string;
  lyricist: string;
  release: string;
}

export default (option: Option) => async (ctx, next) => {
  const from = ctx.state.command.args[0]; // song, singer
  if (from !== "song" && from !== "singer") {
    ctx.replyWithHTML("usage: <code>/tj (song | singer) query</code>");
    return next();
  }

  const query = ctx.state.command.args[1];
  try {
    const { data } = await axios.get<Song[]>(
      `https://api.manana.kr/karaoke/${encodeURI(from)}/${encodeURI(query)}/${
        option.brand
      }.json`
    );

    let res = "";
    data.forEach((e) => {
      res += `<code>${e.no}</code> `;
      res += `<b>${e.title}</b> —`;
      res += `<i>${e.singer}</i>`;
      res += "\n";
    });
    ctx.replyWithHTML(res);
  } catch (e) {
    console.log(e);
  }

  return next();
};
