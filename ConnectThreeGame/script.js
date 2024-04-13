let row = 6;
let column = 3;
let win = 3;
let player = "A";
var game = [];
var playerA = [];
var playerB = [];
var finish = 0;

var color_A = "#213159";
var color_B = "#c1121f";

for (let i = 0; i < row; i++) {
    game[i] = [];
    playerA[i] = [];
    playerB[i] = [];
    for (let j = 0; j < column; j++) {
        game[i][j] = 0;
        playerA[i][j] = 0;
        playerB[i][j] = 0;
    }
}

function turn() {
    let color;
    if (player == 'A') {
        player = 'B';
        color = color_B;
    } else {
        player = 'A';
        color = color_A;
    }
    document.getElementById("turn").innerHTML = player + " turn";
    document.getElementById("turn").style.backgroundColor = color;
}

// for test
// game = [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
//     [1, 0, 0],
//     [0, 1, 0],
//     [0, 0, 1]];





let table = "<table>";
for (let i = 0; i < row; i++) {
    table += "<tr>";
    for (let j = 0; j < column; j++) {
        table += "<td><button><div onclick='play(" + i + "," + j + ")' id='" + i + "," + j + "'  class='animate'></div></button></td>"
    }
    table += "</tr>";
}
document.getElementById('table').innerHTML = table + "</table>";


function play(i, j) {

    if (finish == 0) {


        let play_i = row - 1;
        let play_j = j;

        for (let k = 0; k < row; k++) {
            if (game[k][j] == 1) {
                play_i = k - 1;
                break;
            }
        }

        if (play_i >= 0 && game[play_i][play_j] != 1) {


            var element = document.getElementById(play_i + "," + play_j);
            element.classList.add("player-drop");


            game[play_i][play_j] = 1;
            document.getElementById(play_i + "," + play_j).innerHTML = "<p>" + player + "</p>";
            if (player == 'A') {
                playerA[play_i][play_j] = 1;

                document.getElementById(play_i + "," + play_j).style.backgroundColor = color_A;

            } else {
                playerB[play_i][play_j] = 1;
                document.getElementById(play_i + "," + play_j).style.backgroundColor = color_B;
            }


            if (check(player)) {
                document.getElementById("turn").style.backgroundColor = "green";
                document.getElementById("turn").innerHTML = "The winner is player " + player + " !";
                finish = 1;
                //alert("Congratulations! The winner is player " + player + ".");

            } else {
                turn();
            }


        } else {
            alert("This column is full. Please select another.")
        }
        console.log(game);
    } else {
        alert("Restarting game..");
        location.reload();
    }
}

var result;
function check() {
    let arr = [];
    if (player == 'A') {
        arr = playerA;
    } else {
        arr = playerB;
    }

    // check horizontal
    for (let i = 0; i < row; i++) {
        let count = 0;
        for (let j = 0; j < column; j++) {
            if (arr[i][j] == 1) {
                count++;
            }
            if (count == win) {
                console.log(player + " win by horizontal = " + count);
                return true;
            }
        }
    }

    // check vertical
    for (let i = 0; i < column; i++) {

        let count = 0;
        for (let j = 0; j < row; j++) {
            if (arr[j][i] == 1) {
                count++;
            } else {
                count = 0;
            }
            if (count == win) {
                console.log(player + " win by vertical = " + count);
                return true;
            }
        }
    }

    // check left diagonal
    for (let i = 0; i < row - column + 1; i++) {
        let count = 0;
        let row = i;
        for (let j = 0; j < column; j++) {
            if (arr[row][j] == 1) {
                count++;
            }
            if (count == win) {
                console.log(player + " win by left diagonal = " + count);
                return true;
            }
            row++;
        }
    }

    // check right diagonal
    for (let i = 0; i < row - column + 1; i++) {
        let count = 0;
        let row = i;
        for (let j = 0; j < column; j++) {

            if (arr[row][column - j - 1] == 1) {
                count++;
            }
            if (count == win) {
                console.log(player + " win by right diagonal = " + count);
                return true;
            }
            row++;
        }

    }



    return false;
}

// console.log(check());



