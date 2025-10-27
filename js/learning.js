// MindLearn - Modulul de învățare adaptivă
// JavaScript pentru personalizarea lecțiilor și detectarea stării emoționale

// Variabile pentru învățare adaptivă
let learningSession = {
    startTime: null,
    currentMood: 'normal',
    adaptationLevel: 1,
    lessonFormat: 'mixed',
    efficiency: 75,
    optimalTime: 'dimineața',
    sessionData: [],
    streakDays: 0
};

let lessonContent = {
    'matematică': {
        visual: {
            title: '📊 Matematică vizuală',
            content: `
                <div class="visual-lesson">
                    <h4>Să învățăm fracțiile prin imagini!</h4>
                    <div class="fraction-visual">
                        <div class="pizza-diagram">
                            <div class="pizza-slice active"></div>
                            <div class="pizza-slice active"></div>
                            <div class="pizza-slice"></div>
                            <div class="pizza-slice"></div>
                        </div>
                        <p>2/4 = 1/2 (Jumătate din pizza)</p>
                    </div>
                    <div class="interactive-elements">
                        <button class="btn btn-small" onclick="showMoreVisualExamples()">Mai multe exemple</button>
                        <button class="btn btn-small" onclick="createFractionQuiz()">Quiz interactiv</button>
                    </div>
                </div>
            `,
            exercises: [
                'Desenează 3/4 dintr-un pătrat',
                'Colorează 2/3 dintr-un cerc',
                'Creează o diagramă pentru 5/8'
            ]
        },
        auditory: {
            title: '🎵 Matematică prin ritm',
            content: `
                <div class="auditory-lesson">
                    <h4>Să învățăm tabla înmulțirii prin cântece!</h4>
                    <div class="rhythm-section">
                        <p>Apasă pentru a asculta ritmul pentru tabla lui 3:</p>
                        <button class="beat-button" onclick="playMultiplicationRhythm(3)">♪ 3 x 1 = 3 ♪</button>
                    </div>
                    <div class="audio-explanation">
                        <p>🎧 Explicația pas cu pas (audio):</p>
                        <button class="btn btn-small" onclick="playAudioExplanation()">Ascultă explicația</button>
                    </div>
                </div>
            `,
            exercises: [
                'Repetă tabla lui 7 în ritm',
                'Creează un cântec pentru fracții',
                'Explică verbal unui coleg'
            ]
        },
        logical: {
            title: '🔢 Matematică logică',
            content: `
                <div class="logical-lesson">
                    <h4>Să analizăm pattern-urile matematice!</h4>
                    <div class="logic-steps">
                        <h5>Pas 1: Observă pattern-ul</h5>
                        <div class="sequence">2, 4, 8, 16, ...</div>
                        <h5>Pas 2: Identifică regula</h5>
                        <p>Fiecare număr este dublul precedentului</p>
                        <h5>Pas 3: Aplică regula</h5>
                        <p>Următorul număr: 16 × 2 = 32</p>
                    </div>
                    <div class="logical-exercises">
                        <button class="btn btn-small" onclick="showLogicalProof()">Vezi demonstrația</button>
                        <button class="btn btn-small" onclick="createPatternChallenge()">Challenge pattern</button>
                    </div>
                </div>
            `,
            exercises: [
                'Demonstrează teorema Pitagora',
                'Găsește 3 metode pentru același rezultat',
                'Creează un algoritm pentru rezolvare'
            ]
        },
        practical: {
            title: '🛠️ Matematică practică',
            content: `
                <div class="practical-lesson">
                    <h4>Să aplicăm matematica în viața reală!</h4>
                    <div class="real-world-problem">
                        <h5>Problemă: Calcularea costului unei excursii</h5>
                        <div class="problem-scenario">
                            <p>Clasa ta vrea să organizeze o excursie. Trebuie să calculezi:</p>
                            <ul>
                                <li>Cost transport: 15 lei/elev</li>
                                <li>Cost cazare: 25 lei/elev/noapte</li>
                                <li>Cost mese: 20 lei/elev/zi</li>
                            </ul>
                        </div>
                        <div class="calculator-tool">
                            <button class="btn btn-small" onclick="openTripCalculator()">Calculator excursie</button>
                            <button class="btn btn-small" onclick="createBudgetPlan()">Plan buget</button>
                        </div>
                    </div>
                </div>
            `,
            exercises: [
                'Calculează bugetul familiei pentru o lună',
                'Măsoară și calculează aria camerei tale',
                'Planifică rețeta pentru 50 de persoane'
            ]
        }
    }
};

