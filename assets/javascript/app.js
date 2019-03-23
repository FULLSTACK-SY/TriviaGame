//question,answers. defining one question/answer set as one object. Keeping all objects in an array

var questions = [{question: "How many cushions are there on the coffee house sofa?",
  answers: [3, 1, 2, 4],
  correctAnswer: 1,
  image:"./assets/images/bestgameever.gif"},

  {question: "What does Chandler's co-worker, Bob, think Chandler's name is?",
  answers: ["Bob", "Sam", "Toby", "Tony"],
  correctAnswer: "Toby",
  image:"./assets/images/didok.gif"},

  {question: "What is Joey's PIN number?",
  answers: [5639, 4528, 9876, 5017],
  correctAnswer: 5639,
  image:"./assets/images/drink.jpeg"},

  {question: "What real place was the coffee shop Central Perk based on?",
  answers: ["NY Cafe", "Manhattan Cafe", "Frisson Espresso", "The Bluebell Cafe"],
  correctAnswer: "Manhattan Cafe",
  image:"./assets/images/likepizza.gif"},

  {question: "What did Phoebe find in a can of soda?",
  answers: ["fly", "soda", "milk", "a thumb"],
  correctAnswer: "a thumb",
  image:"./assets/images/yesno.gif"},

  {question: "Who is Paul?",
  answers: ["The Weeper", "Joey's Identical Hand Twin","The I Win Guy","The Wine Guy"],
  correctAnswer: "The Wine Guy",
  image:"./assets/images/wait.jpg"},

  {question: "Which one of these lived in Phoebe's dollhouse?",
  answers: ["Foster Puppets","Smelly Cat","Lollipop People","Phoebe's mom"],
  correctAnswer: "Foster Puppets",
  image:"./assets/images/watchfriend.gif"},

  {question: "To whom did Rachel serve her last ever cup of coffee to as a waitress at Central Perk?",
  answers: ["Phoebe", "Ross", "Joey", "Chandler"],
  correctAnswer: "Chandler",
  image:"./assets/images/random.gif"},

  {question: "Who lives below Joey and Chandler's apartment?",
  answers: ["Monica", "Mrs. Chatracus", "Ms.Dina", "Mr. Charly"],
  correctAnswer: "Mrs. Chatracus",
  image:"./assets/images/rossball.gif"},

  {question: "Chandler hates dogs. What does Ross hate?",
  answers: ["tea", "cats", "ice cream", "hot dogs"],
  correctAnswer: "ice cream",
  image:"./assets/images/unagi.gif"}];

// allowing 30 seconds for each question
var panel = $('#quiz-area');
var countStartNumber = 30;

// resetting game
$(document).on('click', '#start-over', function() {
  game.reset();
});

$(document).on('click', '.answer-button', function(gameSel) {
  game.clicked(gameSel);
});

$(document).on('click', '#start', function() {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


// game related details

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,

  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },

  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },

  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);
    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3000);
    } else {
      setTimeout(game.nextQuestion, 3000);
    }
  },

  results: function() {
    clearInterval(timer);
    panel.html('<h2>Game over, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },

  clicked: function(giveResult) {
    clearInterval(timer);

    if ($(giveResult.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Wrong!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3000);
    } else {
      setTimeout(game.nextQuestion, 3000);
    }
  },

  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct answer!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3000);
    } else {
      setTimeout(game.nextQuestion, 3000);
    }
  },

  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
