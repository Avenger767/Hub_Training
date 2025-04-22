
function startTraining() {
    const username = document.getElementById('username').value;
    if (username.trim()) {
        localStorage.setItem('simTechUser', username);
        window.location.href = 'page2.html';
    } else {
        alert('Please enter your name.');
    }
}


function submitInterfaceQuiz() {
    let form = document.getElementById('interfaceQuizForm');
    let correct = 0;
    let total = 12;
    const answers = {
        q1: "1", q2: "1", q3: "1", q4: "1", q5: "1", q6: "1", q7: "1",
        q8: "1", q9: "1", q10: "1", q11: "1"
    };

    for (let [key, val] of Object.entries(answers)) {
        let selected = form.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === val) correct++;
    }

    let checkboxes = form.querySelectorAll('input[name="q12"]:checked');
    let correctCheckboxes = Array.from(checkboxes).filter(cb => cb.value === "1");
    if (correctCheckboxes.length === 5 && checkboxes.length === 5) correct++;

    highlightAnswers(form, answers);
    localStorage.setItem("interfaceScore", correct);
    setTimeout(() => window.location.href = "page4.html", 4000);
}

    let form = document.getElementById('interfaceQuizForm');
    let correct = 0;
    let total = 12;

    for (let i = 1; i <= 11; i++) {
        let answer = form.querySelector(`input[name="q${i}"]:checked`);
        if (answer && answer.value === "1") correct++;
    }

    let checkboxes = form.querySelectorAll('input[name="q12"]:checked');
    let correctCheckboxes = Array.from(checkboxes).filter(cb => cb.value === "1");
    if (correctCheckboxes.length === 5 && checkboxes.length === 5) correct++;

    localStorage.setItem("interfaceScore", correct);
    window.location.href = "page4.html";
}

function submitMotionQuiz() {
    let form = document.getElementById('motionQuizForm');
    let correct = 0;

    for (let i = 1; i <= 6; i++) {
        let answer = form.querySelector(`input[name="mq${i}"]:checked`);
        if (answer && answer.value === "1") correct++;
    }

    localStorage.setItem("motionScore", correct);
    window.location.href = "page5.html";
}

window.onload = function () {
    if (document.getElementById("summaryText")) {
        let user = localStorage.getItem("simTechUser") || "User";
        let interfaceScore = parseInt(localStorage.getItem("interfaceScore") || "0");
        let motionScore = parseInt(localStorage.getItem("motionScore") || "0");
        let totalScore = interfaceScore + motionScore;
        document.getElementById("summaryText").innerHTML = `
            <strong>${user}</strong>, your quiz results:<br><br>
            Interface Quiz Score: ${interfaceScore}/12<br>
            Motion Quiz Score: ${motionScore}/6<br>
            Total Score: ${totalScore}/18
        `;
    }
};
