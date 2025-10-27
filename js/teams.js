// MindLearn - Modulul de echipe și colaborare
// JavaScript pentru formarea echipelor complementare și competițiile blânde

// Variabile pentru sistemul de echipe
let teamSystem = {
    currentUser: null,
    availableStudents: [],
    suggestedTeammates: [],
    currentTeams: [],
    competitions: [],
    collaborationScore: 0
};

// Baza de date simulată cu elevi
let studentDatabase = [
    {
        id: 1,
        name: 'Ana Popescu',
        learningStyle: 'logic',
        strengths: ['Analiză', 'Matematică', 'Rezolvare probleme'],
        weaknesses: ['Creativitate', 'Prezentare'],
        personalityType: 'introvert',
        availability: 'după-amiaza',
        academicLevel: 'avansat',
        collaborationRating: 4.8,
        interests: ['matematică', 'fizică', 'programare']
    },
    {
        id: 2,
        name: 'Mihai Ionescu',
        learningStyle: 'auditiv',
        strengths: ['Comunicare', 'Istorie', 'Limbi străine'],
        weaknesses: ['Matematică avansată', 'Grafice'],
        personalityType: 'extrovert',
        availability: 'dimineața',
        academicLevel: 'mediu',
        collaborationRating: 4.5,
        interests: ['istorie', 'literatură', 'muzică']
    },
    {
        id: 3,
        name: 'Elena Vasile',
        learningStyle: 'vizual',
        strengths: ['Design', 'Artă', 'Organizare'],
        weaknesses: ['Matematică', 'Logică complexă'],
        personalityType: 'ambivert',
        availability: 'seara',
        academicLevel: 'avansat',
        collaborationRating: 4.9,
        interests: ['artă', 'design', 'biologie']
    },
    {
        id: 4,
        name: 'Radu Marin',
        learningStyle: 'intuitiv',
        strengths: ['Creativitate', 'Inovație', 'Brainstorming'],
        weaknesses: ['Detalii', 'Proceduri stricte'],
        personalityType: 'extrovert',
        availability: 'flexibil',
        academicLevel: 'mediu',
        collaborationRating: 4.3,
        interests: ['inventică', 'științe', 'tehnologie']
    },
    {
        id: 5,
        name: 'Maria Gheorghe',
        learningStyle: 'logic',
        strengths: ['Programare', 'Algoritmi', 'Debugging'],
        weaknesses: ['Comunicare', 'Prezentări'],
        personalityType: 'introvert',
        availability: 'dimineața',
        academicLevel: 'expert',
        collaborationRating: 4.7,
        interests: ['programare', 'matematică', 'robotică']
    }
];

// Echipele curente simulate
let existingTeams = [
    {
        id: 1,
        name: 'Matematică Avansată',
        subject: 'matematică',
        members: [
            { name: 'Tu', learningStyle: 'vizual', role: 'coordinator' },
            { name: 'Ana M.', learningStyle: 'logic', role: 'analist' },
            { name: 'Mihai P.', learningStyle: 'auditiv', role: 'comunicator' }
        ],
        progress: 67,
        rank: 2,
        totalTeams: 8,
        achievements: ['🥈 Locul 2 în competiția lunară', '📈 Progres constant'],
        nextSession: '2025-10-28 14:00',
        collaborative_score: 95
    }
];

// Competițiile curente
let activeCompetitions = [
    {
        id: 1,
        name: 'Challenge Matematică - Octombrie',
        type: 'monthly',
        subject: 'matematică',
        participants: 24,
        timeLeft: '5 zile',
        prize: '🏆 Certificat + 50 puncte bonus',
        currentRank: 2,
        description: 'Competiție lunară pentru toate echipele de matematică'
    },
    {
        id: 2,
        name: 'Sprint Științe',
        type: 'weekly',
        subject: 'științe',
        participants: 16,
        timeLeft: '2 zile',
        prize: '🥇 Badge special + recunoaștere',
        currentRank: 1,
        description: 'Challenge rapid pentru iubitorii de știință'
    }
];

// Inițializarea sistemului de echipe
function initializeTeamSystem() {
    console.log('👥 Inițializare sistem de echipe...');
    
    // Setează utilizatorul curent bazat pe profilul salvat
    setupCurrentUserProfile();
    
    // Generează sugestii de coechipieri
    generateTeammatesSuggestions();
    
    // Actualizează interfața
    updateTeamsInterface();
    
    // Simulează activitatea în timp real
    simulateRealTimeActivity();
}

