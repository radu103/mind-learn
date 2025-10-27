// MindLearn - Aplicația inteligentă de învățare
// JavaScript principal pentru navigație și funcționalități generale

// Variabile globale
let currentUser = {
    name: "Utilizator",
    learningStyle: null,
    mood: null,
    progress: 0,
    assessmentComplete: false
};

let currentSection = 'home';
let aiVisible = false;

// Inițializarea aplicației
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateUI();
});

// Inițializarea aplicației
function initializeApp() {
    // Verifică dacă există date salvate local
    const savedUser = localStorage.getItem('mindlearn_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserProfile();
    }
    
    // Setează secțiunea activă
    showSection('home');
    
    // Inițializează asistentul AI
    initializeAI();
    
    console.log('MindLearn aplicația a fost inițializată cu succes!');
}

// Configurarea event listeners
function setupEventListeners() {
    // Navigație
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
        });
    });
    
    // Butoane hero
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.onclick ? this.onclick.toString() : '';
            if (action.includes('startAssessment')) {
                showSection('assessment');
            } else if (action.includes('viewProgress')) {
                showProgress();
            }
        });
    });
    
    // Smooth scroll pentru navigație
    window.addEventListener('scroll', handleScroll);
}

// Afișarea unei secțiuni specifice
function showSection(sectionName) {
    // Ascunde toate secțiunile
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Afișează secțiunea dorită
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        // Actualizează clasa activă pentru navigație
        updateActiveNavLink(sectionName);
        
        // Animații specifice pentru secțiune
        animateSection(targetSection);
    }
}

