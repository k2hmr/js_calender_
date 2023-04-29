//今日の日付を取得
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = Number(today.getMonth()) + 1;
const thisDay = today.getDate();

//オプションがあるかどうかチェック
const isOption = process.argv[2] !== undefined;
//-mオプションとそのバリデーション
const isNotOptionM = process.argv[2] !== "-m";
const optionM = process.argv[3];
const is4thArg = process.argv[4] ? true : false;
const isOptionMInvalid =
  optionM && (!Number(optionM) || optionM < 1 || 12 < optionM);

//エラーがある場合の出力
if (isOption && (isNotOptionM || is4thArg))
  return console.log("Option is only first -m");
if (isOption && isOptionMInvalid) return console.log("Option m is invalid!");

//ログに出す曜日のラベル
const weekLabel = "Su Mo Tu We Th Fr Sa";
//optionMがあれば現在の西暦と月を用意する。なければ今日の日付を使用する
const targetDate = optionM ? new Date(`${optionM}-1-${thisYear}`) : today;
const targetYear = targetDate.getFullYear();
//月の値を調整
const targetMonth = Number(targetDate.getMonth()) + 1;
//最初の曜日の取得
const firstDayOfWeek = new Date(targetYear, targetMonth - 1, 1).getDay();
//ターゲット月の最後の日付を取得
const lastDateOfMonth = new Date(targetYear, targetMonth, 0).getDate() + 1;
//ターゲット付きの英語表記を取得
const monthNameLong = targetDate.toLocaleString("en-US", { month: "long" });

//カレンダーのラベルを出力
console.log(`     ${monthNameLong} ${targetYear}`);
console.log(weekLabel);

//日付の行列を作成
let currentCalenderRow = " ".repeat(3 * firstDayOfWeek);
for (let i = 1; i <= lastDateOfMonth; i++) {
  let date = i.toString();
  //今日の日付には背景色を付与
  if (targetYear === thisYear && targetMonth === thisMonth && i === thisDay) {
    date = `\x1b[47m${date}\x1b[0m`;
  }

  //日曜日の日付になったら次の行に移行
  const targetDay = new Date(targetYear, targetMonth - 1, i);
  if ((i > 1 && targetDay.getDay() === 0) || i === lastDateOfMonth) {
    //１行出力
    console.log(currentCalenderRow);
    currentCalenderRow = "";
  }

  //日付の行がスタートの時はスペースを1つ追加
  if (currentCalenderRow !== "") currentCalenderRow += " ".repeat(1);
  //日付が1より大きい一桁の数字の時、もしくは日付が1で日曜日の時はスペースを1つ追加して日付(stringI)を追加
  if ((1 < i && i < 10) || (i === 1 && firstDayOfWeek === 0)) {
    currentCalenderRow += " ".repeat(1) + date;
  } else {
    //上記外はそのまま日付(stringI)を追加
    currentCalenderRow += date;
  }
}
