class GS_Timing
{
    constructor(elem)
    {
        // public variables
        this.elem = elem;
        this.timer = null;
        this.isRunning = false;
        this.timingInfo =
            {
                millis: 0,
                seconds: 0,
                minutes: 0
            };
    }

    // public methods
    start()
    {
        this.timer = setInterval(this.startTimer, 10, this.elem, this.timingInfo);
        this.isRunning = true;
    }

    startTimer(elem, timingInfo)
    {
        timingInfo.millis++;

        if (timingInfo.millis === 100)
        {
            timingInfo.seconds++;
            timingInfo.millis = 0;
        }

        if (timingInfo.seconds === 60)
        {
            timingInfo.minutes++;
            timingInfo.seconds = 0
        }

        if (timingInfo.seconds === 1)
        {
            // lanuch the game over modal
            // $('#gameover-modal').modal('show');
        }
        elem.innerHTML = `${timingInfo.minutes}:${timingInfo.seconds}.${timingInfo.millis < 10 ? 0 : ''}${timingInfo.millis}`;
    }

    stop()
    {
        if (this.timer != null)
        {
            clearInterval(this.timer);
            this.isRunning = false;
        }
    }

    resume()
    {
        if (!this.isRunning)
        {
            this.timer = setInterval(this.startTimer, 10, this.elem, this.timingInfo);
            this.isRunning = true;
        }
    }
}

class GS_run
{


    constructor(elem){
        // public variables
        this.elem = elem;
        if(elem.getContext){
            this.context = elem.getContext('2d');
        } else {
            elem.innerHTML = "Canvas-unsupported";
        }
        this.isRunning = false;
        this.circles = [];
        this.newCircles = [];
        this.alive = true;
        this.amountOfLava = 16;
        this.speedOfCircle = 3;
        this.maxCircleSize = 50;
    }

    // public methods
    start()
    {
        this.generateLava(this.amountOfLava);
        this.timedLava();
        //requestAnimationFrame(this.draw);
        //This is trying to find the position of the mouse, and using the values in the circles array
        //to detect if the mouse is in a circle
        //currently not in use
        // let mousePos = this.getMousePos(this.elem);
        // if(this.context.isPointInPath(mousePos[0], mousePos[1])){
        //
        // }
    }

    //not currently working for the setTimeout.
    timedLava()
    {
        this.context.requestAnimationFrame(this.growLava());
        //setTimeout(this.generateLava(this.amountOfLava), 3000);
        // this.generateLava(this.amountOfLava);
    }

    //creates circles of lava
    //amountOfLava is the number of circles
    generateLava(amountOfLava)
    {
        let i = 0;
        let maxSize = 40; // in Rads
        let minSize = 10;
        while(this.alive){
            let passed = true;
            //random value for height and width between 1 and the max amount
            let randomX = Math.floor((Math.random() * this.elem.width) + 25);
            let randomY = Math.floor((Math.random() * this.elem.height) + 25);
            let randomRadius = Math.floor((Math.random() * maxSize) + minSize);
            this.circles[i] = [2];
            this.circles[i][0] = randomX;
            this.circles[i][1] = randomY;
            this.circles[i][2] = randomRadius;

            for(let n = 0; n < this.circles.length - 1; ++n){
                if (this.circles[n][0] ===  randomX &&
                    this.circles[n][1] === randomY){
                    passed = false;
                }
            }
            if(passed === true){
                //creates the circle
                //
                i++;
                if(i === amountOfLava) {
                    this.alive = false;
                }
            }
        }
    }

    //creates a circle with passed parameters
    circ(xPosition, yPosition, sizeInRads, colorOfCircle)
    {
        this.context.fillStyle = colorOfCircle;
        this.context.beginPath();
        this.context.arc(xPosition, yPosition, sizeInRads, 0, 2 * Math.PI, false);
        this.context.closePath();
        this.context.fill();
    }

    growLava()
    {
        this.context.globalCompositeOperation = 'source-over';
        //clear the inside of the canvas
        this.context.clearRect(0, 0, this.elem.width, this.elem.height);
        for(let i = 0; i < this.circles.length; ++i){
            this.circ(this.circles[i][0], this.circles[i][1], this.circles[i][2], "#ff0000");
            this.circles[i][2] += this.speedOfCircle;
            if(this.circles[i][2] > this.maxCircleSize){
                this.circles.slice(i, 1);
            }
        }
        this.context.drawImage(this.context, 0, 0);
        this.context.webkitRequestAnimationFrame(draw);
    }

    //this is for creating circles that expand.
    //if you can get this working, cool
    //stolen from
    // http://jsfiddle.net/VZ8R4/145/
    //not in use
    draw()
    {
        // let randomRadius = Math.floor((Math.random() * maxSize) + minSize);
        for (let i = this.circles.length - 1; i >= 0 ; --i){
            this.circ(this.circles[i].x, this.circles[i].y, this.circles[i].radius, this.circles[i].color);
            this.circles[i].radius += this.speed;
            if(this.circles.radius > this.elem.width) {
                this.newCircles.slice(i, 1);
            }
        }

        this.context.drawImage(scratch, 0, 0);
        window.webkitRequestAnimationFrame(draw);
    }

    //not in use
    getMousePos(elem)
    {
        let rect = elem.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    //start button?  not in use
    startButtonCreate()
    {
        this.context.beginPath();
        this.context.rect(this.elem.width / 2, this.elem.height / 2 - 10, 20, 10);
        this.context.fillStyle = '#FFFFFF';
        this.context.fillStyle = 'rgba(225,225,225,0.5)';
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = '#000000';
        this.context.stroke();
        this.context.closePath();
        this.context.font = '8pt Kremlin Pro Web';
        this.context.fillStyle = '#000000';
        this.context.fillText('Start', this.elem.width / 2, this.elem.height / 2);
    }
}