// Actualizarea link-ului activ din navigație
function updateActiveNavLink(sectionName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionName}`) {
            link.classList.add('active');
        }
    });
}

// Animarea secțiunii la afișare
function animateSection(section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        section.style.transition = 'all 0.5s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 50);
}

// Pornirea procesului de evaluare
function startAssessment() {
    showSection('assessment');
    initializeAssessment();
    
    // Mesaj de încurajare de la AI
    showAIMessage("Grozav! Să descoperim împreună cum înveți cel mai bine. Aceste mini-jocuri mă vor ajuta să înțeleg stilul tău unic de învățare! 🧠✨");
}

// Vizualizarea progresului
function viewProgress() {
    if (!currentUser.assessmentComplete) {
        showAIMessage("Încă nu ai completat scanarea personalizată. Vrei să o facem acum? 😊");
        return;
    }
    
    showSection('learn');
    updateLearningMetrics();
}

// Actualizarea profilului utilizatorului
function updateUserProfile() {
    const usernameElement = document.getElementById('username');
    if (usernameElement) {
        usernameElement.textContent = currentUser.name;
    }
    
    const userProfileName = document.getElementById('userProfileName');
    if (userProfileName) {
        userProfileName.textContent = currentUser.name;
    }
    
    const userLearningType = document.getElementById('userLearningType');
    if (userLearningType && currentUser.learningStyle) {
        userLearningType.textContent = `Stil ${currentUser.learningStyle}`;
    }
}

// Actualizarea interfeței
function updateUI() {
    updateUserProfile();
    
    if (currentUser.assessmentComplete) {
        // Afișează rezultatele evaluării în diverse locuri
        updateLearningStyleDisplay();
    }
}

// Actualizarea afișării stilului de învățare
function updateLearningStyleDisplay() {
    const learningStyleElements = document.querySelectorAll('.learning-style');
    learningStyleElements.forEach(element => {
        element.innerHTML = `
            <div class="learning-style-result">
                <h4>Stilul tău de învățare: ${currentUser.learningStyle}</h4>
                <p>${getLearningStyleDescription(currentUser.learningStyle)}</p>
            </div>
        `;
    });
}

// Descrierea stilurilor de învățare
function getLearningStyleDescription(style) {
    const descriptions = {
        'vizual': 'Înveți cel mai bine prin imagini, diagrame, culori și reprezentări vizuale. Îți plac hartele mentale și informațiile organizate vizual.',
        'auditiv': 'Preferi să asculți informațiile și să discuți despre ele. Înveți bine prin explicații verbale și discuții.',
        'logic': 'Abordezi învățarea în mod sistematic și preferi să înțelegi logica din spatele conceptelor. Îți plac pattern-urile și structurile.',
        'intuitiv': 'Ai o abordare creativă și preferi să explorezi ideile prin experiențe și conexiuni neașteptate.'
    };
    
    return descriptions[style] || 'Stil de învățare în curs de determinare.';
}

// Salvarea datelor utilizatorului
function saveUserData() {
    localStorage.setItem('mindlearn_user', JSON.stringify(currentUser));
}

// Gestionarea scroll-ului
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}

// Inițializarea asistentului AI
function initializeAI() {
    const aiMessages = [
        "Bună! Sunt asistentul tău AI și sunt aici să te ajut! 🤖",
        "Sunt încântat să te îndrumez în călătoria ta de învățare! 🌟",
        "Hai să descoperim împreună cele mai bune metode pentru tine! 🎯"
    ];
    
    const randomMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)];
    
    setTimeout(() => {
        showAIMessage(randomMessage);
    }, 2000);
}

// Afișarea mesajelor AI
function showAIMessage(message) {
    const aiMessage = document.getElementById('aiMessage');
    const aiAssistant = document.getElementById('aiAssistant');
    
    if (aiMessage && aiAssistant) {
        aiMessage.textContent = message;
        aiMessage.style.display = 'block';
        
        // Adaugă animație
        aiMessage.style.animation = 'slideUp 0.5s ease';
        
        // Ascunde mesajul după 5 secunde
        setTimeout(() => {
            aiMessage.style.display = 'none';
        }, 5000);
    }
}

// Toggle pentru asistentul AI
function toggleAI() {
    const aiMessage = document.getElementById('aiMessage');
    aiVisible = !aiVisible;
    
    if (aiVisible) {
        aiMessage.style.display = 'block';
        showAIMessage("Cum te pot ajuta astăzi? 😊");
    } else {
        aiMessage.style.display = 'none';
    }
}

// Funcții pentru detectarea stării emoționale
function detectEmotionalState() {
    // Simulare detectare stare emoțională bazată pe comportament
    const timeSpent = Date.now() - sessionStartTime;
    const clicksPerMinute = userClicks / (timeSpent / 60000);
    
    let detectedMood = 'normal';
    
    if (clicksPerMinute > 20) {
        detectedMood = 'stresat';
    } else if (clicksPerMinute < 5) {
        detectedMood = 'obosit';
    } else if (timeSpent > 1800000) { // 30 minute
        detectedMood = 'obosit';
    }
    
    if (detectedMood !== currentUser.mood) {
        adaptToMood(detectedMood);
    }
}

// Adaptarea la starea emoțională
function adaptToMood(mood) {
    currentUser.mood = mood;
    
    const messages = {
        'stresat': "Îmi pare că ești puțin tensionat. Vrei să facem o pauză cu un joc relaxant de 2 minute? 😌",
        'obosit': "Pari obosit! Să schimbăm puțin ritmul cu ceva mai interactiv? 😴➡️😊",
        'plictisit': "Hai să facem lucrurile mai interesante! Ce zici de un challenge rapid? 🎮"
    };
    
    if (messages[mood]) {
        showAIMessage(messages[mood]);
    }
    
    saveUserData();
}

// Variabile pentru trackingul comportamentului
let sessionStartTime = Date.now();
let userClicks = 0;

// Trackingul clicurilor utilizatorului
document.addEventListener('click', function() {
    userClicks++;
    
    // Verifică starea emoțională la fiecare 50 de clicuri
    if (userClicks % 50 === 0) {
        detectEmotionalState();
    }
});

// Funcții pentru gamification
function updateProgress(increment = 5) {
    currentUser.progress = Math.min(100, currentUser.progress + increment);
    
    // Actualizează bara de progres vizuală
    const progressBars = document.querySelectorAll('.progress-fill, .metric-fill');
    progressBars.forEach(bar => {
        if (bar.classList.contains('progress-fill')) {
            bar.style.width = `${currentUser.progress}%`;
        }
    });
    
    // Verifică dacă utilizatorul a atins milestone-uri
    checkMilestones();
    
    saveUserData();
}

// Verificarea milestone-urilor
function checkMilestones() {
    const milestones = [25, 50, 75, 100];
    
    milestones.forEach(milestone => {
        if (currentUser.progress >= milestone && !currentUser[`milestone_${milestone}`]) {
            currentUser[`milestone_${milestone}`] = true;
            celebrateMilestone(milestone);
        }
    });
}

// Sărbătorirea milestone-urilor
function celebrateMilestone(milestone) {
    const messages = {
        25: "🎉 Felicitări! Ai completat 25% din călătoria ta de învățare!",
        50: "🌟 Incredibil! Ești la jumătatea drumului! 50% completat!",
        75: "🚀 Fantastic! 75% completat! Ești aproape de obiectiv!",
        100: "🏆 BRAVO! Ai completat 100%! Ești un adevărat campion al învățării!"
    };
    
    showAIMessage(messages[milestone]);
    
    // Adaugă efecte vizuale de sărbătoare
    createCelebrationEffect();
}

// Efecte vizuale de sărbătoare
function createCelebrationEffect() {
    // Creează confetti sau alte efecte vizuale
    for (let i = 0; i < 20; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'][Math.floor(Math.random() * 4)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    // Animație de cădere
    let position = -10;
    const fallInterval = setInterval(() => {
        position += 5;
        confetti.style.top = position + 'px';
        
        if (position > window.innerHeight) {
            clearInterval(fallInterval);
            document.body.removeChild(confetti);
        }
    }, 50);
}

// Funcții utilitare pentru debugging
function debugInfo() {
    console.log('MindLearn Debug Info:');
    console.log('Current User:', currentUser);
    console.log('Current Section:', currentSection);
    console.log('Session Time:', (Date.now() - sessionStartTime) / 1000, 'seconds');
    console.log('User Clicks:', userClicks);
}

// Expune funcțiile pentru acces global
window.MindLearn = {
    showSection,
    startAssessment,
    viewProgress,
    toggleAI,
    debugInfo,
    updateProgress
};

console.log('🧠 MindLearn Core System Loaded Successfully! 🚀');