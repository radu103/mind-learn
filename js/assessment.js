// MindLearn - Modulul de evaluare și scanare personalizată
// JavaScript pentru mini-jocurile de detectare a stilului de învățare

// Variabile pentru evaluare
let assessmentData = {
    visualScore: 0,
    auditoryScore: 0,
    logicalScore: 0,
    intuitiveScore: 0,
    currentGame: 0,
    totalGames: 3,
    gameResults: []
};

let colorSequence = [];
let userColorSequence = [];
let memoryWords = [];
let currentWordIndex = 0;
let gameTimer = null;

// Inițializarea procesului de evaluare
function initializeAssessment() {
    console.log('🎯 Inițializare proces de evaluare...');
    
    resetAssessment();
    updateAssessmentProgress();
    showCurrentGame();
    
    // Mesaj de început
    setTimeout(() => {
        showAIMessage("Să începem cu primul joc! Urmărește cu atenție secvența de culori. 🎨");
    }, 1000);
}

// Resetarea datelor de evaluare
function resetAssessment() {
    assessmentData = {
        visualScore: 0,
        auditoryScore: 0,
        logicalScore: 0,
        intuitiveScore: 0,
        currentGame: 0,
        totalGames: 3,
        gameResults: []
    };
    
    colorSequence = [];
    userColorSequence = [];
    memoryWords = [];
    currentWordIndex = 0;
}