// Configurarea profilului utilizatorului curent
function setupCurrentUserProfile() {
    teamSystem.currentUser = {
        name: currentUser.name || 'Tu',
        learningStyle: currentUser.learningStyle || 'vizual',
        strengths: getLearningStyleStrengths(currentUser.learningStyle),
        weaknesses: getLearningStyleWeaknesses(currentUser.learningStyle),
        personalityType: 'adaptiv', // Detectat din comportament
        availability: 'flexibil',
        academicLevel: 'în dezvoltare',
        collaborationRating: 0, // Se va actualiza în timp
        interests: ['învățare adaptivă', 'tehnologie']
    };
    
    console.log('👤 Profil utilizator configurat:', teamSystem.currentUser);
}

// Obținerea punctelor forte pe stilul de învățare
function getLearningStyleStrengths(style) {
    const strengthsMap = {
        'vizual': ['Memorie vizuală', 'Organizare', 'Design thinking'],
        'auditiv': ['Comunicare', 'Explicare concepte', 'Colaborare verbală'],
        'logic': ['Analiză', 'Rezolvare probleme', 'Gândire structurată'],
        'intuitiv': ['Creativitate', 'Conexiuni neașteptate', 'Inovație']
    };
    
    return strengthsMap[style] || ['Adaptabilitate', 'Învățare activă'];
}

// Obținerea punctelor slabe pe stilul de învățare
function getLearningStyleWeaknesses(style) {
    const weaknessesMap = {
        'vizual': ['Procesare auditivă rapidă', 'Concentrare pe detalii verbale'],
        'auditiv': ['Reprezentări vizuale complexe', 'Lucru individual prelungit'],
        'logic': ['Gândire laterală', 'Creativitate spontană'],
        'intuitiv': ['Detalii precise', 'Proceduri stricte']
    };
    
    return weaknessesMap[style] || ['În curs de identificare'];
}

// Generarea sugestiilor de coechipieri
function generateTeammatesSuggestions() {
    console.log('🔍 Generare sugestii coechipieri...');
    
    const userStyle = teamSystem.currentUser.learningStyle;
    const compatibleStyles = getCompatibleLearningStyles(userStyle);
    
    teamSystem.suggestedTeammates = studentDatabase
        .filter(student => compatibleStyles.includes(student.learningStyle))
        .map(student => ({
            ...student,
            compatibilityScore: calculateCompatibilityScore(teamSystem.currentUser, student)
        }))
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
        .slice(0, 6); // Top 6 sugestii
    
    console.log('✨ Sugestii generate:', teamSystem.suggestedTeammates);
}

// Stilurile de învățare compatibile
function getCompatibleLearningStyles(userStyle) {
    const compatibilityMatrix = {
        'vizual': ['logic', 'auditiv', 'intuitiv'],
        'auditiv': ['vizual', 'intuitiv', 'logic'],
        'logic': ['vizual', 'intuitiv', 'auditiv'],
        'intuitiv': ['logic', 'vizual', 'auditiv']
    };
    
    return compatibilityMatrix[userStyle] || ['vizual', 'auditiv', 'logic', 'intuitiv'];
}

// Calcularea scorului de compatibilitate
function calculateCompatibilityScore(user, student) {
    let score = 0;
    
    // Compatibilitatea stilurilor de învățare (40%)
    const styleCompatibility = getStyleCompatibility(user.learningStyle, student.learningStyle);
    score += styleCompatibility * 0.4;
    
    // Complementaritatea punctelor forte/slabe (30%)
    const strengthsComplement = calculateStrengthsComplement(user.strengths, student.strengths, user.weaknesses, student.weaknesses);
    score += strengthsComplement * 0.3;
    
    // Rating-ul de colaborare (20%)
    score += (student.collaborationRating / 5.0) * 0.2;
    
    // Disponibilitatea (10%)
    const availabilityMatch = user.availability === 'flexibil' || student.availability === 'flexibil' || user.availability === student.availability;
    score += (availabilityMatch ? 1 : 0.5) * 0.1;
    
    return Math.round(score * 100);
}

// Compatibilitatea între stiluri
function getStyleCompatibility(style1, style2) {
    const compatibilityScores = {
        'vizual-logic': 0.95,
        'vizual-auditiv': 0.85,
        'vizual-intuitiv': 0.90,
        'auditiv-logic': 0.80,
        'auditiv-intuitiv': 0.92,
        'logic-intuitiv': 0.88
    };
    
    const key1 = `${style1}-${style2}`;
    const key2 = `${style2}-${style1}`;
    
    return compatibilityScores[key1] || compatibilityScores[key2] || 0.75;
}

