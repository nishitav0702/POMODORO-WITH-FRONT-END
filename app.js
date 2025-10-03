const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start'); //queryselector is used to select adn update elements on the web browser
const session = document.querySelector('.minutes');
const resetBtn = document.querySelector('.btn-reset');
const pauseBtn = document.querySelector('.btn-pause');
let myInterval;
let state = true; //timer running or not, bruh!
let reset_pressed = false;
let totalSeconds=0;

const pauseTimer = () => {

    if (!state) {
        clearInterval(myInterval);
        state = true; // ⏸️ Paused
    } else {
        appTimer(); // ▶️ Resume
    }

}

const resetTimer = () =>
{           reset_pressed=true;
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');
            minuteDiv.textContent = '25';
            secondDiv.textContent = '00';
            clearInterval(myInterval);
            state=true;
            totalSeconds=0
            
            
}
const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent) //for converting to a number
    if (reset_pressed) { 
        reset_pressed=false;

    }
    else {
    if (state) {
        state = false;
        if (totalSeconds===0) {
        totalSeconds = sessionAmount * 60;
        }
        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds/60); //converting total seconds to minutes
            let secondsLeft = totalSeconds % 60; //to ensure seconds left is bbetween 0 and 50

            if (secondsLeft < 10)
            {
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if (minutesLeft===0 && secondsLeft===0) {
                bells.play()
                clearInterval(myInterval);
            }
        }
        myInterval = setInterval(updateSeconds,1000); //A function to be executed every delay milliseconds. The first execution happens after delay milliseconds.
    } 
    else {
        alert('Session has already started.')
    }
}
}

startBtn.addEventListener('click', appTimer);
resetBtn.addEventListener('click',resetTimer);
pauseBtn.addEventListener('click',pauseTimer);