// Actualizarea progresului evaluării
function updateAssessmentProgress() {
    const progress = (assessmentData.currentGame / assessmentData.totalGames) * 100;
    const progressBar = document.getElementById('assessmentProgress');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${Math.round(progress)}% completat`;
    }
}

// Afișarea jocului curent
function showCurrentGame() {
    // Ascunde toate jocurile
    const games = document.querySelectorAll('.assessment-game');
    games.forEach(game => game.classList.remove('active'));
    
    // Afișează jocul curent
    const gameIds = ['visualGame', 'memoryGame', 'logicGame'];
    const currentGameElement = document.getElementById(gameIds[assessmentData.currentGame]);
    
    if (currentGameElement) {
        currentGameElement.classList.add('active');
        currentGameElement.style.animation = 'fadeIn 0.5s ease';
    }
}

// === JOCUL VIZUAL - Secvența de culori ===
function startColorSequence() {
    console.log('🎨 Începe jocul vizual');
    
    const button = document.querySelector('#visualGame .btn');
    button.textContent = 'Se încarcă...';
    button.disabled = true;
    
    generateColorSequence();
    playColorSequence();
}

function generateColorSequence() {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const sequenceLength = 4 + Math.floor(Math.random() * 3); // 4-6 culori
    
    colorSequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        colorSequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    
    console.log('Secvența generată:', colorSequence);
}

function playColorSequence() {
    let index = 0;
    userColorSequence = [];
    
    const interval = setInterval(() => {
        if (index < colorSequence.length) {
            highlightColor(colorSequence[index]);
            index++;
        } else {
            clearInterval(interval);
            enableColorInput();
        }
    }, 800);
}

function highlightColor(color) {
    const colorButton = document.querySelector(`[data-color="${color}"]`);
    if (colorButton) {
        colorButton.classList.add('active');
        
        // Audio feedback
        playTone(color);
        
        setTimeout(() => {
            colorButton.classList.remove('active');
        }, 600);
    }
}

function enableColorInput() {
    const button = document.querySelector('#visualGame .btn');
    button.textContent = 'Repetă secvența';
    button.disabled = false;
    
    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', handleColorClick);
        btn.style.cursor = 'pointer';
    });
    
    showAIMessage("Acum repetă secvența apăsând pe culorile în aceeași ordine! 🎯");
}

function handleColorClick(event) {
    const color = event.target.getAttribute('data-color');
    userColorSequence.push(color);
    
    // Feedback vizual
    event.target.classList.add('active');
    setTimeout(() => {
        event.target.classList.remove('active');
    }, 200);
    
    // Audio feedback
    playTone(color);
    
    // Verifică dacă secvența este completă
    if (userColorSequence.length === colorSequence.length) {
        evaluateColorSequence();
    }
}

function evaluateColorSequence() {
    let correctCount = 0;
    
    for (let i = 0; i < colorSequence.length; i++) {
        if (userColorSequence[i] === colorSequence[i]) {
            correctCount++;
        }
    }
    
    const accuracy = (correctCount / colorSequence.length) * 100;
    
    // Calculează punctajul pentru stilul vizual
    assessmentData.visualScore = accuracy;
    
    console.log(`Joc vizual completat: ${accuracy}% acuratețe`);
    
    // Dezactivează butoanele
    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach(btn => {
        btn.removeEventListener('click', handleColorClick);
        btn.style.cursor = 'default';
    });
    
    // Feedback pentru utilizator
    if (accuracy >= 80) {
        showAIMessage("Excelent! Ai o memorie vizuală fantastică! 🌟");
    } else if (accuracy >= 60) {
        showAIMessage("Bine lucrat! Stilul vizual pare să-ți iasă destul de bine! 👍");
    } else {
        showAIMessage("Nu-ți face griji, poate stilul vizual nu este punctul tău forte. Să vedem următorul joc! 😊");
    }
    
    setTimeout(() => {
        nextGame();
    }, 3000);
}

// === JOCUL DE MEMORIE - Cuvinte ===
function startMemoryGame() {
    console.log('🧠 Începe jocul de memorie');
    
    const button = document.querySelector('#memoryGame .btn');
    button.textContent = 'Se încarcă...';
    button.disabled = true;
    
    generateMemoryWords();
    displayMemoryWords();
}

function generateMemoryWords() {
    const wordBank = [
        'calculator', 'învățare', 'memorie', 'creativitate', 'logică',
        'imagine', 'sunet', 'culoare', 'formă', 'pattern',
        'algoritm', 'inteligență', 'adaptare', 'progres', 'echipă'
    ];
    
    memoryWords = [];
    const wordCount = 5 + Math.floor(Math.random() * 3); // 5-7 cuvinte
    
    for (let i = 0; i < wordCount; i++) {
        const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
        if (!memoryWords.includes(randomWord)) {
            memoryWords.push(randomWord);
        }
    }
    
    console.log('Cuvinte generate:', memoryWords);
}

function displayMemoryWords() {
    const wordsContainer = document.getElementById('memoryWords');
    let index = 0;
    
    const interval = setInterval(() => {
        if (index < memoryWords.length) {
            wordsContainer.innerHTML = `<div class="word">${memoryWords[index]}</div>`;
            
            // Audio feedback - pronunță cuvântul
            speakWord(memoryWords[index]);
            
            index++;
        } else {
            clearInterval(interval);
            wordsContainer.innerHTML = '';
            enableMemoryInput();
        }
    }, 1500);
}

function enableMemoryInput() {
    const button = document.querySelector('#memoryGame .btn');
    const input = document.getElementById('memoryInput');
    
    button.textContent = 'Verifică răspunsul';
    button.disabled = false;
    input.disabled = false;
    input.focus();
    
    button.addEventListener('click', evaluateMemoryGame);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            evaluateMemoryGame();
        }
    });
    
    showAIMessage("Scrie toate cuvintele pe care ți le amintești, separate prin virgulă! 📝");
}

function evaluateMemoryGame() {
    const input = document.getElementById('memoryInput');
    const userWords = input.value.toLowerCase().split(',').map(word => word.trim());
    
    let correctCount = 0;
    const totalWords = memoryWords.length;
    
    userWords.forEach(userWord => {
        if (memoryWords.map(w => w.toLowerCase()).includes(userWord)) {
            correctCount++;
        }
    });
    
    const accuracy = (correctCount / totalWords) * 100;
    
    // Calculează punctajele pentru memoria auditivă și logică
    assessmentData.auditoryScore = accuracy * 0.7; // Componentă auditivă
    assessmentData.logicalScore += accuracy * 0.3; // Componentă de organizare
    
    console.log(`Joc memorie completat: ${accuracy}% acuratețe`);
    
    // Dezactivează input-ul
    input.disabled = true;
    const button = document.querySelector('#memoryGame .btn');
    button.disabled = true;
    
    // Feedback pentru utilizator
    if (accuracy >= 80) {
        showAIMessage("Incredibil! Ai o memorie fantastică! 🧠💫");
    } else if (accuracy >= 60) {
        showAIMessage("Foarte bine! Memoria ta funcționează excelent! 👏");
    } else {
        showAIMessage("Nu e problemă! Fiecare are punctele sale forte. Să vedem la următorul joc! 💪");
    }
    
    setTimeout(() => {
        nextGame();
    }, 3000);
}

// === JOCUL LOGIC - Secvențe numerice ===
function startLogicGame() {
    console.log('🔢 Începe jocul logic');
    
    const button = document.querySelector('#logicGame .btn');
    button.textContent = 'Se încarcă...';
    button.disabled = true;
    
    generateLogicSequence();
    setTimeout(() => {
        enableLogicInput();
    }, 1000);
}

function generateLogicSequence() {
    const sequences = [
        { sequence: [2, 4, 8, 16, 32], missing: 3, answer: 16, pattern: 'dublu' },
        { sequence: [1, 3, 7, 15, 31], missing: 3, answer: 15, pattern: 'dublu + 1' },
        { sequence: [5, 10, 20, 40, 80], missing: 3, answer: 40, pattern: 'dublu' },
        { sequence: [3, 6, 12, 24, 48], missing: 2, answer: 12, pattern: 'dublu' },
        { sequence: [1, 4, 9, 16, 25], missing: 3, answer: 16, pattern: 'pătrate perfecte' }
    ];
    
    const selectedSequence = sequences[Math.floor(Math.random() * sequences.length)];
    
    // Afișează secvența
    const sequenceElement = document.getElementById('logicSequence');
    let displaySequence = [...selectedSequence.sequence];
    displaySequence[selectedSequence.missing] = '?';
    
    sequenceElement.innerHTML = displaySequence.map(num => 
        `<span>${num}</span>`
    ).join(' ');
    
    // Salvează răspunsul corect
    window.currentLogicAnswer = selectedSequence.answer;
    
    console.log('Secvența logică:', selectedSequence);
}

function enableLogicInput() {
    const button = document.querySelector('#logicGame .btn');
    const input = document.getElementById('logicInput');
    
    button.textContent = 'Verifică răspunsul';
    button.disabled = false;
    input.disabled = false;
    input.focus();
    
    button.addEventListener('click', evaluateLogicGame);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            evaluateLogicGame();
        }
    });
    
    showAIMessage("Descoperă pattern-ul și completează numărul lipsă! 🤔💭");
}

function evaluateLogicGame() {
    const input = document.getElementById('logicInput');
    const userAnswer = parseInt(input.value);
    
    const isCorrect = userAnswer === window.currentLogicAnswer;
    const accuracy = isCorrect ? 100 : 0;
    
    // Calculează punctajul pentru stilul logic
    assessmentData.logicalScore += accuracy * 0.7;
    
    // Bonus pentru gândire intuitivă dacă răspunsul este aproape corect
    if (!isCorrect && Math.abs(userAnswer - window.currentLogicAnswer) <= 2) {
        assessmentData.intuitiveScore += 50;
    }
    
    console.log(`Joc logic completat: ${accuracy}% acuratețe`);
    
    // Dezactivează input-ul
    input.disabled = true;
    const button = document.querySelector('#logicGame .btn');
    button.disabled = true;
    
    // Feedback pentru utilizator
    if (isCorrect) {
        showAIMessage("Bravo! Ai găsit răspunsul corect! Gândirea ta logică este impresionantă! 🎯");
    } else {
        showAIMessage("Aproape! Nu-ți face griji, matematica nu este totul în învățare! 😊");
    }
    
    setTimeout(() => {
        completeAssessment();
    }, 3000);
}

// === FINALIZAREA EVALUĂRII ===
function nextGame() {
    assessmentData.currentGame++;
    updateAssessmentProgress();
    
    if (assessmentData.currentGame < assessmentData.totalGames) {
        showCurrentGame();
    } else {
        completeAssessment();
    }
}

function completeAssessment() {
    console.log('✅ Evaluare completată!');
    console.log('Punctaje finale:', assessmentData);
    
    // Calculează stilul de învățare dominant
    const learningStyle = calculateLearningStyle();
    
    // Actualizează datele utilizatorului
    currentUser.learningStyle = learningStyle;
    currentUser.assessmentComplete = true;
    currentUser.assessmentData = assessmentData;
    
    // Salvează datele
    saveUserData();
    
    // Afișează rezultatele
    showAssessmentResults(learningStyle);
    
    // Actualizează progresul general
    updateProgress(30);
}

function calculateLearningStyle() {
    const scores = {
        'vizual': assessmentData.visualScore,
        'auditiv': assessmentData.auditoryScore,
        'logic': assessmentData.logicalScore,
        'intuitiv': assessmentData.intuitiveScore
    };
    
    console.log('Punctaje pe stiluri:', scores);
    
    // Găsește stilul cu punctajul cel mai mare
    let maxScore = -1;
    let dominantStyle = 'vizual';
    
    for (const [style, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            dominantStyle = style;
        }
    }
    
    return dominantStyle;
}

function showAssessmentResults(learningStyle) {
    // Ascunde jocurile și afișează rezultatele
    const games = document.querySelectorAll('.assessment-game');
    games.forEach(game => game.classList.remove('active'));
    
    const resultsElement = document.getElementById('assessmentResults');
    const learningStyleElement = document.getElementById('learningStyle');
    
    if (resultsElement && learningStyleElement) {
        learningStyleElement.innerHTML = `
            <div class="result-celebration">
                <h4>🎉 Stilul tău de învățare este: <strong>${learningStyle.toUpperCase()}</strong></h4>
                <p>${getLearningStyleDescription(learningStyle)}</p>
                <div class="detailed-scores">
                    <h5>Punctajele tale:</h5>
                    <div class="score-bars">
                        <div class="score-item">
                            <span>Vizual:</span>
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${assessmentData.visualScore}%"></div>
                            </div>
                            <span>${Math.round(assessmentData.visualScore)}%</span>
                        </div>
                        <div class="score-item">
                            <span>Auditiv:</span>
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${assessmentData.auditoryScore}%"></div>
                            </div>
                            <span>${Math.round(assessmentData.auditoryScore)}%</span>
                        </div>
                        <div class="score-item">
                            <span>Logic:</span>
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${assessmentData.logicalScore}%"></div>
                            </div>
                            <span>${Math.round(assessmentData.logicalScore)}%</span>
                        </div>
                        <div class="score-item">
                            <span>Intuitiv:</span>
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${assessmentData.intuitiveScore}%"></div>
                            </div>
                            <span>${Math.round(assessmentData.intuitiveScore)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        resultsElement.classList.add('active');
        resultsElement.style.animation = 'slideUp 0.8s ease';
        
        // Mesaj de felicitare de la AI
        setTimeout(() => {
            showAIMessage(`Felicitări! Acum știu că ești o persoană cu stil ${learningStyle}! Să trecem la lecțiile personalizate pentru tine! 🚀`);
        }, 1000);
    }
}