// Calcularea complementarității punctelor forte
function calculateStrengthsComplement(userStrengths, studentStrengths, userWeaknesses, studentWeaknesses) {
    let complementScore = 0;
    
    // Verifică dacă punctele forte ale studentului acoperă slăbiciunile utilizatorului
    userWeaknesses.forEach(weakness => {
        if (studentStrengths.some(strength => strength.toLowerCase().includes(weakness.toLowerCase().substring(0, 4)))) {
            complementScore += 0.3;
        }
    });
    
    // Verifică dacă punctele forte ale utilizatorului acoperă slăbiciunile studentului
    studentWeaknesses.forEach(weakness => {
        if (userStrengths.some(strength => strength.toLowerCase().includes(weakness.toLowerCase().substring(0, 4)))) {
            complementScore += 0.3;
        }
    });
    
    // Evită overlap-ul complet al punctelor forte (diversitate)
    const commonStrengths = userStrengths.filter(strength => 
        studentStrengths.some(sStrength => sStrength.toLowerCase().includes(strength.toLowerCase().substring(0, 4)))
    );
    
    if (commonStrengths.length < userStrengths.length * 0.7) {
        complementScore += 0.4; // Bonus pentru diversitate
    }
    
    return Math.min(1, complementScore);
}

// Actualizarea interfeței pentru echipe
function updateTeamsInterface() {
    updateUserProfile();
    updateSuggestedTeammates();
    updateExistingTeams();
    updateCompetitions();
}

// Actualizarea profilului utilizatorului în interfață
function updateUserProfile() {
    const userProfileName = document.getElementById('userProfileName');
    const userLearningType = document.getElementById('userLearningType');
    
    if (userProfileName) {
        userProfileName.textContent = teamSystem.currentUser.name;
    }
    
    if (userLearningType) {
        userLearningType.textContent = `Stil ${teamSystem.currentUser.learningStyle}`;
    }
    
    // Actualizează punctele forte
    const strengthsContainer = document.querySelector('.your-profile .strengths');
    if (strengthsContainer) {
        strengthsContainer.innerHTML = teamSystem.currentUser.strengths
            .map(strength => `<span class="strength">${strength}</span>`)
            .join('');
    }
}

// Actualizarea sugestiilor de coechipieri
function updateSuggestedTeammates() {
    const teammatesGrid = document.querySelector('.teammates-grid');
    if (!teammatesGrid) return;
    
    teammatesGrid.innerHTML = teamSystem.suggestedTeammates
        .slice(0, 4) // Afișează doar primele 4
        .map(teammate => `
            <div class="teammate-card" data-student-id="${teammate.id}">
                <div class="profile-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="teammate-info">
                    <h4>${teammate.name}</h4>
                    <span class="learning-type">Stil ${teammate.learningStyle}</span>
                    <div class="compatibility">Match: ${teammate.compatibilityScore}%</div>
                    <div class="teammate-strengths">
                        ${teammate.strengths.slice(0, 2).map(strength => 
                            `<span class="mini-strength">${strength}</span>`
                        ).join('')}
                    </div>
                    <button class="btn btn-small" onclick="connectWithTeammate(${teammate.id})">
                        Conectează-te
                    </button>
                </div>
            </div>
        `).join('');
}

// Actualizarea echipelor existente
function updateExistingTeams() {
    const groupsList = document.querySelector('.groups-list');
    if (!groupsList) return;
    
    groupsList.innerHTML = existingTeams.map(team => `
        <div class="group-card" data-team-id="${team.id}">
            <div class="group-header">
                <h4>${team.name}</h4>
                <span class="member-count">${team.members.length} membri</span>
            </div>
            <div class="group-members">
                ${team.members.map(member => 
                    `<div class="member">${member.name} (${member.learningStyle})</div>`
                ).join('')}
            </div>
            <div class="group-stats">
                <span>Progres grup: ${team.progress}%</span>
                <div class="competition-score">🏆 Locul ${team.rank} din ${team.totalTeams}</div>
            </div>
            <div class="team-actions">
                <button class="btn btn-small" onclick="joinTeamSession(${team.id})">
                    Participă la sesiune
                </button>
                <button class="btn btn-small btn-secondary" onclick="viewTeamDetails(${team.id})">
                    Detalii echipă
                </button>
            </div>
        </div>
    `).join('');
}

