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
        this.containerWidth = this.container.getBoundingClientRect().width;
        this.containerHeight = this.container.getBoundingClientRect().height;
        this.gameObjs = [];
        this.mouseX = null;
        this.mouseY = null;
        this.objWidth = 75;
    }

    start()
    {
        // this.createGameObj();
        // this.createGameObj();

        // for (var i = )
        for (var i = 0; i < 10; i++)
        {
            this.createGameObj(i);
            this.moveGameObjs(this.gameObjs[i], i);
        }
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

    collision(i)
    {
        if (i != -1)
        {
            for (var j = 0; j < this.gameObjs.length; j++)
            {
                var gamObj = this.gameObjs[j].getBoundingClientRect();
                if (this.mouseX >= gamObj.x &&
                    this.mouseX <= (gamObj.width + gamObj.x) &&
                    this.mouseY >= gamObj.y &&
                    this.mouseY <= gamObj.height + gamObj.y) {
                    return true;
                }
            }
        }

        else
        {
            var gamObj = this.gameObjs[i].getBoundingClientRect();
            if (this.mouseX >= gamObj.x &&
                this.mouseX <= (gamObj.width + gamObj.x) &&
                this.mouseY >= gamObj.y &&
                this.mouseY <= gamObj.height + gamObj.y) {
                return true;
            }
        }
    }

    endGame()
    {
        $('#gameover-modal').modal('show');
    }

    createGameObj(i)
    {
        var gameObj = document.createElement('div');
        gameObj.id = 'gameObj' + this.gameObjs.length;
        gameObj.classList.add('gameObj');
        this.container.appendChild(gameObj);
        this.gameObjs.push(gameObj);
    }

    moveGameObjs(gameObj, i)
    {
        var gameObjPosX = 0;
        var gameObjPosY = 0;
        var movXPositive = true;
        var movYPositive = 0;
        var moveSpeed = 3;
        var animateObj= setInterval(move, 5, this);

        function move($this)
        {
            if ($this.collision(i))
            {
                clearInterval(animateObj);
                $this.endGame();
            }

            // right boundary
            if (gameObjPosX >= $this.containerWidth - $this.objWidth) {
                movXPositive = false;
            }

            // bottom boundary
            if (gameObjPosY >= $this.containerHeight - $this.objWidth) {
                movYPositive = false;
            }

            // left boundary
            if (gameObjPosX === 0) {
                movXPositive = true;
            }

            // top boundary
            if (gameObjPosY === 0) {
                movYPositive = true;
            }

            if (movYPositive)
            {
                gameObj.style.top = (gameObjPosY += moveSpeed) + 'px';
            }

            else
            {
                gameObj.style.top = (gameObjPosY -= moveSpeed) + 'px';
            }

            if (movXPositive)
            {
                gameObj.style.left = (gameObjPosX += moveSpeed) + 'px';
            }

            else
            {
                gameObj.style.left = (gameObjPosX -= moveSpeed) + 'px';
            }
        }
    }
}