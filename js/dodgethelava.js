var myGamePiece;
var myObstacles = [];
var timer = null;

function startGame(timerObj) {
    myGamePiece = new component(30, 30, "green", 10, 120);
    myGamePiece.gravity = 0.05;
    myGameArea.start();
    timer = timerObj;
}

var myGameArea = {
    canvas : document.getElementById("gameCanvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        });
        window.addEventListener('keyup', function (e) {
            accelerate(0.05);
            myGameArea.key = false;
            
        });
    }, 
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.bounce = 0.6;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type === "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    };
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    };
    this.hitMaxHeight = function() {
        var maxHeight = myGameArea.canvas.height;
        if (this.y < maxHeight) {
            this.y = maxHeight;
            this.gravitySpeed = +(this.gravitySpeed * this.bounce);
        }
    };
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    };
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            location.href = 'gameover.php';
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo === 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = myGameArea.canvas.height;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 90;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "orange", x, 0));
        myObstacles.push(new component(10, x - height - gap, "orange", x, height + gap));
    }
    if (myGameArea.key && myGameArea.key === 38) {accelerate(-0.2); }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 === 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}
