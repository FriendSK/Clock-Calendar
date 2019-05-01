class ClockCalendar extends HTMLElement {
    constructor() {
        super();
        this.isShow = true;
        this.isShortFormat = true;
        this.isEuDate = true;
        this.isClock = true;

        this.addEventListener('click', this.leftClickFunc);
        this.addEventListener('contextmenu', event => event.preventDefault());
        this.addEventListener('contextmenu', this.rightClickFunc);
        this.addEventListener('mouseover', this.changeColor);
        this.addEventListener('mouseout', this.changeColorBack);
    }

    switchDisplayMode() {
        this.isClock = !this.isClock;
    }

    switchClock() {
        this.isShortFormat = !this.isShortFormat;
    }

    switchCalendar() {
        this.isEuDate = !this.isEuDate;
    }

    displayTime() {
        let display = '';
        let date = new Date();
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        let seconds = date.getSeconds().toString();

        hours = hours.length < 2 ? '0' + hours : hours;
        minutes = minutes.length < 2 ? '0' + minutes : minutes;
        seconds = seconds.length < 2 ? '0' + seconds : seconds;

        return display = this.isShortFormat ? `${hours}:${minutes}` : `${hours}:${minutes}:${seconds}`
    }

    displayCalendar() {
        let display = '';
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        let day = date.getDate().toString();

        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;

        return display = this.isEuDate ? `${month}/${day}/${year.substr(2)}` : `${day}.${month}.${year}`
    }

    connectedCallback() {
        this.getStarted();
    }

    getStarted() {
        if (this.isClock) {
            this.displayTime();
            clearInterval(this.timerId);
            this.timerId = setInterval(() => {
                this.innerHTML = this.displayTime();
            }, 1000);
        } else {
            clearInterval(this.timerId);
            this.timerId = setInterval(() => {
            this.innerHTML = this.displayCalendar();
        }, 1000);
        }
    }


    leftClickFunc() {
        if (this.isClock) {
            this.switchClock();
            this.getStarted();
        } else {
            this.switchCalendar();
            this.getStarted();
        }
    }

    rightClickFunc() {
        this.switchDisplayMode();
        this.getStarted();
    }

    changeColor() {
        this.style.color = '#ff0000';
    }

    changeColorBack() {
        this.style.color = '#000000';
    }
};

customElements.define('clock-calendar', ClockCalendar);