// Actualizarea competițiilor
function updateCompetitions() {
    // Această funcție va fi extinsă pentru a afișa competițiile active
    console.log('🏆 Actualizare competiții:', activeCompetitions);
}

// Conectarea cu un coechipier
function connectWithTeammate(studentId) {
    const teammate = teamSystem.suggestedTeammates.find(s => s.id === studentId);
    if (!teammate) return;
    
    console.log('🤝 Conectare cu:', teammate.name);
    
    // Simulează procesul de conectare
    showAIMessage(`Excelentă alegere! ${teammate.name} pare perfect pentru stilul tău de învățare. Îi trimit o invitație de colaborare! 🤝`);
    
    // Actualizează scorul de colaborare
    teamSystem.collaborationScore += 10;
    
    // Simulează acceptarea și formarea echipei
    setTimeout(() => {
        formNewTeam(teammate);
    }, 3000);
    
    // Înregistrează acțiunea
    recordSessionData('teammate_connection_request', {
        teammateId: studentId,
        compatibilityScore: teammate.compatibilityScore
    });
}

// Formarea unei echipe noi
function formNewTeam(teammate) {
    const newTeam = {
        id: existingTeams.length + 1,
        name: `Echipa ${teammate.learningStyle.charAt(0).toUpperCase() + teammate.learningStyle.slice(1)}-${teamSystem.currentUser.learningStyle.charAt(0).toUpperCase() + teamSystem.currentUser.learningStyle.slice(1)}`,
        subject: 'general',
        members: [
            { 
                name: teamSystem.currentUser.name, 
                learningStyle: teamSystem.currentUser.learningStyle, 
                role: 'co-leader' 
            },
            { 
                name: teammate.name, 
                learningStyle: teammate.learningStyle, 
                role: 'co-leader' 
            }
        ],
        progress: 0,
        rank: Math.floor(Math.random() * 5) + 1,
        totalTeams: 10,
        achievements: ['🎉 Echipă nou formată'],
        nextSession: getNextSessionTime(),
        collaborative_score: teammate.compatibilityScore
    };
    
    existingTeams.push(newTeam);
    updateExistingTeams();
    
    showAIMessage(`🎉 Fantastic! Echipa voastră a fost formată cu succes! Compatibilitatea este de ${teammate.compatibilityScore}%. Să începeți prima sesiune de studiu! 🚀`);
    
    updateProgress(20);
}

// Participarea la o sesiune de echipă
function joinTeamSession(teamId) {
    const team = existingTeams.find(t => t.id === teamId);
    if (!team) return;
    
    console.log('📚 Participare la sesiunea echipei:', team.name);
    
    showAIMessage(`Te conectez la sesiunea echipei "${team.name}". Să înveți împreună cu colegii tăi! 👥📚`);
    
    // Simulează sesiunea de studiu colaborativ
    simulateCollaborativeSession(team);
    
    recordSessionData('team_session_joined', { teamId: teamId });
}

// Simularea unei sesiuni collaborative
function simulateCollaborativeSession(team) {
    const sessionActivities = [
        'Brainstorming pentru problema de matematică',
        'Explicarea conceptelor între membri',
        'Rezolvarea exercițiilor în echipă',
        'Feedback mutual și îmbunătățiri',
        'Planificarea sesiunii următoare'
    ];
    
    let activityIndex = 0;
    
    const sessionInterval = setInterval(() => {
        if (activityIndex < sessionActivities.length) {
            showAIMessage(`📚 ${sessionActivities[activityIndex]}... Echipa lucrează excelent împreună! 👏`);
            activityIndex++;
        } else {
            clearInterval(sessionInterval);
            completeTeamSession(team);
        }
    }, 2000);
}

// Finalizarea sesiunii de echipă
function completeTeamSession(team) {
    // Actualizează progresul echipei
    team.progress = Math.min(100, team.progress + Math.floor(Math.random() * 15) + 5);
    
    // Calculează punctele câștigate
    const pointsEarned = Math.floor(Math.random() * 20) + 10;
    
    showAIMessage(`🎉 Sesiune completată cu succes! Echipa a câștigat ${pointsEarned} puncte. Progresul echipei: ${team.progress}%. Excelentă colaborare! 🌟`);
    
    // Actualizează interfața
    updateExistingTeams();
    updateProgress(15);
    
    // Înregistrează rezultatele
    recordSessionData('team_session_completed', {
        teamId: team.id,
        pointsEarned: pointsEarned,
        newProgress: team.progress
    });
}

