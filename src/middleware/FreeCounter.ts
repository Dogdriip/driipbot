export default () => (ctx) => {
  const date = [
    {
      name: "이재명",
      start: new Date("2019-10-21"),
      end: new Date("2021-08-01"),
    },
    {
      name: "이정철",
      start: new Date("2020-01-13"),
      end: new Date("2021-10-18"),
    },
    {
      name: "전현승",
      start: new Date("2022-06-01"),
      end: new Date("2025-06-01"),
    },
    {
      name: "오지용",
      start: new Date("2020-02-24"),
      end: new Date("2021-09-02"),
    },
    {
      name: "문지현",
      start: new Date("2020-01-06"),
      end: new Date("2021-07-18"),
    },
    {
      name: "최원태",
      start: new Date(),
      end: new Date("2020-01-01"),
    },
    {
      name: "이상호",
      start: new Date("2019-12-09"),
      end: new Date("2021-06-23"),
    },
  ];
  const now = new Date();

  let res = "*음전오 전역 카운터* \n\n";
  date.forEach((it) => {
    const total = it.end.getTime() - it.start.getTime();
    const progress = now.getTime() - it.start.getTime();
    const percentage = Math.max(0, (progress / total) * 100);
    res += `*${it.name}* \`${percentage}%\` \n`;
    res += `\`[`;
    for (let n = 0; n < 20; n++) {
      if (percentage < (n + 1) * 5) {
        res += "·";
      } else {
        res += "=";
      }
    }
    res += `]\`\n\n`;
  });

  ctx.replyWithMarkdownV2(res);
};
