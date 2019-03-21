var numOfSquares = 6;
var colors = generateRandomColors(numOfSquares);
var goalColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");
colorDisplay.textContent = goalColor;

// different modes
for (var i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener("click", function(){
        modeBtns[0].classList.remove("selected");
        modeBtns[1].classList.remove("selected");
        modeBtns[2].classList.remove("selected");
        this.classList.add("selected");
        if (this.textContent === "Easy") { numOfSquares = 3; }
        else if (this.textContent === "Medium") { numOfSquares = 6; }
        else if (this.textContent === "Hard") { numOfSquares = 9; }

        reset();
    });
}

// guessing
for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
        squares[i].style.display = "block";
        squares[i].style.backgroundColor = colors[i];
    } else {
        squares[i].style.display = "none";
    }
    squares[i].addEventListener("click", function() {
        // grab color of clicked square
        // compare color to picked color
        var clicked = this.style.backgroundColor;
        if (clicked === goalColor) {
            message.textContent = "Correct!";
            resetButton.textContent = "Play Again?";
            h1.style.backgroundColor = clicked;
            changeColors(clicked);
        } else {
            this.style.backgroundColor = "#232323";
            message.textContent = "Try Again!";
        }
});
}

resetButton.addEventListener("click", function(){
    reset();
});


function changeColors(color) {
    for (var i = 0; i < numOfSquares; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(numOfColors) {
    var colorArray = [];
    for (var i = 0; i < numOfColors; i++) {
        colorArray.push(randomColor());
    }
    return colorArray;
}

function randomColor() {
    // choose random red 0-255
    var red = Math.floor(Math.random() * 256);
    // choose random greeen 0-255
    var green = Math.floor(Math.random() * 256);
    // choose random blue 0-255
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function reset() {
    // generate all new colors
    colors = generateRandomColors(numOfSquares);
    // pick a new random color
    goalColor = pickColor();
    // change color display to match picked color
    colorDisplay.textContent = goalColor;
    message.textContent = "";
    resetButton.textContent = "New Colors";
    // change color of squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else squares[i].style.display = "none";
    }
    h1.style.backgroundColor = "steelblue";
}