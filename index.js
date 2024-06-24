const CIRCLE = "〇";
const CROSS = "×";

// 各マス目を二次元配列にする

const ID_LIST = [
  ["cell-1", "cell-2", "cell-3"],
  ["cell-4", "cell-5", "cell-6"],
  ["cell-7", "cell-8", "cell-9"],
];

// ターン数
let turn = 1;

//指定のidを取得する関数
function $(id) {
  return document.getElementById(id);
}

// どちらのターンか判別する関数
function isCircle() {
  return turn % 2 === 1;
}

// ターンを切り替える関数
function changeNowPlayer() {
  if (isCircle()) $("nowPlayer").innerHTML = CIRCLE + "のターン";
  else $("nowPlayer").innerHTML = CROSS + "のターン";
}

// ３つのマス目が同じマークかどうかを判定する関数
function isComplete(firstId, secondId, thirdId) {
  // 3つのマス目にマークが入っていなければ、この関数の処理は終了(return)する
  if (
    $(firstId).value === "" ||
    $(secondId).value === "" ||
    $(thirdId).value === ""
  )
    return;
  // 3つのマス目のマークが同じマークなら、trueを返す
  else if (
    $(firstId).value === $(secondId).value &&
    $(secondId).value === $(thirdId).value
  )
    return true;
  // 同じマークでなければfalseを返す
  else return false;
}

// どこかに揃っている列があるか調べる関数
function completeMark() {
  // 終わりかどうかの判定をする変数
  let isEnd = false;

  // 横一列
  for (let row = 0; row < 3; row++) {
    isEnd = isComplete(ID_LIST[row][0], ID_LIST[row][1], ID_LIST[row][2]);
    if (isEnd) {
      winLossResults($(ID_LIST[row][0]).value + "の勝利！");
      return true;
    }
  }

  //   縦一列
  for (let col = 0; col < 3; col++) {
    isEnd = isComplete(ID_LIST[0][col], ID_LIST[1][col], ID_LIST[2][col]);
    if (isEnd) {
      winLossResults($(ID_LIST[0][col]).value + "の勝利！");
      return true;
    }
  }

  // 斜め(左下り)
  isEnd = isComplete(ID_LIST[0][2], ID_LIST[1][1], ID_LIST[2][0]);
  if (isEnd) {
    winLossResults($(ID_LIST[0][2]).value + "の勝利！");
    return true;
  }

  // 斜め(右下り)
  isEnd = isComplete(ID_LIST[0][0], ID_LIST[1][1], ID_LIST[2][2]);
  if (isEnd) {
    winLossResults($(ID_LIST[0][0]).value + "の勝利！");
    return true;
  }

  //   引き分けの場合
  if (turn >= 9) {
    winLossResults("引き分け");
    return true;
  }

  // いずれも揃っていない
  return false;
}
// ゲーム進行中のフラグ
let isRun = true;

// 勝敗結果を表示する
function winLossResults(message) {
  // ゲームが進行中でない記述
  isRun = false;
  $("tool_resultText").innerHTML = message;
}

//クリックされたマス目絵を取得してマークを入力する関数
function clickToCheck(e) {
  // ゲームが実行中でなければ処理を止める関数
  if (!isRun) return;

  // イベント (e) からクリックされたIDを取得
  let id = e.target.id;

  // 所得したIDからクリックされたマス目をDOMオブジェクトとして取得
  let object = $(id);

  //   すでに値が入っている場合は。この処理を終了
  if (object.value !== "") return;

  // そのマス目(inputタグ)のvalue属性を変更する
  if (isCircle()) object.value = CIRCLE;
  else object.value = CROSS;

  //   ３マス目が揃ったか判定する
  if (completeMark()) return;

  // ターン数を1増やす
  turn++;

  //ターン表示を切り替える
  changeNowPlayer();
}

// リセットボタンの動きの関数
function resetAction() {
  // ターンを１にする
  turn = 1;

  // ターンの表示を切り替える
  changeNowPlayer();

  //マスのマークを消す(valueを空にする)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      $(ID_LIST[row][col]).value = "";
    }
  }

  // 結果表示を消す
  winLossResults("");

  //   ターン表示を復活させる
  $("nowPlayer").style.display = "block";

  //   勝敗表時を削除
  $("game-result").style.display = "none";

  // ゲーム進行中のフラグにする
  isRun = true;
}

// 勝敗結果を表示する
function winLossResults(message) {
  // ゲームは実行中でない
  isRun = false;

  $("game-result").innerHTML = message;

  // ターン表示を削除する
  $("nowPlayer").style.display = "none";

  // 勝敗表示を表示
  $("game-result").style.display = "block";
}

// 画面がロードされた時に実行される関数
function onloadAction() {
  // 各マス目にクリックイベントを設定
  //   $("cell-1").onclick = clickToCheck;
  //   $("cell-2").onclick = clickToCheck;
  //   $("cell-3").onclick = clickToCheck;
  //   $("cell-4").onclick = clickToCheck;
  //   $("cell-5").onclick = clickToCheck;
  //   $("cell-6").onclick = clickToCheck;
  //   $("cell-7").onclick = clickToCheck;
  //   $("cell-8").onclick = clickToCheck;
  //   $("cell-9").onclick = clickToCheck;

  //   繰り返し処理で記述する
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      $(ID_LIST[row][col]).onclick = clickToCheck;
    }
  }

  //  リセットボタンをクリックしたときにイベントを設定
  $("reset").onclick = resetAction;

  // リセットアクションを実行
  resetAction();
}

// 画面が完全に読み込まれたらonloadActionを実行する
window.onload = onloadAction;
