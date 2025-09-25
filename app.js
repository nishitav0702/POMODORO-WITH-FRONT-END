const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start'); //queryselector is used to select adn update elements on the web browser
const session = document.querySelector('.minutes');
let myInterval;
let state = true; //timer running or not, bruh!

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent) //for converting to a number

    if (state) {
        state = false;
        let totalSeconds = sessionAmount * 60;

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

startBtn.addEventListener('click', appTimer);
