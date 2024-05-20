let updateScores = window.setInterval(() => {
    let scoreElement = document.querySelector('.current-score');
    scoreElement.innerText = scores.points;
});

let updateAttempted = window.setInterval(() => {
    let questionCardsContainer = document.querySelector('.question-cards');
    let currentQuestionCard = document.querySelector('.question-card.active');

    let questionIndex = null;

    questionCardsContainer.childNodes.forEach((questionCard, index) => {
        if (questionCard == currentQuestionCard) {
            questionIndex = index;
        }
    });

    let questionIndexElement = document.querySelector('.current-question');
    questionIndexElement.innerText = questionIndex + 1;

    let totalElement = document.querySelector('.total-questions');
    totalElement.innerText = questions.length;

    let questionProgress = document.querySelector('.question-progress .progress-bar');
    questionProgress.style.width = `${(scores.attempted) * 100 / questions.length}%`;
});

let updatePreviousButton = window.setInterval(() => {
    let previousButton = document.querySelector('.previous-button');
    let currentQuestionCard = document.querySelector('.question-card.active');

    if (currentQuestionCard.previousElementSibling == null) {
        previousButton.disabled = true;
    } else {
        previousButton.disabled = false;
    }
});