// Vizualizarea detaliilor echipei
function viewTeamDetails(teamId) {
    const team = existingTeams.find(t => t.id === teamId);
    if (!team) return;
    
    // Creează un modal sau o secțiune detaliată pentru echipă
    const detailsHtml = `
        <div class="team-details-modal">
            <h3>📊 Detalii echipă: ${team.name}</h3>
            <div class="team-stats-detailed">
                <div class="stat">
                    <span class="label">Progres general:</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${team.progress}%"></div>
                    </div>
                    <span class="value">${team.progress}%</span>
                </div>
                <div class="stat">
                    <span class="label">Ranking:</span>
                    <span class="value">Locul ${team.rank} din ${team.totalTeams}</span>
                </div>
                <div class="stat">
                    <span class="label">Scor colaborare:</span>
                    <span class="value">${team.collaborative_score}%</span>
                </div>
            </div>
            <div class="team-members-detailed">
                <h4>Membri echipei:</h4>
                ${team.members.map(member => `
                    <div class="member-detail">
                        <span class="member-name">${member.name}</span>
                        <span class="member-style">${member.learningStyle}</span>
                        <span class="member-role">${member.role}</span>
                    </div>
                `).join('')}
            </div>
            <div class="team-achievements">
                <h4>Realizări:</h4>
                ${team.achievements.map(achievement => `
                    <div class="achievement">${achievement}</div>
                `).join('')}
            </div>
            <button class="btn btn-primary" onclick="closeTeamDetails()">Închide</button>
        </div>
    `;
    
    // Afișează detaliile (în implementarea reală ar fi un modal)
    console.log('📊 Detalii echipă:', team);
    showAIMessage(`📊 Echipa "${team.name}" are un progres de ${team.progress}% și este pe locul ${team.rank}. Colaborarea merge excelent! 👥`);
}

// Obținerea timpului următoarei sesiuni
function getNextSessionTime() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0);
    
    return tomorrow.toISOString().substring(0, 16).replace('T', ' ');
}

// Simularea activității în timp real
function simulateRealTimeActivity() {
    // Simulează activitatea altor echipe și actualizări în timp real
    setInterval(() => {
        // Actualizează progresul echipelor random
        existingTeams.forEach(team => {
            if (Math.random() < 0.1) { // 10% șansă de actualizare
                team.progress = Math.min(100, team.progress + Math.floor(Math.random() * 3));
            }
        });
        
        // Actualizează ranking-urile random
        if (Math.random() < 0.05) { // 5% șansă
            existingTeams.forEach(team => {
                team.rank = Math.max(1, team.rank + (Math.random() < 0.5 ? -1 : 1));
            });
        }
        
    }, 30000); // La fiecare 30 de secunde
}

// Gestionarea competițiilor
function startCompetition(competitionId) {
    const competition = activeCompetitions.find(c => c.id === competitionId);
    if (!competition) return;
    
    showAIMessage(`🏆 Te-ai înscris la "${competition.name}"! Să arătăm ce poate echipa ta! Mult succes! 🚀`);
    
    recordSessionData('competition_joined', { competitionId: competitionId });
    updateProgress(25);
}

// Calcularea și afișarea statisticilor de colaborare
function calculateCollaborationStats() {
    const stats = {
        totalTeams: existingTeams.length,
        averageProgress: existingTeams.reduce((acc, team) => acc + team.progress, 0) / existingTeams.length,
        bestRank: Math.min(...existingTeams.map(team => team.rank)),
        collaborationScore: teamSystem.collaborationScore,
        connectionsMade: teamSystem.suggestedTeammates.filter(t => t.connected).length
    };
    
    console.log('📈 Statistici colaborare:', stats);
    return stats;
}

// Inițializarea sistemului când se încarcă modulul
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('teams')) {
        initializeTeamSystem();
    }
});

// Expune funcțiile pentru acces global
window.TeamsModule = {
    initializeTeamSystem,
    connectWithTeammate,
    joinTeamSession,
    viewTeamDetails,
    startCompetition,
    calculateCollaborationStats,
    getTeamSystem: () => teamSystem
};

console.log('👥 MindLearn Teams Module Loaded Successfully! 🤝');