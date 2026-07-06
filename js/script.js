const startBtn = document.getElementById("start-btn");
const roundInp = document.getElementById("round-inp");
const roundInfo = document.getElementById("round-info");
const choiceBtn = document.getElementsByClassName("choice-btn");
const compShow = document.getElementById('comp-choice');
const userShow = document.getElementById('user-choice');
const userScore = document.getElementById('user-score');
const compScore = document.getElementById('comp-score');
const mainImg = document.getElementById('main-img');

const pwin = document.getElementsByClassName('p-win')[0];
const plost = document.getElementsByClassName('p-lost')[0];
const pdraw = document.getElementsByClassName('p-draw')[0];
const proundInfo = document.getElementsByClassName('round-info-p')[0];
console.log(proundInfo);

let totalRounds, rounds;

// const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
// const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));


for (let btn of choiceBtn) {

    const popover = new bootstrap.Popover(btn, {
        placement: "auto",
        trigger: "manual"
    });
    let timer;
    let timer1;
    let timer2;

    btn.addEventListener("click", () => {
        // userScore.innerText = Number(userScore.innerText) + 1;
        // console.log(Number(userScore.innerText)+1);
        // userScore.innerText = Number(userScore.innerText)+1;
        if (rounds == totalRounds) {
            popover.setContent({
                ".popover-body": "Click On Restart"
            })
            popover.show();
            clearTimeout(timer);
            timer = setTimeout(() => {
                popover.hide();
            }, 1000);
            return;
        }
        else if (startBtn.textContent == "▷ Start") {
            popover.setContent({
                ".popover-body": "Click On Start"
            })
            popover.show();
            clearTimeout(timer);
            timer = setTimeout(() => {
                popover.hide();
            }, 1000);
            return;
        }
        else if (rounds < totalRounds) {
            let userChoice = btn.innerText;
            userShow.innerText = userChoice;

            let emoji = ["✊", "✋", "✌️"];
            let compChoice = emoji[Math.floor(Math.random() * 3)];
            compShow.innerText = compChoice;

            if (userChoice == "✊" && compChoice == "✌️" || userChoice == "✌️" && compChoice == "✋" || userChoice == "✋" && compChoice == "✊") {
                userScore.innerText = Number(userScore.innerText) + 1;

                document.getElementById('comp-div').classList.add('shadow-loss');
                document.getElementById('user-div').classList.add('shadow-win');
                
                setTimeout(() => {
                    document.getElementById('user-div').classList.remove('shadow-win');
                    document.getElementById('comp-div').classList.remove('shadow-loss');
                }, 400);
            }
            else if (compChoice == "✊" && userChoice == "✌️" || compChoice == "✌️" && userChoice == "✋" || compChoice == "✋" && userChoice == "✊") {
                compScore.innerText = Number(compScore.innerText) + 1;
                document.getElementById('user-div').classList.add('shadow-loss');
                document.getElementById('comp-div').classList.add('shadow-win');
                clearTimeout(timer1);
                timer1 = setTimeout(() => {
                    document.getElementById('comp-div').classList.remove('shadow-win');
                    document.getElementById('user-div').classList.remove('shadow-loss');
                }, 300);
            }
            else {
                document.getElementById('user-div').classList.add('shadow-draw');
                document.getElementById('comp-div').classList.add('shadow-draw');
                clearTimeout(timer2);
                timer2 = setTimeout(() => {
                    document.getElementById('comp-div').classList.remove('shadow-draw');
                    document.getElementById('user-div').classList.remove('shadow-draw');
                }, 300);
            }
            rounds++;
            roundInfo.innerText = rounds;
        }
        if (rounds == totalRounds) {
            proundInfo.style.display = "none";
            if (Number(userScore.innerText) > Number(compScore.innerText)) {
                document.getElementsByClassName('p-win').display = "block";
                mainImg.src = "image/trophy.jpg";
                pwin.style.display = 'block';
            }
            else if (Number(userScore.innerText) < Number(compScore.innerText)) {
                mainImg.src = "image/betterLuckNextTime.jpg";
                plost.style.display = 'block';
            }
            else {
                mainImg.style.display = "none";
                document.getElementById('game-draw').style.display = "block";
                pdraw.style.display = 'block';
            }
        }
    });
}


startBtn.addEventListener('click', () => {
    startBtn.classList.toggle("btn-info");
    startBtn.classList.toggle("btn-success");

    if (startBtn.classList.contains("btn-success")) {
        startBtn.textContent = "▷ Start";
        roundInp.removeAttribute("disabled", "false");

        roundInfo.textContent = "--";
        userShow.innerText = "--";
        compShow.innerText = "--";

        userScore.innerText = 0;
        compScore.innerText = 0;

        document.getElementById('game-draw').style.display = "none";
        mainImg.style.display = "inline";
        mainImg.src = "image/Sword.png";

        proundInfo.style.display = "block";
        pwin.style.display = 'none';
        plost.style.display = 'none';
        pdraw.style.display = 'none';
    } else {
        startBtn.textContent = "⟳ Replay";
        roundInp.setAttribute("disabled", "true");
        rounds = 0;
        roundInfo.textContent = rounds;
        totalRounds = roundInp.value;
        // console.log(totalRounds);
        // console.log(rounds);
    }
})
