'use strict';

var myQuestions = [
    {
        question: "What is 10/2?",
        answers: {
            a: '3',
            b: '5',
            c: '115'
        },
        correctAnswer: 'b'
    },
    {
        question: "What is 30/3?",
        answers: {
            a: '3',
            b: '5',
            c: '10'
        },
        correctAnswer: 'c'
    }
];

var testContainer = document.createElement('div'),
    button = document.createElement('button'),
    resultsContainer = document.createElement('div');

testContainer.id = 'test';
button.id = 'submit';
resultsContainer.id = 'results';

button.appendChild(document.createTextNode('Get Results!'));

document.body.append(testContainer, button, resultsContainer);

// Show Questions
showQuestions(myQuestions, testContainer);

// Show Results
button.onclick = function() {
    showResults(myQuestions, testContainer, resultsContainer);
}


function showQuestions(questions, container) {
    var output = [],
        answers;

    for(var i = 0; i < questions.length; i++) {
        answers = [];

        for(var letter in questions[i].answers) {
            var item = `<label class="answer-${letter}">`
                        + `<input type="radio" name="question-${i}" value="${letter}" />`
                        + questions[i].answers[letter]
                        + '</label>';

            answers.push(item);
        }

        output.push(
            `<div class="question">${questions[i].question}</div>`
            + `<div class="answers">${answers.join('')}</div>`
        );
    }

    container.innerHTML = output.join('');
}

function showResults(questions, container, resultsContainer) {
    var answersContainers = container.querySelectorAll('.answers'),
        labels = container.querySelectorAll('label');

    labels.forEach((item) => {
        item.removeAttribute('style');
    });

    var userAnswer = '',
        answerLabel = '',
        correctAnswers = 0;

    for (var i = 0; i < questions.length; i++) {
        userAnswer = answersContainers[i].querySelector(`input[name="question-${i}"]:checked`);

        if (userAnswer === null) {
            alert('Please fill all fields first!');
            return;
        }

        answerLabel = answersContainers[i].querySelector(`label.answer-${userAnswer.value}`);

        if (userAnswer.value === questions[i].correctAnswer) {
            answerLabel.style.backgroundColor = '#94cb94';

            correctAnswers++;
        } else {
            answerLabel.style.backgroundColor = '#f2adad';
        }
    }

    resultsContainer.innerHTML = `Your result: ${correctAnswers} out of ${questions.length}`;
}
