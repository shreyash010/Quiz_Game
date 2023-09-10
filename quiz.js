const quesJSON = [
  {
    question: "What is the output of the following code?",
    code: `
      const arr = [1, 2, 3];
      const doubled = arr.map(function(x) {
        return x * 2;
      });
      console.log(doubled);
    `,
    options: ['[2, 4, 6]', '[1, 2, 3]', 'Error', '[2, 2, 2]'],
    correctAnswer: '[2, 4, 6]',
  },
  {
    question: "What is the purpose of the 'use strict' directive in JavaScript?",
    options: [
      'It forces the use of strict data types.',
      'It enables strict mode for improved error handling.',
      'It allows the use of non-strict mode functions.',
      'It restricts the use of external libraries.',
    ],
    correctAnswer: 'It enables strict mode for improved error handling.',
  },
  {
    question: "What is an IIFE in JavaScript?",
    options: [
      'An Immediately Invoked Function Expression.',
      'An Inline Function Expression.',
      'An Internal Function Execution.',
      'An Inline Function Evaluation.',
    ],
    correctAnswer: 'An Immediately Invoked Function Expression.',
  },
  {
    question: "What is the event loop in JavaScript responsible for?",
    options: [
      'Handling HTTP requests and responses.',
      'Executing asynchronous code and managing the callback queue.',
      'Controlling user interface interactions.',
      'Loading external scripts and stylesheets.',
    ],
    correctAnswer: 'Executing asynchronous code and managing the callback queue.',
  },
  {
    question: "Which method is used to sort an array in place in JavaScript?",
    options: ['sort()', 'sorted()', 'arrange()', 'order()'],
    correctAnswer: 'sort()',
  },
];
   
  let score=0;
  let currentQuestion = 0;
  const totalScore = quesJSON.length;
  let selectedAnswer = '';

  //Accessing all the elements:
  const questionEl = document.getElementById("question");
  const optionEl = document.getElementById("options");
  const scoreEl = document.getElementById("score");
  const nextEl = document.getElementById("next");
  const submitEl = document.getElementById("submit");

  showQuestion();

  function showQuestion(){
    // Destructuring the object
    const{correctAnswer, options, question} = quesJSON[currentQuestion];

    //Setting question text content
    questionEl.textContent = question;
    
    //If there is code in question then to add code:
    if(quesJSON[currentQuestion].hasOwnProperty('code')){
      const codeEl = document.createElement('div');
      codeEl.classList.add('code-container');
      codeEl.innerHTML = `<pre><code>${quesJSON[currentQuestion]['code']}</code></pre>`;
      questionEl.appendChild(codeEl);
    }
  
    const shuffledOptions = shuffleOptions(options);
  
    //Populating the Options div with the buttons.
    shuffledOptions.forEach((opt) => {
    const btn = document.createElement('button');
    btn.classList.add('option');
    btn.textContent = opt;
    optionEl.appendChild(btn);

    // Event handling on the button:
    btn.addEventListener("click", (event) => {
      // removing color of option if another option selected:
      const options = document.querySelectorAll('.option');
      options.forEach((option) => {
        option.style.backgroundColor = 'white';
      })
      selectedAnswer = event.currentTarget.textContent;
      btn.style.backgroundColor = '#f57424';
    });    
  });
}

// Event listener to submit the question.
submitEl.addEventListener('click', () => {
  if(selectedAnswer === ''){
    alert('please select anwer to submit');
  }else{
    if(selectedAnswer === quesJSON[currentQuestion]['correctAnswer']){
      score++;
    }
    else{
      score=score-0.25;
    }
    scoreEl.textContent = `Score: ${score} / ${totalScore}`;
    nextQuestion();
  }
});

//Event listener to skip the question.
nextEl.addEventListener('click', () => {
  scoreEl.textContent = `Score: ${score} / ${totalScore}`;
  nextQuestion();
})

function nextQuestion(){
  currentQuestion++;
  optionEl.textContent = "";
  if(currentQuestion !== quesJSON.length){
    showQuestion();
  }else{
    questionEl.textContent = "Quiz Completed!!";
    nextEl.remove();
    submitEl.remove();
  }
}

//Shuffling the Options
function shuffleOptions(options) {
    for (let i = options.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * i + 1);
      [options[i], options[j]] = [
        options[j],
        options[i],
      ];
    }
    return options;
  }
  
//   shuffleOptions([1, 2, 3, 4, 5]);