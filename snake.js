var snakeX = [5, 4, 3]; // 初始化蛇身
var snakeY = [5, 5, 5];
var foodX;
var foodY;
var direction = 39; // 初始化蛇身方向为右
var interval = 300; // 初始化蛇身移动时间间隔为0.3秒
var move;
var score = 0; // 初始化得分
var level = 1; // 初始化难度等级为简单

function createMap() {
    var map = document.getElementById("map");
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 30; j++) {
            var node = document.createElement("div");
            node.className = "node";
            node.id = "node-" + i + "-" + j;
            map.appendChild(node);
        }
    }
}

function createSnake() {
    var snakeHeadID = "node-" + snakeX[snakeX.length - 1] + "-" + snakeY[snakeY.length - 1];
    document.getElementById(snakeHeadID).className = "node snake-head";
    for (var i = snakeX.length - 2; i >= 0; i--) {
        var snakeBodyID = "node-" + snakeX[i] + "-" + snakeY[i];
        document.getElementById(snakeBodyID).className = "node snake-body";
    }
}

function createFood() {
    var x = Math.floor(Math.random() * 30);
    var y = Math.floor(Math.random() * 30);
    foodX = x;
    foodY = y;
    var foodID = "node-" + x + "-" + y;
    if (document.getElementById(foodID).className == "node") {
        document.getElementById(foodID).className = "node food";
    } else {
        createFood();
    }
}

function snakeMove() {
    var newHead;
    switch (direction) {
        case 37: // 左
            newHead = [snakeX[snakeX.length - 1], snakeY[snakeY.length - 1] - 1];
            break;
        case 38: // 上
            newHead = [snakeX[snakeX.length - 1] - 1, snakeY[snakeY.length - 1]];
            break;
        case 39: // 右
            newHead = [snakeX[snakeX.length - 1], snakeY[snakeY.length - 1] + 1];
            break;
        case 40: // 下
            newHead = [snakeX[snakeX.length - 1] + 1, snakeY[snakeY.length - 1]];
            break;
    }
    var newHeadID = "node-" + newHead[0] + "-" + newHead[1];
    if (newHead[0] < 0 || newHead[0] > 29 || newHead[1] < 0 || newHead[1] > 29) { // 判断是否撞墙
        clearInterval(move);
        alert("游戏结束！");
    } else if (document.getElementById(newHeadID).className == "node snake-body") { // 判断是否碰到自身
        clearInterval(move);
        alert("游戏结束！");
    } else if (newHead[0] == foodX && newHead[1] == foodY) { // 判断是否吃到食物
        snakeX.push(newHead[0]);
        snakeY.push(newHead[1]);
        document.getElementById(newHeadID).className = "node snake-head";
        createFood();
        score++; // 得分加一
        document.getElementById("scoreNum").innerHTML = score; // 更新得分
    } else {
        snakeX.shift();
        snakeY.shift();
        snakeX.push(newHead[0]);
        snakeY.push(newHead[1]);
        document.getElementById("node-" + snakeX[0] + "-" + snakeY[0]).className = "node";
        document.getElementById(newHeadID).className = "node snake-head";
        document.getElementById("node-" + snakeX[snakeX.length - 2] + "-" + snakeY[snakeY.length - 2]).className = "node snake-body";
    }
}

function changeLevel() {
    level = document.getElementById("levelSelect").value;
    switch (level) {
        case "1":
            interval = 300; // 简单难度，每0.3秒移动一次蛇身
            break;
        case "2":
            interval = 200; // 普通难度，每0.2秒移动一次蛇身
            break;
        case "3":
            interval = 100; // 困难难度，每0.1秒移动一次蛇身
            break;
    }
    clearInterval(move);
    move = setInterval("snakeMove()", interval); // 根据难度等级更新蛇身移动时间间隔
}

function snakeTurn(event) {
    var x = event.clientX - document.getElementById("map").offsetLeft; // 获取点击位置的横坐标
    var y = event.clientY - document.getElementById("map").offsetTop; // 获取点击位置的纵坐标
    if (Math.abs(x - snakeX[snakeX.length - 1] * 20) >= Math.abs(y - snakeY[snakeY.length - 1] * 20)) {
        if (x > snakeX[snakeX.length - 1] * 20) {
            keyCode = 39; // 右
        } else {
            keyCode = 37; // 左
        }
    } else {
        if (y > snakeY[snakeY.length - 1] * 20) {
            keyCode = 40; // 下
        } else {
            keyCode = 38; // 上
        }
    }
}

function init() {
    createMap();
    createSnake();
    createFood();
    move = setInterval("snakeMove()", interval);
}

window.onload = init;
