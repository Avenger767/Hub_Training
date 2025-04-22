
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
    let selectedValues = Array.from(checkboxes).map(cb => cb.value);
    let correctValues = ["Part number", "Serial number", "Cable number", "Daughterboard", "Schematics"];
    if (selectedValues.length === 5 && correctValues.every(val => selectedValues.includes(val))) correct++;

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
    let selectedValues = Array.from(checkboxes).map(cb => cb.value);
    let correctValues = ["Sim door closed", "Gate closed", "Control loading On"];
    if (selectedValues.length === 3 && correctValues.every(val => selectedValues.includes(val))) correct++;

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
    
    const questions = {
        interface: {
            q1: "What is the primary function of the MPIC system in a simulator?",
            q2: "All MPICs share the same power supply within a chassis?",
            q3: "Which of the following is not a standard signal type handled by the MPIC?",
            q4: "Each MPIC card has its own network cable?",
            q5: "What role does a Daughter Board (DB) serve?",
            q6: "Are MPIC cards capable of being hot-swapped while power is still on?",
            q7: "Which software application is used to interface with the MPICs?",
            q8: "Which two utilities within OneUI are used for monitoring the MPIC interface?",
            q9: "Launchpad application is used to perform panel calibration.",
            q10: "What is the main power supply voltage for MPIC operation?",
            q11: "Which module in OneUI provides calibration capability for signals?",
            q12: "What card information can be found in OneUI for any MPIC?"
        },
        motion: {
            mq1: "What happens if you remove the EtherCAT secros cable at a drive?",
            mq2: "What software application is used to interface with motion system and view error codes?",
            mq3: "What needs to be closed in order for motion to engage?",
            mq4: "Class 2 Faults remove high power from the CSA drives.",
            mq5: "Which access level is required to delete log files in the MOOG Gui?",
            mq6: "What is the purpose of the 'Ownership' function in the Moog GUI?",
            mq7: "What does the Gas Spring Actuator assist with?",
            mq8: "Drawbridge motor power switches to battery during power failure.",
            mq9: "The manual drawbridge control panel has which buttons?",
            mq10: "How often should actuator motor oil be replaced?",
            mq11: "What is the minimum separation between encoder and motor power cables?",
            mq12: "Which tool is used to inspect the cooling fans in the cabinet?",
            mq13: "9 filters are located in the Motion Cabinet doors and front panel.",
            mq14: "During a Class 2 fault, what powers the motion actuators?",
            mq15: "What fault appears if the 24V UPS (2G1) supply is lost?",
            mq16: "If the RTH timeout occurs without reaching home, what fault is generated?"
        }
    };
    let reviewText = `<h3>${quizType === "interface" ? "Interface Quiz Review" : "Motion Quiz Review"}</h3><ul>`;
    
    for (const [key, value] of Object.entries(answers[quizType])) {
        const userAnswer = userAnswers[key];
        if (!userAnswer) continue;
        const correct = Array.isArray(value)
            ? value.every(v => userAnswer.includes(v))
            : userAnswer === value;
        
    const qLabel = questions[quizType][key];
    reviewText += `<li><strong>${qLabel}</strong><br>
    Your Answer: ${Array.isArray(userAnswer) ? userAnswer.join(", ") : userAnswer}<br>
    <span style="color:${correct ? 'green' : 'red'}; font-weight:bold">${correct ? "Correct" : "Incorrect"}</span></li><br>`;
    
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
