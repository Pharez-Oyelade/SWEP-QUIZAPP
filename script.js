let csQuizQuestions = [];
let gkQuizQuestions = [];



// State variables
let currentQuestionIndex = 0;
let userAnswers = [];
let shuffledQuestions = [];

//Fetch questions 'based on categories
async function fetchQuestions(category) {
    const response = await fetch(`${category}.json`);
    const data = await response.json();
    return data
}

// async function fetchQuestions(category) {
//     try {
//         const response = await fetch('data/data.json');
//         const data = await response.json();

//         if (data.categories[category]) {
//             shuffleQuestions(data.categories[category]);
//         } else {
//             console.error(`Category "${category}" not found`);
//         }
//     } catch (error) {
//       console.error('Error fetching quiz data:', error)
//     }
// }
    

//DOM Elements
const header = document.getElementById('header');
const startContainer = document.getElementById('start-container');
const csQuizButton = document.getElementById('start-cs-quiz');
const gkQuizButton = document.getElementById('start-gk-quiz');
const quizContainer = document.querySelector('.quiz-container');
const reviewContainer = document.getElementById('review-section');
const questionText = document.getElementById('question-text');
const optionsList = document.querySelector('.options-list');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const scoreMessage = document.getElementById('score-message');
const scoreDisplay = document.getElementById('score'); 
const restartButton = document.getElementById('restart-button');
const reviewButton = document.getElementById('review-question');
const quizTitle = document.getElementById('quiz-title');
const questionHeader = document.querySelector('.question-header');

const reviewList = document.createElement('ul');
reviewContainer.appendChild(reviewList);

function changeBodyStyle() {
    document.body.classList.add('grid-row');
    header.classList.add('grid-row');
}


// Shuffle function to randomize the question order
function shuffleQuestions(quiz) {
    const shuffled = quiz.sort(() => Math.random() - 0.5);
    shuffledQuestions = shuffled.slice(0, 10);
}

// Start the quiz
function startQuiz(quizQuestions, title) {
    startContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    // quizTitle.innerText = csQuizButton ? 'Computer Science Quiz' : 'General Question Quiz';

    shuffleQuestions(quizQuestions);
    // questionHeader.style.display = 'block'
    quizTitle.innerText = title;
    displayQuestions();
};

// csQuizButton.addEventListener('click', async () => {
//     csQuizQuestions = await fetchQuestions('computerScience')
//     startQuiz(csQuizQuestions, "Computer Science Quiz");
//     changeBodyStyle();
//     // quizTitle.innerText = 'Computer Science Quiz'
// });

// gkQuizButton.addEventListener('click', () => {
//     startQuiz(gkQuizQuestions, "General Knowledge Quiz");
//     changeBodyStyle();
//     // quizTitle.innerText = 'General Knowledge Quiz'
// });

csQuizButton.addEventListener('click', async () => {
    csQuizQuestions = await fetchQuestions('cs-questions');
    startQuiz(csQuizQuestions, "Computer Science Quiz");
    changeBodyStyle();
});

gkQuizButton.addEventListener('click', async () => {
    gkQuizQuestions = await fetchQuestions('gk-questions');
    startQuiz(gkQuizQuestions, "General Knowledge Quiz");
    changeBodyStyle();
});

function restartReset() {
    quizContainer.style.display = 'none'; 
    submitButton.style.display = 'none'; 
    nextButton.style.display = 'none'; 
    prevButton.style.display ='none';
    reviewButton.style.display = 'none';
}

restartButton.addEventListener('click', () => {
    restartReset();
    startContainer.style.display = 'block';
    scoreMessage.style.display = 'none'; 
    reviewContainer.style.display = 'none';
    restartButton.style.display = 'none'; 
    document.body.classList.remove('grid-row');
    header.classList.remove('grid-row');

    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.style.display = 'flex';
    
    // Reset quiz data
    currentQuestionIndex = 0;
    userAnswers = [];
    shuffledQuestions = [];
    
    quizTitle.innerText = ''
});

//review button event listener
reviewButton.addEventListener('click', () => {
    restartReset();
    displayReview();
    reviewContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    // scoreMessage.style.display = 'none';
});

//show review of questions and answers
function displayReview() {
    reviewList.innerHTML = ''; //clear any previous review content

    shuffledQuestions.forEach((question, index) => {
        const li = document.createElement('li');
        li.style.listStyleType = 'none';
        const questionText = document.createElement('p');
        questionText.innerText = `${index + 1}. ${question.question}`;

        //list of options for the review
        const options = document.createElement('ul');
        question.options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.innerText = option;

            //Hightlight correct and incorrect answers
            if (option === userAnswers[index] && option !== question.answer) {
                optionItem.style.color ='red';
            } else if (option === question.answer) {
                optionItem.style.color = 'green';
            }

            options.appendChild(optionItem);
        });

        li.appendChild(questionText);
        li.appendChild(options);
        reviewList.appendChild(li);
    })
}

 

// Display the current question and options
function displayQuestions() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex]
    questionText.innerText = currentQuestion.question;


    //clear the previous options
    optionsList.innerHTML = '';

    //create list element for each option in currentQuestion index
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');

        const label = document.createElement('label');
        label.setAttribute('for', `option-${index}`);
        label.classList.add('option-label')

        const input = document.createElement
        ('input');
        input.type = 'radio'; //define input type
        input.name = 'option'; 
        input.value = option; 
        input.id = `option-${index}`;

       label.appendChild(input);
       label.appendChild(document.createTextNode(option));
       
        li.appendChild(label);
        optionsList.appendChild(li);

        //keep the option checked after next question loads 
        if (userAnswers[currentQuestionIndex] === option) {
            input.checked = true; // Restore checked state if previously selected
        }
    });

    //button visibility
    prevButton.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
    nextButton.style.display = currentQuestionIndex < shuffledQuestions.length - 1 ? 'inline-block' : 'none';
    submitButton.style.display = currentQuestionIndex === shuffledQuestions.length - 1 ? 'inline-block' : 'none'; 
}


// Record user answer
function recordAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked'); 
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value
    }
};

// Event listener for Next button
nextButton.addEventListener('click', () => {
    recordAnswer();
    currentQuestionIndex++
    displayQuestions();
});

//make enter key function as next button
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && currentQuestionIndex < shuffledQuestions.length - 1) {
        recordAnswer();
        currentQuestionIndex++
        displayQuestions();
    } else if (event.key === 'Enter') {
        recordAnswer();
        calculateScore();
    }
})

//previous button event listener
prevButton.addEventListener('click', ()=> {
    currentQuestionIndex--
    displayQuestions();
});

submitButton.addEventListener('click', () => {
    recordAnswer();
    calculateScore();
});




function calculateScore() {
    let score = 0;
    shuffledQuestions.forEach((question, index) => {
        if(userAnswers[index] === question.answer) {
            score++ 
        }
    });

    quizContainer.style.display = 'none';
    scoreDisplay.innerText = score;
    scoreMessage.style.display = 'block';
    restartButton.style.display = 'block';
    reviewButton.style.display = 'block';
}