const field = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const game = document.getElementById('game');

let player = 0;
let stepCount = 0;


for (let i = 0; i <= 2; i++) {
  for (let j = 0; j <= 2; j++) {
    const cell = document.createElement("div");
		cell.dataset.i = i;
		cell.dataset.y = j;
    cell.setAttribute("class", "cell");

    game.append(cell);
  }
}

function fill(e) {
	const cell = document.querySelector('.cell');
	let target = e.target;

	if (target.innerHTML === 'X' || target.innerHTML === 'O') {
		return
	} else {
		if (player == 0) {
			field[target.dataset.i][target.dataset.y] = 'X';
			target.innerHTML = "X";
			player = 1;
			stepCount++
			check();
		} else {
			field[target.dataset.i][target.dataset.y] = 'O';
			target.innerHTML = "O";
			player = 0;
			stepCount++;
			check();
		}
	}
}

game.addEventListener("click", fill);


function checkEqual(matrix) {
	// Check rows
	for (let i = 0; i < matrix.length; i++) {
		let row = matrix[i];
		let equal = true;
		for (let j = 1; j < row.length; j++) {
			if (row[j] !== row[j - 1]) {
				equal = false;
				console.log(false);
				// winShow()
				break;
			}
		}
		if (equal) return winShow();
	}
	
	// Check columns
	for (let i = 0; i < matrix.length; i++) {
		let equal = true;
		for (let j = 1; j < matrix.length; j++) {
			if (matrix[j][i] !== matrix[j - 1][i]) {
				equal = false;
				console.log(false);
				break;
			}
		}
		if (equal) return winShow();
	}
	
	// Check diagonal (top left to bottom right)
	let equal = true;
	for (let i = 1; i < matrix.length; i++) {
		if (matrix[i][i] !== matrix[i - 1][i - 1]) {
			equal = false;
			console.log(false);
			break;
		}
	}
	if (equal) return winShow();
	
	// Check diagonal (top right to bottom left)
	equal = true;
	for (let i = 1; i < matrix.length; i++) {
		if (matrix[i][matrix.length - i - 1] !== matrix[i - 1][matrix.length - i]) {
			equal = false;
			console.log(false);
			break;
		}
	}
	if (equal) return winShow();
	
	return false;
}
function check() {


	if (stepCount >= 5) {
		checkEqual(field);
	}
}


function winShow() {
	const message = document.getElementById('message');

  message.innerHTML = `Congratulations!`;

  game.removeEventListener('click', fill);
}
