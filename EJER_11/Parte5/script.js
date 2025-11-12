document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quiz-container");
  const resultsDiv = document.getElementById("results-summary");
  const startBtn = document.getElementById("start-btn");

  let questions = [];
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];

  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    resultsDiv.innerHTML = "";
    fetchQuestions();
  });

  function fetchQuestions() {
    fetch("questions.json")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar las preguntas");
        return res.json();
      })
      .then(data => {
        questions = data;
        currentQuestion = 0;
        score = 0;
        incorrectAnswers = [];
        showQuestion();
      })
      .catch(error => {
        quizContainer.innerHTML = `<p>Error: no se pudieron cargar las preguntas.</p>`;
        console.error(error);
      });
  }

  function showQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;

    quizContainer.innerHTML = `
      <h2>Pregunta ${currentQuestion + 1} de ${questions.length}</h2>
      <p>${q.text}</p>
      <form id="quiz-form">
        ${q.options.map(opt => `
          <label>
            <input type="radio" name="answer" value="${opt.id}">
            ${opt.text}
          </label><br>
        `).join("")}
        <br>
        <button type="submit">${currentQuestion === questions.length - 1 ? "Finalizar" : "Siguiente"}</button>
      </form>
    `;

    const form = document.getElementById("quiz-form");
    form.addEventListener("submit", handleAnswer);
  }

  function handleAnswer(e) {
    e.preventDefault();
    const form = e.target;
    const selected = form.answer.value;

    if (!selected) {
      alert("Selecciona una respuesta antes de continuar.");
      return;
    }

    const current = questions[currentQuestion];
    if (selected === current.correctAnswer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: current.text,
        correct: current.correctAnswer,
        explanation: current.explanation
      });
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    quizContainer.innerHTML = "<h2>Resultados del Quiz</h2>";
    const total = questions.length;

    resultsDiv.innerHTML = `
      <p>Has obtenido <strong>${score}</strong> de <strong>${total}</strong> preguntas correctas.</p>
    `;

    if (incorrectAnswers.length > 0) {
      let explanationsHTML = "<h3>Explicaciones:</h3>";
      incorrectAnswers.forEach(item => {
        explanationsHTML += `
          <p><strong>Pregunta:</strong> ${item.question}</p>
          <p><em>${item.explanation}</em></p>
          <hr>
        `;
      });
      resultsDiv.innerHTML += explanationsHTML;
    }

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Reiniciar Quiz";
    restartBtn.addEventListener("click", () => {
      resultsDiv.innerHTML = "";
      startBtn.style.display = "inline-block";
      quizContainer.innerHTML = "";
    });
    resultsDiv.appendChild(restartBtn);
  }
});