// Inițializarea sesiunii de învățare
function initializeLearningSession() {
    learningSession.startTime = new Date();
    updateLearningMetrics();
    
    // Detectează timpul optim bazat pe ora curentă
    detectOptimalTime();
    
    console.log('📚 Sesiune de învățare inițializată:', learningSession);
}

// Setarea stării emoționale
function setMood(mood) {
    console.log(`😊 Starea setată: ${mood}`);
    
    learningSession.currentMood = mood;
    
    // Elimină clasa activă de pe toate butoanele
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(btn => btn.classList.remove('active'));
    
    // Adaugă clasa activă pe butonul selectat
    const selectedButton = document.querySelector(`[data-mood="${mood}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    // Adaptează lecția în funcție de stare
    adaptLessonToMood(mood);
    
    // Salvează în session data
    recordSessionData('mood_change', mood);
}

// Adaptarea lecției în funcție de starea emoțională
function adaptLessonToMood(mood) {
    const lessonContainer = document.getElementById('lessonContent');
    if (!lessonContainer) return;
    
    let adaptedContent = '';
    
    switch (mood) {
        case 'energic':
            adaptedContent = generateEnergeticLesson();
            showAIMessage("Perfect! Văd că ai multă energie! Să facem ceva mai interactiv și provocator! 🚀");
            break;
            
        case 'concentrat':
            adaptedContent = generateFocusedLesson();
            showAIMessage("Excelent! Ești în zona de concentrare maximă. Să aprofundăm subiectul! 🎯");
            break;
            
        case 'obosit':
            adaptedContent = generateRelaxedLesson();
            showAIMessage("Înțeleg că ești obosit. Să facem ceva mai relaxant și vizual! 😌");
            break;
            
        case 'stresat':
            adaptedContent = generateCalmingLesson();
            showAIMessage("Îmi pare că ești tensionat. Să reducem stresul cu o abordare calmă și pas cu pas! 🧘‍♀️");
            break;
            
        default:
            adaptedContent = generateDefaultLesson();
    }
    
    lessonContainer.innerHTML = adaptedContent;
    lessonContainer.style.animation = 'fadeIn 0.5s ease';
    
    updateProgress(5);
}

// Generarea lecțiilor adaptate
function generateEnergeticLesson() {
    return `
        <div class="energetic-lesson">
            <h4>🚀 Lecție energizantă - Challenge rapid!</h4>
            <div class="quick-challenges">
                <div class="challenge-card">
                    <h5>⚡ Speed Math</h5>
                    <p>Rezolvă 10 exerciții în 2 minute!</p>
                    <button class="btn btn-primary" onclick="startSpeedChallenge()">Start challenge</button>
                </div>
                <div class="challenge-card">
                    <h5>🎯 Target Practice</h5>
                    <p>Lovește răspunsurile corecte!</p>
                    <button class="btn btn-primary" onclick="startTargetGame()">Joacă acum</button>
                </div>
            </div>
            <div class="energy-meter">
                <span>Nivelul tău de energie:</span>
                <div class="meter-bar">
                    <div class="meter-fill energy-high" style="width: 90%"></div>
                </div>
            </div>
        </div>
    `;
}

function generateFocusedLesson() {
    const userStyle = currentUser.learningStyle || 'vizual';
    const lesson = lessonContent['matematică'][userStyle];
    
    return `
        <div class="focused-lesson">
            <h4>🎯 ${lesson.title} - Sesiune intensivă</h4>
            <div class="focus-indicator">
                <span>🧠 Mod concentrare activat</span>
            </div>
            ${lesson.content}
            <div class="deep-dive">
                <h5>Aprofundare avansată:</h5>
                <ul>
                    ${lesson.exercises.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function generateRelaxedLesson() {
    return `
        <div class="relaxed-lesson">
            <h4>😌 Lecție relaxantă - Învățare ușoară</h4>
            <div class="gentle-approach">
                <div class="visual-story">
                    <h5>📖 Povestea numerelor</h5>
                    <p>Să învățăm prin povești relaxante și imagini frumoase...</p>
                    <div class="story-visual">
                        <div class="number-cloud">
                            <span class="floating-number">2</span>
                            <span class="floating-number">4</span>
                            <span class="floating-number">6</span>
                        </div>
                    </div>
                </div>
                <div class="calm-exercise">
                    <h5>🎨 Exercițiu creativ</h5>
                    <p>Desenează pattern-urile în ritmul tău...</p>
                    <button class="btn btn-secondary" onclick="openDrawingTool()">Deschide tablă de desenat</button>
                </div>
            </div>
        </div>
    `;
}

function generateCalmingLesson() {
    return `
        <div class="calming-lesson">
            <h4>🧘‍♀️ Lecție calmantă - Pas cu pas</h4>
            <div class="stress-relief">
                <div class="breathing-exercise">
                    <h5>Să începem cu o respirație calmă:</h5>
                    <div class="breathing-guide">
                        <div class="breath-circle" id="breathCircle"></div>
                        <p>Inspiră... Expiră... Relaxează-te...</p>
                    </div>
                </div>
                <div class="gentle-learning">
                    <h5>📋 Pași simpli și clari:</h5>
                    <div class="step-by-step">
                        <div class="step">
                            <span class="step-number">1</span>
                            <p>Privește exemplul</p>
                        </div>
                        <div class="step">
                            <span class="step-number">2</span>
                            <p>Înțelege ideea de bază</p>
                        </div>
                        <div class="step">
                            <span class="step-number">3</span>
                            <p>Încearcă singur, fără grabă</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateDefaultLesson() {
    const userStyle = currentUser.learningStyle || 'vizual';
    const lesson = lessonContent['matematică'][userStyle];
    
    return `
        <div class="default-lesson">
            <h4>${lesson.title}</h4>
            ${lesson.content}
        </div>
    `;
}

// Actualizarea metricilor de învățare
function updateLearningMetrics() {
    // Calculează eficiența bazată pe session data
    calculateLearningEfficiency();
    
    // Actualizează afișajul
    const efficiencyBar = document.querySelector('.metric-fill');
    if (efficiencyBar) {
        efficiencyBar.style.width = `${learningSession.efficiency}%`;
    }
    
    const efficiencyValue = document.querySelector('.metric-value');
    if (efficiencyValue) {
        efficiencyValue.textContent = `${learningSession.efficiency}%`;
    }
    
    // Detectează timpul optim
    updateOptimalTimeDisplay();
}

// Calcularea eficienței de învățare
function calculateLearningEfficiency() {
    if (learningSession.sessionData.length === 0) {
        learningSession.efficiency = 75; // Valoare inițială
        return;
    }
    
    // Analizează datele sesiunii
    const recentSessions = learningSession.sessionData.slice(-10);
    let totalScore = 0;
    let moodBonus = 0;
    
    recentSessions.forEach(session => {
        // Punctaj bazat pe timpul petrecut și activitatea
        if (session.type === 'exercise_completed') {
            totalScore += 10;
        }
        if (session.type === 'mood_change' && ['energic', 'concentrat'].includes(session.data)) {
            moodBonus += 5;
        }
    });
    
    // Calculează eficiența (0-100%)
    learningSession.efficiency = Math.min(100, Math.max(30, totalScore + moodBonus));
    
    console.log('📊 Eficiența calculată:', learningSession.efficiency);
}

// Detectarea timpului optim
function detectOptimalTime() {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 6 && currentHour <= 11) {
        learningSession.optimalTime = 'dimineața';
    } else if (currentHour >= 12 && currentHour <= 17) {
        learningSession.optimalTime = 'după-amiaza';
    } else if (currentHour >= 18 && currentHour <= 22) {
        learningSession.optimalTime = 'seara';
    } else {
        learningSession.optimalTime = 'noaptea (nu este recomandat)';
    }
}

function updateOptimalTimeDisplay() {
    const timeElements = document.querySelectorAll('.metric-value');
    if (timeElements.length > 1) {
        timeElements[1].textContent = learningSession.optimalTime;
    }
}

// Înregistrarea datelor sesiunii
function recordSessionData(type, data) {
    const sessionEntry = {
        timestamp: new Date(),
        type: type,
        data: data,
        mood: learningSession.currentMood
    };
    
    learningSession.sessionData.push(sessionEntry);
    
    // Păstrează doar ultimele 100 de intrări
    if (learningSession.sessionData.length > 100) {
        learningSession.sessionData = learningSession.sessionData.slice(-100);
    }
    
    console.log('📝 Session data recorded:', sessionEntry);
}

// Funcții pentru exercițiile interactive
function startSpeedChallenge() {
    showAIMessage("🚀 Speed Challenge activat! Să vedem ce rapiditate ai! ⚡");
    
    // Implementarea challenge-ului rapid
    const challengeData = {
        questions: generateMathQuestions(10),
        timeLimit: 120, // 2 minute
        startTime: Date.now()
    };
    
    displaySpeedChallenge(challengeData);
    recordSessionData('speed_challenge_started', challengeData);
}

function generateMathQuestions(count) {
    const questions = [];
    
    for (let i = 0; i < count; i++) {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        const operations = ['+', '-', '*'];
        const op = operations[Math.floor(Math.random() * operations.length)];
        
        let answer;
        switch (op) {
            case '+': answer = a + b; break;
            case '-': answer = a - b; break;
            case '*': answer = a * b; break;
        }
        
        questions.push({
            question: `${a} ${op} ${b}`,
            answer: answer,
            options: generateAnswerOptions(answer)
        });
    }
    
    return questions;
}

function generateAnswerOptions(correctAnswer) {
    const options = [correctAnswer];
    
    while (options.length < 4) {
        const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
        if (wrongAnswer !== correctAnswer && !options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }
    
    // Amestecă opțiunile
    return options.sort(() => Math.random() - 0.5);
}

function displaySpeedChallenge(challengeData) {
    const lessonContainer = document.getElementById('lessonContent');
    
    lessonContainer.innerHTML = `
        <div class="speed-challenge">
            <h4>⚡ Speed Math Challenge</h4>
            <div class="challenge-timer" id="challengeTimer">2:00</div>
            <div class="challenge-question" id="challengeQuestion">
                <h5>${challengeData.questions[0].question} = ?</h5>
                <div class="answer-options">
                    ${challengeData.questions[0].options.map(option => 
                        `<button class="option-btn" onclick="selectAnswer(${option})">${option}</button>`
                    ).join('')}
                </div>
            </div>
            <div class="challenge-progress">
                Întrebarea 1 din ${challengeData.questions.length}
            </div>
        </div>
    `;
    
    // Pornește timer-ul
    startChallengeTimer(challengeData);
}

function startChallengeTimer(challengeData) {
    let timeLeft = challengeData.timeLimit;
    
    const timerInterval = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        const timerElement = document.getElementById('challengeTimer');
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endSpeedChallenge();
        }
    }, 1000);
    
    // Salvează interval-ul pentru a-l putea opri mai târziu
    window.currentChallengeTimer = timerInterval;
}

function endSpeedChallenge() {
    showAIMessage("⏰ Timpul s-a terminat! Foarte bine lucrat! Să vedem cum poți îmbunătăți performanța! 👏");
    recordSessionData('speed_challenge_completed', { score: 85 }); // Scor exemplu
    updateProgress(15);
}

// Funcții pentru jocuri practice
function openTripCalculator() {
    const lessonContainer = document.getElementById('lessonContent');
    
    lessonContainer.innerHTML = `
        <div class="trip-calculator">
            <h4>🏕️ Calculator excursie</h4>
            <div class="calculator-form">
                <div class="input-group">
                    <label>Numărul de elevi:</label>
                    <input type="number" id="studentCount" value="25" min="1">
                </div>
                <div class="input-group">
                    <label>Numărul de nopți:</label>
                    <input type="number" id="nightCount" value="2" min="1">
                </div>
                <div class="cost-breakdown">
                    <h5>Costuri:</h5>
                    <div class="cost-item">Transport: <span id="transportCost">0</span> lei</div>
                    <div class="cost-item">Cazare: <span id="accommodationCost">0</span> lei</div>
                    <div class="cost-item">Mese: <span id="mealsCost">0</span> lei</div>
                    <div class="cost-total">Total: <span id="totalCost">0</span> lei</div>
                </div>
                <button class="btn btn-primary" onclick="calculateTripCost()">Calculează</button>
            </div>
        </div>
    `;
    
    showAIMessage("📊 Excelent! Să învățăm matematica prin probleme reale! Introdu datele și vezi cum se calculează! 💰");
}

function calculateTripCost() {
    const students = parseInt(document.getElementById('studentCount').value) || 0;
    const nights = parseInt(document.getElementById('nightCount').value) || 0;
    
    const transportCost = students * 15;
    const accommodationCost = students * 25 * nights;
    const mealsCost = students * 20 * (nights + 1); // +1 pentru ziua de plecare
    const totalCost = transportCost + accommodationCost + mealsCost;
    
    document.getElementById('transportCost').textContent = transportCost;
    document.getElementById('accommodationCost').textContent = accommodationCost;
    document.getElementById('mealsCost').textContent = mealsCost;
    document.getElementById('totalCost').textContent = totalCost;
    
    recordSessionData('practical_exercise_completed', 'trip_calculator');
    updateProgress(10);
    
    showAIMessage(`💡 Perfect! Ai calculat că excursia va costa ${totalCost} lei. Fiecare elev va plăti ${Math.round(totalCost / students)} lei. Matematica în acțiune! 🎯`);
}

// Monitoring avansat al comportamentului
function monitorLearningBehavior() {
    // Monitorizează tipul de interacțiuni
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        if (target.classList.contains('btn')) {
            recordSessionData('button_click', target.textContent);
        }
        
        if (target.classList.contains('option-btn')) {
            recordSessionData('answer_attempt', target.textContent);
        }
    });
    
    // Monitorizează timpul petrecut pe pagină
    let pageStartTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeSpent = Date.now() - pageStartTime;
        recordSessionData('session_duration', timeSpent);
    });
    
    // Monitorizează activitatea de tastare
    document.addEventListener('keypress', function() {
        recordSessionData('typing_activity', Date.now());
    });
}

// Inițializarea monitoringului când se încarcă modulul
document.addEventListener('DOMContentLoaded', function() {
    initializeLearningSession();
    monitorLearningBehavior();
});

// Expune funcțiile pentru acces global
window.LearningModule = {
    setMood,
    updateLearningMetrics,
    startSpeedChallenge,
    openTripCalculator,
    calculateTripCost,
    recordSessionData,
    getLearningSession: () => learningSession
};

console.log('📚 MindLearn Learning Module Loaded Successfully! 🎓');