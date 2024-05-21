let questionCardsContainer = document.querySelector('.question-cards');

let previousButton = document.querySelector('.previous-button');
let nextButton = document.querySelector('.next-button');

let timeouts = [];

function clearTimeouts() {
    timeouts.forEach(timeout => {
        window.clearTimeout(timeout);
    });
}

questionCardsContainer.addEventListener("click", (event) => {
    let target = event.target;

    if (target.classList.contains('option')) {
        let questionCard = target.parentElement.parentElement;

        if (questionCard.classList.contains('answered')) {
            return;
        }

        let questionId = questionCard.id.split('-')[1];
        let answerId = target.id.split('-')[1];

        let question = null;
        questions.forEach(questionData => {
            if (questionData.id == questionId) {
                question = questionData;
            }
        });

        let answer = null;
        question.answers.forEach(answerData => {
            if (answerData.id == answerId) {
                answer = answerData;
            }
        });

        let isCorrect = answer.correct;

        if (isCorrect) {
            target.classList.add('correct');
            scores.points += question.points;
        } else {
            target.classList.add('incorrect');
        }
        
        scores.attempted++;
        questionCard.classList.add('answered');

        let nextButton = document.querySelector('.next-button');
        nextButton.disabled = false;

        notify("Going to the next question in 3 seconds...")
        let nextQuestionTimeout = window.setTimeout(() => {
            nextButton.click();
        }, 3000);

        timeouts.push(nextQuestionTimeout);
    }
});

nextButton.addEventListener("click", () => {
    clearTimeouts();

    if (nextButton.disabled) {
        return;
    }

    let currentQuestionCard = document.querySelector('.question-card.active');
    let nextQuestionCard = currentQuestionCard.nextElementSibling;

    if (nextQuestionCard == null) {
        localStorage.setItem("qq-scores", scores.points);

        window.location.assign("end.html");
        return;
    }

    currentQuestionCard.classList.remove('active');
    nextQuestionCard.classList.add('active');

    previousButton.disabled = true;

    if (nextQuestionCard.classList.contains('answered')) {
        nextButton.disabled = false;
    } else {
        nextButton.disabled = true;
    }
});

previousButton.addEventListener("click", () => {
    clearTimeouts();

    if (previousButton.disabled) {
        return;
    }

    let currentQuestionCard = document.querySelector('.question-card.active');
    let previousQuestionCard = currentQuestionCard.previousElementSibling;

    if (previousQuestionCard == null) {
        previousButton.disabled = true;
        return;
    }

    currentQuestionCard.classList.remove('active');
    previousQuestionCard.classList.add('active');

    if (previousQuestionCard.classList.contains('answered')) {
        nextButton.disabled = false;
    } else {
        nextButton.disabled = true;
    }
});

