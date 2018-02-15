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

        // if (timingInfo.seconds == 1)
        // {
        //     $('#gameover-modal').modal('show');
        // }

        elem.innerHTML = `${timingInfo.minutes}:${timingInfo.minutes > 0 && timingInfo.seconds < 10 ? 0 : ''}${timingInfo.seconds}.${timingInfo.millis < 10 ? 0 : ''}${timingInfo.millis}`;
    }

    stop()
    {
        if (this.timer != null)
        {
            clearInterval(this.timer);
            this.isRunning = false;
        }
    }

    reset()
    {
        this.timingInfo.millis = 0;
        this.timingInfo.seconds = 0;
        this.timingInfo.minutes = 0;
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

class GS_Game{
    constructor(containerElem, timer) {
        this.container = containerElem;
        this.timer = timer;
        this.containerWidth = this.container.width;
        this.containerHeight = this.container.height;
        this.gameObjs = [];
        this.mouseX = null;
        this.mouseY = null;
    }

    start()
    {
        this.createGameObj();
        this.moveGameObjs();
        // this.createGameObj();
    }

    mousemove(event)
    {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        if (this.collision())
        {
            this.endGame();
        }
    }

    collision()
    {
        var gamObj = this.gameObjs[0].getBoundingClientRect();
        if (this.mouseX >= gamObj.x &&
            this.mouseX <= (gamObj.width + gamObj.x) &&
            this.mouseY >= gamObj.y &&
            this.mouseY <= gamObj.height + gamObj.y) {
            return true;
        }
    }

    endGame()
    {
        $('#gameover-modal').modal('show');
    }

    createGameObj()
    {
        var gameObj = document.createElement('div');
        gameObj.id = 'gameObj' + this.gameObjs.length;
        gameObj.classList.add('gameObj');
        this.container.appendChild(gameObj);
        this.gameObjs.push(gameObj);
    }

    moveGameObjs()
    {
        var gameObjPos = 0;
        var animateObj= setInterval(move, 5, this);

        function move(gameObj)
        {
            if (gameObj.collision())
            {
                clearInterval(animateObj);
                gameObj.endGame();
            }
            if (gameObjPos === 300) {
                clearInterval(animateObj);
            } else {
                gameObjPos++;
                gameObj.gameObjs[0].style.top = gameObjPos + 'px';
                gameObj.gameObjs[0].style.left = gameObjPos + 'px';
            }
        }
    }
}