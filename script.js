const field = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const game = document.getElementById("game");
const body = document.querySelector(".body");

let player = 0;
let stepCount = 0;

body.onload = () => {
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      const cell = document.createElement("div");
      cell.dataset.i = i;
      cell.dataset.y = j;
      cell.setAttribute("class", "cell");

      game.append(cell);
    }
  }
};

function createField() {
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      const cell = document.createElement("div");
      cell.dataset.i = i;
      cell.dataset.y = j;
      cell.setAttribute("class", "cell");

      game.append(cell);
    }
  }
}

function fill(e) {
  const cell = document.querySelector(".cell");
  let target = e.target;

  if (target.innerHTML === "X" || target.innerHTML === "O") {
    return;
  } else {
    if (player == 0) {
      field[target.dataset.i][target.dataset.y] = "X";
      target.innerHTML = "X";
      player = 1;
      stepCount++;
      check();
    } else {
      field[target.dataset.i][target.dataset.y] = "O";
      target.innerHTML = "O";
      player = 0;
      stepCount++;
      check();
    }
  }
}

game.addEventListener("click", fill);

function check() {
  if (stepCount >= 5) {
    checkEqual(field);
  }
}

function checkEqual(field) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      field[i][0] === field[i][1] &&
      field[i][1] === field[i][2] &&
      field[i][0] !== ""
    ) {
      console.log(field[i][0]);
      return winShow(field[i][0]);
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      field[0][j] === field[1][j] &&
      field[1][j] === field[2][j] &&
      field[0][j] !== ""
    ) {
      console.log(field[0][j]);
      return winShow(field[0][j]);
    }
  }

  // Check diagonals
  if (
    field[0][0] === field[1][1] &&
    field[1][1] === field[2][2] &&
    field[0][0] !== ""
  ) {
    console.log(field[0][0]);
    return winShow([field[0][0]]);
  }
  if (
    field[0][2] === field[1][1] &&
    field[1][1] === field[2][0] &&
    field[0][2] !== ""
  ) {
    console.log(field[0][2]);
    return winShow(field[0][2]);
  }

  // No winner
  console.log("No winner");
  return null;
}

function winShow(winner) {
  const message = document.getElementById("message");

  message.innerHTML = `Congratulations, ${winner}!`;

  game.removeEventListener("click", fill);
}
