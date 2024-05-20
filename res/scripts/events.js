let questionCardsContainer = document.querySelector('.question-cards');

let previousButton = document.querySelector('.previous-button');
let nextButton = document.querySelector('.next-button');

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
    }
});

nextButton.addEventListener("click", () => {
    if (nextButton.disabled) {
        return;
    }

    let currentQuestionCard = document.querySelector('.question-card.active');
    let nextQuestionCard = currentQuestionCard.nextElementSibling;

    if (nextQuestionCard == null) {
        window.clearInterval(updateScores);
        window.clearInterval(updateAttempted);
        window.clearInterval(updatePreviousButton);

        document.querySelector(".title").innerHTML = scores.points;

        let endScreen = document.querySelector(".end-screen");
        document.querySelector(".container").innerHTML = endScreen.innerHTML;

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

