const csQuizQuestions = [
    {
        question: "What does 'HTTP' stand for?",
        options: ["Hyper Transfer Text Protocol", "Hyper Text Transfer Protocol", "Hyper Time Transfer Protocol", "Hyper Text Temporary Protocol"],
        answer: "Hyper Text Transfer Protocol",
    },
    {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"],
        answer: "O(log n)",
    },
    {
        question: "Which data structure is used for implementing recursion?",
        options: ["Queue", "Linked List", "Stack", "Array"],
        answer: "Stack",
    },
    {
        question: "Which of the following is not a programming language?",
        options: ["Python", "HTML", "Java", "Swift"],
        answer: "HTML",
    },
    {
        question: "What is the primary function of a compiler?",
        options: ["To execute code", "To interpret code line-by-line", "To convert high-level code to machine code", "To debug the program"],
        answer: "To convert high-level code to machine code",
    },
    {
        question: "Which of the following is an example of a relational database?",
        options: ["MongoDB", "MySQL", "Redis", "Cassandra"],
        answer: "MySQL",
    },
    {
        question: "In object-oriented programming, what is 'inheritance",
        options: ["A way to define new classes from existing classes", "A feature that restricts access to certain members", "A method to handle errors", "A technique to improve performance"],
        answer: "A way to define new classes from existing classes",
    },
    {
        question: "What sorting algorithm has the worst-case time complexity of o(n^2)?",
        options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
        answer: "Bubble Sort",
    },
    {
        question: "Which is ussed to send email?",
        options: ["FTP", "HTTP", "SMTP", "IMAP"],
        answer: "SMTP",
    },
    {
        question: "What is the smallest unit of data in a computer",
        options: ["Byte", "Bit", "Kilobyte", "Megabyte"],
        answer: "Bit",
    },
    
];

const gkQuizQuestions = [
    {
        question: "Which planet is known as the red planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
    },
    {
        question: "Who wrote the play Romeo and Juliet?",
        options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
        answer: "William Shakespeare",
    },
    {
        question: "What is capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: "Tokyo",
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Ozone"],
        answer: "Oxygen",
    },
    {
        question: "How many continents are there in the world?",
        options: ["5", "6", "7", "8"],
        answer: "7",
    },
    {
        question: "Who painted the Mona Lisa",
        options: ["Leonardo da Vinci", "Vincent Van Gogh", "Pablo Picasso", "Michelangelo"],
        answer: "Leonardo da Vinci",
    },
    {
        question: "What is largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Orca"],
        answer: "Blue Whale",
    },
    {
        question: "Which ocean is the largest by area?",
        options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean",
    },
    {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Issac Newton"],
        answer: "Alexander Fleming",
    },
    {
        question: "What is the currency of the United Kingdom",
        options: ["Euro", "Dollar", "Pound Sterling", "Yen"],
        answer: "Pound Sterling",
    },
    
];

// State variables
let currentQuestionIndex = 0;
let userAnswers = [];
let shuffledQuestions = [];

//DOM Elements
const header = document.getElementById('header');
const startContainer = document.getElementById('start-container');
const csQuizButton = document.getElementById('start-cs-quiz');
const gkQuizButton = document.getElementById('start-gk-quiz');
const quizContainer = document.querySelector('.quiz-container');
const questionText = document.getElementById('question-text');
const optionsList = document.querySelector('.options-list');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const scoreMessage = document.getElementById('score-message');
const scoreDisplay = document.getElementById('score'); 
const restartButton = document.getElementById('restart-button');
const quizTitle = document.getElementById('quiz-title');
const questionHeader = document.querySelector('.question-header');

function changeBodyStyle() {
    document.body.classList.add('grid-row');
    header.classList.add('grid-row');
}


// Shuffle function to randomize the question order
function shuffleQuestions(quiz) {
    shuffledQuestions = quiz.sort(() => Math.random() - 0.5);
}

// Start the quiz
function startQuiz(quizQuestions, title) {
    startContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    // quizTitle.innerText = csQuizButton ? 'Computer Science Quiz' : 'General Question Quiz';

    shuffleQuestions(quizQuestions);
    // questionHeader.style.display = 'block'
    quizTitle.innerText = title
    displayQuestions();
};

csQuizButton.addEventListener('click', () => {
    startQuiz(csQuizQuestions, "Computer Science Quiz");
    changeBodyStyle();
    // quizTitle.innerText = 'Computer Science Quiz'
});

gkQuizButton.addEventListener('click', () => {
    startQuiz(gkQuizQuestions, "General Knowledge Quiz");
    changeBodyStyle();
    // quizTitle.innerText = 'General Knowledge Quiz'
});

restartButton.addEventListener('click', () => {
    scoreMessage.style.display = 'none';  
    quizContainer.style.display = 'none'; 
    startContainer.style.display = 'block';
    submitButton.style.display = 'none'; 
    nextButton.style.display = 'none'; 
    prevButton.style.display ='none';
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


// Record the user's answer
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
}