function continueToLearning() {
    showSection('learn');
    updateLearningMetrics();
    showAIMessage("Perfect! Să vedem cum pot adapta lecțiile special pentru stilul tău de învățare! 📚✨");
}

// === FUNCȚII AUXILIARE ===

// Generarea de sunete pentru feedback auditiv
function playTone(color) {
    // Simulare sunet pentru culori
    const frequencies = {
        'red': 261.63,    // C4
        'blue': 293.66,   // D4
        'green': 329.63,  // E4
        'yellow': 349.23  // F4
    };
    
    // În implementarea reală, aici ar fi cod pentru generarea de sunete
    console.log(`♪ Sunet pentru ${color}: ${frequencies[color]}Hz`);
}

// Pronunțarea cuvintelor (simulare)
function speakWord(word) {
    // În implementarea reală, aici ar fi folosit Web Speech API
    console.log(`🗣️ Pronunță: "${word}"`);
    
    // Simulare cu setTimeout pentru durata pronunției
    return new Promise(resolve => {
        setTimeout(resolve, 800);
    });
}

// Funcții pentru debugging
function getAssessmentStatus() {
    return {
        currentGame: assessmentData.currentGame,
        totalGames: assessmentData.totalGames,
        progress: (assessmentData.currentGame / assessmentData.totalGames) * 100,
        scores: assessmentData
    };
}

// Expune funcțiile pentru acces global
window.AssessmentModule = {
    initializeAssessment,
    startColorSequence,
    startMemoryGame,
    startLogicGame,
    continueToLearning,
    getAssessmentStatus
};

console.log('🎯 MindLearn Assessment Module Loaded Successfully! 🎮');