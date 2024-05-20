function questionTemplate(questionData) {
    let questionCard = document.createElement('li');
    questionCard.className = 'question-card';
    questionCard.id = `question-${questionData.id}`;

    let question = document.createElement('h2');
    question.className = 'question';
    question.innerText = questionData.question;

    questionCard.appendChild(question);
    
    let options = document.createElement('ul');
    options.className = 'options';

    questionData.answers.forEach(answer => {
        let option = document.createElement('li');
        
        option.className = 'option';
        option.innerText = answer.answer;
        option.id = `answer-${answer.id}`;

        options.appendChild(option);
    });
    
    questionCard.appendChild(options);
    return questionCard;
}

function loadQuestions() {
    let questionContainer = document.querySelector('.question-cards');
    questionContainer.innerHTML = '';

    let isFirstQuestion = true;
    questions.forEach(questionData => {
        let questionCard = questionTemplate(questionData);
        questionContainer.appendChild(questionCard);

        if (isFirstQuestion) {
            questionCard.classList.add('active');
            isFirstQuestion = false;
        }
    });
}

loadQuestions();

