const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const quiz          = document.getElementById('quiz')
const answerEls     = document.querySelectorAll('.answer')
const questionEl    = document.getElementById('question')
const a_text        = document.getElementById('a_text')
const b_text        = document.getElementById('b_text')
const c_text        = document.getElementById('c_text')
const d_text        = document.getElementById('d_text')
const submitBtn     = document.getElementById('submit')
const prevBtn       = document.getElementById('prev')
const nextBtn       = document.getElementById('next')
var console         = window.console;



let currentQuiz = 0
let score = 0
let answers = [];


function buttonHelper()
{
    if(currentQuiz == 0){
        prevBtn.disabled = true;
    }
    else{
        prevBtn.disabled = false;
    }
    if(currentQuiz == quizData.length - 1)
    {
        nextBtn.disabled = true;
    }
    else{
        nextBtn.disabled = false;
    }
    if(currentQuiz == quizData.length - 1){
        submitBtn.style.display = 'block';
    }
    else{
        submitBtn.style.display = 'none';
    }
}

loadQuiz()

function getScore()
{
    let temp = 0;
    for(var i = 0; i < answers.length; i++)
    {
        if(answers[i] == 1)
        {
            temp++;
        }

    }
    return temp;
}

function loadQuiz() {
    deselectAnswers()
    buttonHelper()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function updateScore()
{
    const answer = getSelected()
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            answers[currentQuiz] = 1;
            // score++
        }
        else {
            answers[currentQuiz] = 0;
        }
    }

}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

nextBtn.addEventListener("click",() => {
    updateScore()
    currentQuiz++;
    if(currentQuiz < quizData.length){
        loadQuiz()
    }
    else{
        currentQuiz--;
        loadQuiz()
    }
})


prevBtn.addEventListener("click",() => {
    updateScore()
    currentQuiz--;
    if(currentQuiz >= 0)
    {
        loadQuiz()
    }
    else{
        currentQuiz++;
        loadQuiz()
    }
})

submitBtn.addEventListener('click', () => {
    updateScore()
    score = getScore()
    quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>

        <button onclick="location.reload()" class = "button space">Reload</button>
            `
    }
    
)

