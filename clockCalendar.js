class ClockCalendar extends HTMLElement {
    constructor() {
        super();
        this.isShow = true;
        this.isFullFormat = true;
        this.isEuDate = true;
        this.isClock = true;

        this.addEventListener('click', this.leftClickFunc);
        this.addEventListener('contextmenu', this.rightClickFunc);
        this.addEventListener('mouseover', this.changeColor);
        this.addEventListener('mouseout', this.changeColorBack);
    }

    switchDisplayMode() {
        this.isClock = !this.isClock;
    }

    switchClock() {
        this.isFullFormat = !this.isFullFormat;
    }

    switchCalendar() {
        this.isEuDate = !this.isEuDate;
    }

    getShortTime() {
        let shortTime;
        let options = { hour: 'numeric', minute: 'numeric' };
        return shortTime = new Intl.DateTimeFormat('ua-UA', options).format();
    }

    getfullTime() {
        let fullTime;
        let options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return fullTime = new Intl.DateTimeFormat('ua-UA', options).format();
    }

    getUaDate() {
        let uaDate;
        return uaDate = new Intl.DateTimeFormat().format();
    }

    getEuDate() {
        let euDate;
        let options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        return euDate = new Intl.DateTimeFormat('en-US', options).format();
    }

    displayClock() {
        if (this.isFullFormat) {
            this.innerHTML = this.getfullTime();
            clearInterval(this.timerId);
            this.timerId = setInterval(() => {
                this.innerHTML = this.getfullTime();
            }, 1000);
        } else {
            this.innerHTML = this.getShortTime();
            clearInterval(this.timerId);
            this.timerId = setInterval(() => {
                this.innerHTML = this.getShortTime();
            }, 1000);
        }
    }

    displayCalendar() {
        if (this.isEuDate) {
            this.innerHTML = this.getUaDate();
            clearInterval(this.timerId);
            this.timerId = setInterval(() => {
                this.innerHTML = this.getUaDate();
            }, 3600000);
        } else {
            this.innerHTML = this.getEuDate();
            clearInterval(this.timerId);
            this.timerId = setInterval(() => {
                this.innerHTML = this.getEuDate();
            }, 3600000);
        }
    }

    getStarted() {
        if (this.isClock) {
            this.displayClock();
        } else {
            this.displayCalendar();
        }
    }

    connectedCallback() {
        this.getStarted();
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
        event.preventDefault()
        this.switchDisplayMode();
        this.getStarted();
    }

    changeColor() {
        let color = Math.random().toString().substr(-6);
        this.style.color = `#${color}`;
    }

    changeColorBack() {
        this.style.color = '#000000';
    }
};

customElements.define('clock-calendar', ClockCalendar);
