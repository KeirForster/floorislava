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

//This is a test push