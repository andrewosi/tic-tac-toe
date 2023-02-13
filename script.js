const field = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let player = 0;

const container = document.querySelector(".container");

for (let i = 0; i <= 2; i++) {
  for (let j = 0; j <= 2; j++) {
    const cell = document.createElement("div");
    cell.setAttribute("id", `${[i]}${[j]}`);
    cell.setAttribute("class", "cell");

    container.append(cell);
  }
}

function fill(e) {
  let target = e.target.closest("div");
  let id = target.id;
  let i = id[0];
  let j = id[1];

	if (target.innerHTML === 'X' || target.innerHTML === 'O') {
		return
	} else {
		if (player == 0) {
			field[i][j] = "X";
			target.innerHTML = "X";
			player = 1;
			check();
		} else {
			field[i][j] = "O";
			target.innerHTML = "O";
			player = 0;
			check();
		}
	}
}

document.addEventListener("click", fill);


function check() {

	for(let i = 0; i < 3; i++) {
		if (field[i][0] == field[i][1] == field[i][2]) {
			winShow()
		}
	}

	for (let i = 0; i < 3; i++) {
		if (field[0][i] == field [1][i] == field[2][i]) {
			winShow()
		}
	}

	if (field[0][0] == field[1][1] == field[2][2]) {
		winShow()
	}

	if (field[2][0] == field[1][1] == field[0][2]) {
		winShow()
	}
}

function winShow() {
  const message = document.createElement("p");
  const body = document.querySelector(".body");

  message.innerHTML = `Congratulations!`;
  message.setAttribute("class", "message");

  body.append(message);
  // document.removeEventListener('click', fill);
}
