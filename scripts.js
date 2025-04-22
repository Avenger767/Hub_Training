
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
    const answers = {
        q1: "1", q2: "0", q3: "1", q4: "1", q5: "1", q6: "1", q7: "1",
        q8: "1", q9: "1", q10: "1", q11: "1"
    };

    for (let [key, val] of Object.entries(answers)) {
        let selected = form.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === val) correct++;
    }

    let checkboxes = form.querySelectorAll('input[name="q12"]:checked');
    let correctCheckboxes = Array.from(checkboxes).filter(cb => cb.value === "1");
    if (correctCheckboxes.length === 5 && checkboxes.length === 5) correct++;

    localStorage.setItem("interfaceScore", correct);
    const formData = new FormData(form);
    localStorage.setItem("interfaceAnswers", JSON.stringify(Object.fromEntries(formData)));
    setTimeout(() => window.location.href = "page4.html", 1000);
}

function submitMotionQuiz() {
    let form = document.getElementById('motionQuizForm');
    let correct = 0;
    const answers = {
        mq1: "1", mq2: "1", mq4: "1", mq5: "1", mq6: "1", mq7: "1",
        mq8: "1", mq9: "0", mq10: "1", mq11: "1", mq12: "1",
        mq13: "1", mq14: "1", mq15: "1", mq16: "1"
    };

    for (let [key, val] of Object.entries(answers)) {
        let selected = form.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === val) correct++;
    }

    let checkboxes = form.querySelectorAll('input[name="mq3"]:checked');
    let correctCheckboxes = Array.from(checkboxes).filter(cb => cb.value === "1");
    if (correctCheckboxes.length === 3 && checkboxes.length === 3) correct++;

    localStorage.setItem("motionScore", correct);
    const formData = new FormData(form);
    localStorage.setItem("motionAnswers", JSON.stringify(Object.fromEntries(formData)));
    setTimeout(() => window.location.href = "page5.html", 1000);
}

function reviewAnswers(quizType) {
    const answers = {
        interface: {
            q1: "1", q2: "0", q3: "1", q4: "1", q5: "1", q6: "1", q7: "1",
            q8: "1", q9: "1", q10: "1", q11: "1", q12: ["Part number", "Serial number", "Cable number", "Daughterboard", "Schematics"]
        },
        motion: {
            mq1: "1", mq2: "1", mq3: ["Sim door closed", "Gate closed", "Control loading On"], mq4: "1", mq5: "1", mq6: "1",
            mq7: "1", mq8: "1", mq9: "0", mq10: "1", mq11: "1", mq12: "1",
            mq13: "1", mq14: "1", mq15: "1", mq16: "1"
        }
    };
    const userAnswers = JSON.parse(localStorage.getItem(`${quizType}Answers`));
    let reviewText = `<h3>${quizType === "interface" ? "Interface Quiz Review" : "Motion Quiz Review"}</h3><ul>`;
    for (const [key, value] of Object.entries(answers[quizType])) {
        const userAnswer = userAnswers[key];
        if (!userAnswer) continue;
        const correct = Array.isArray(value)
            ? value.every(v => userAnswer.includes(v))
            : userAnswer === value;
        reviewText += `<li><strong>${key}</strong>: <span style="color:${correct ? 'green' : 'red'}">${correct ? "Correct" : "Incorrect"}</span></li>`;
    }
    reviewText += "</ul>";
    document.getElementById("reviewSection").innerHTML = reviewText;
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
            Motion Quiz Score: ${motionScore}/16<br>
            Total Score: ${totalScore}/28<br><br>
            <button onclick="reviewAnswers('interface')">Review Interface Quiz</button>
            <button onclick="reviewAnswers('motion')">Review Motion Quiz</button>
            <div id="reviewSection" style="margin-top:20px;"></div>
        `;
    }
};
