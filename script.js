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
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field.length; j++) {
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

	const size = field.length;

  // Check rows
  for (let i = 0; i < size; i++) {
    let rowCount = 0;
    for (let j = 0; j < size; j++) {
      if (field[i][j] === field[i][0] && field[i][0] !== "") {
        rowCount++;
      }
    }
    if (rowCount === size) {
      return winShow(field[i][0]);
    }
  }

	// Check columns
  for (let j = 0; j < size; j++) {
    let columnCount = 0;
    for (let i = 0; i < size; i++) {
      if (field[i][j] === field[0][j] && field[0][j] !== "") {
        columnCount++;
      }
    }
    if (columnCount === size) {
      return winShow(field[0][j]);
    }
  }

  // Check diagonals
  let diagCount1 = 0;
  let diagCount2 = 0;
  for (let i = 0; i < size; i++) {
    if (field[i][i] === field[0][0] && field[0][0] !== "") {
      diagCount1++;
    }
    if (field[i][size - i - 1] === field[0][size - 1] && field[0][size - 1] !== "") {
      diagCount2++;
    }
  }
  if (diagCount1 === size) {
    return winShow(field[0][0]);
  }
  if (diagCount2 === size) {
    return winShow(field[0][size - 1]);
  }

	console.log('No winner :(');
	return null;

}

function winShow(winner) {
  const message = document.getElementById("message");

  message.innerHTML = `Congratulations, ${winner}!`;

  game.removeEventListener("click", fill);
}
