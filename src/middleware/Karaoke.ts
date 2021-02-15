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
  const title = ctx.state.command.args[0];

  try {
    const { data } = await axios.get<Song[]>(
      `https://api.manana.kr/karaoke/song/${encodeURI(title)}/${
        option.brand
      }.json`
    );

    let res = "";
    data.forEach((e) => {
      res += `${e.no} ${e.title} ${e.singer}\n`;
    });
    ctx.reply(res);
  } catch (e) {
    console.log(e);
  }

  return next();
};
