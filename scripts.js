//-------variable declaration to store the data from the API--------
var data = [];

const spinner = document.querySelector(".spinner-border");
//-------function declaration to call the API--------
const fetchData = async () => {
  await fetch("https://opentdb.com/api.php?amount=1&category=18")
    .then((res) => res.json())
    .then((json) => {
      data = json.results;
      fillQuestions(data[0]);
      spinner.remove();
    });
  console.log(data);
};

//-------function calling to call the API--------
fetchData();

var correctAnswer = 0; //variable to store correct answer

//-------storing the question displayer in a variable--------
const question = document.getElementById(`question-1`);

//-------function to fill the webpage with data according to the API data--------
function fillQuestions(data) {
  //-------Adding the question--------
  question.innerHTML = data.question;

  let number = Math.floor(Math.random() * (data.incorrect_answers.length + 1)); //storing the correct answer at the random index

  //-------storing wrong answers in an array--------
  let arr = data.incorrect_answers;

  //-------storing the correct answer at the random index of array--------
  arr.splice(number, 0, data.correct_answer);

  //-------adding radio buttons based on number of options in the array--------
  for (let i = 0; i < arr.length; i++) {
    document.querySelector(
      ".options-container"
    ).innerHTML += `<div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault${i}"
        />
        <label id="option-${
          i + 1
        }" class="form-check-label" for="flexRadioDefault${i}">
        ${arr[i]}
        </label>
      </div>`;
  }

  correctAnswer = number;
}

//-------storing the submit button in a variable--------
const submit = document.querySelector(".submit");

//-------adding event listener for button click--------
submit.addEventListener("click", submitForm);

//-------function declaration for submitting answer--------
function submitForm() {
  const answersContainer = document.querySelectorAll(".form-check");
  const answers = document.querySelectorAll(".form-check-input");

  let selectedAnswer = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      selectedAnswer = i;
    }
  }

  //-------checking the answer is correct or not--------

  if (selectedAnswer === correctAnswer) {
    answersContainer[correctAnswer].classList.remove("selected");
    answersContainer[correctAnswer].classList.add("correct");
  } else {
    answersContainer[selectedAnswer].classList.remove("selected");
    answersContainer[selectedAnswer].classList.add("wrong");
    answersContainer[correctAnswer].classList.add("correct");
  }
  console.log(window.location);
  console.log(window.location.pathname[9]);
  let num = parseInt(window.location.pathname[9]);
  console.log(num + 1);
  let newLocation = "";
  if (num + 1 !== 11 && window.location.pathname.substring(9, 11) != 10) {
    newLocation =
      window.location.origin +
      window.location.pathname.substring(0, 9) +
      (num + 1) +
      ".html";
  } else {
    newLocation = window.location.origin + "/index.html";
  }
  setTimeout(() => {
    window.location.replace(newLocation);
  }, 1000);
}

document.querySelector(".options-container").addEventListener("click", () => {
  const answers = document.querySelectorAll(".form-check-input");
  const answersContainer = document.querySelectorAll(".form-check");
  for (let i = 0; i < answers.length; i++) {
    answersContainer[i].classList.remove("selected");
  }
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      submit.disabled = false;
      answersContainer[i].classList.add("selected");
    }
  }
  console.log("clicked");
});
