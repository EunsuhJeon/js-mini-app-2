// /js/modules/qte/qteKeys.js
// Lógica completa para la Fase 4: Secuencia de Teclas

import { restartToPhase1 } from '../meterLogic.js';
import { getCurrentFish } from '../gameState.js';
import { markCaught } from '../collection.js';

// ===== CONFIGURACIÓN =====
const CONFIG = {
    timeLimit: 6.0,      // 6 segundos para completar
    sequenceLength: 6,   // 6 letras en la secuencia
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // Letras disponibles
};

// ===== ESTADO DEL JUEGO =====
let state = {
    isActive: false,
    currentSequence: [],
    currentIndex: 0,
    timeLeft: CONFIG.timeLimit,
    timerInterval: null,
    isComplete: false,
    isFailed: false
};

// ===== ELEMENTOS DEL DOM =====
let keySequenceContainer;
let keyTimerFill;
let keyTimeDisplay;
let keyCountDisplay;
let qte2Overlay;

// ===== FUNCIONES PRINCIPALES =====

// 1. Inicializar QTE2
export function initQTE2() {
    console.log('🔄 Inicializando QTE2 (Key Sequence)...');
    
    // Obtener referencias a elementos DOM
    keySequenceContainer = document.getElementById('key-sequence');
    keyTimerFill = document.getElementById('key-timer-fill');
    keyTimeDisplay = document.getElementById('key-time');
    keyCountDisplay = document.getElementById('key-count');
    qte2Overlay = document.getElementById('qte2');
    
    if (!keySequenceContainer) {
        console.error('❌ No se encontró #key-sequence en el DOM');
        return;
    }
    
    // Reiniciar estado
    resetQTE2();
    
    // Generar secuencia aleatoria
    generateRandomSequence();
    
    // Renderizar teclas en pantalla
    renderKeyBoxes();
    
    // Iniciar temporizador
    startTimer();
    
    // Configurar event listener para teclas
    setupKeyListener();
    
    state.isActive = true;
    
    console.log(`✅ QTE2 listo! Secuencia: ${state.currentSequence.join(' ')}`);
}

// 2. Generar secuencia aleatoria de letras
function generateRandomSequence() {
    state.currentSequence = [];
    
    for (let i = 0; i < CONFIG.sequenceLength; i++) {
        const randomIndex = Math.floor(Math.random() * CONFIG.letters.length);
        const letter = CONFIG.letters[randomIndex];
        state.currentSequence.push(letter);
    }
    
    state.currentIndex = 0;
    state.isComplete = false;
    state.isFailed = false;
}

// 3. Renderizar cajas de teclas en pantalla
function renderKeyBoxes() {
    keySequenceContainer.innerHTML = '';
    
    state.currentSequence.forEach((letter, index) => {
        const keyBox = document.createElement('div');
        keyBox.className = 'key-box';
        
        // Marcar como completada si ya se presionó
        if (index < state.currentIndex) {
            keyBox.classList.add('correct');
        }
        
        keyBox.textContent = letter;
        keyBox.id = `key-box-${index}`;
        
        keySequenceContainer.appendChild(keyBox);
    });
    
    // Actualizar contador
    if (keyCountDisplay) {
        keyCountDisplay.textContent = `${state.currentIndex} / ${CONFIG.sequenceLength}`;
    }
}

// 4. Iniciar temporizador
function startTimer() {
    const startTime = Date.now();
    
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
    }
    
    state.timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        state.timeLeft = (CONFIG.timeLimit - elapsed).toFixed(1);
        
        // Actualizar display
        if (keyTimeDisplay) {
            keyTimeDisplay.textContent = `${state.timeLeft}s`;
        }
        
        // Actualizar barra de progreso
        if (keyTimerFill) {
            const percentage = (state.timeLeft / CONFIG.timeLimit) * 100;
            keyTimerFill.style.width = `${percentage}%`;
        }
        
        // Verificar si se acabó el tiempo
        if (state.timeLeft <= 0) {
            handleTimeOut();
        }
    }, 100);
}

// 5. Configurar listener para teclas
function setupKeyListener() {
    // Remover listener anterior si existe
    document.removeEventListener('keydown', handleKeyPress);
    
    // Agregar nuevo listener
    document.addEventListener('keydown', handleKeyPress);
}

// 6. Manejar presión de teclas
function handleKeyPress(event) {
    if (!state.isActive || state.isComplete || state.isFailed) {
        return;
    }
    
    // Obtener la tecla presionada (en mayúscula)
    const pressedKey = event.key.toUpperCase();
    
    // Verificar si es una letra válida
    if (!CONFIG.letters.includes(pressedKey)) {
        return;
    }
    
    // Obtener la letra esperada
    const expectedKey = state.currentSequence[state.currentIndex];
    
    // Verificar si es correcta
    if (pressedKey === expectedKey) {
        handleCorrectKey();
    } else {
        handleWrongKey();
    }
}

// 7. Manejar tecla correcta
function handleCorrectKey() {
    // Incrementar índice
    state.currentIndex++;
    
    // Actualizar display
    renderKeyBoxes();
    
    // Verificar si se completó la secuencia
    if (state.currentIndex >= CONFIG.sequenceLength) {
        handleSequenceComplete();
    }
}

// 8. Manejar tecla incorrecta
function handleWrongKey() {
    console.log('❌ Tecla incorrecta!');
    
    // Resaltar la tecla incorrecta temporalmente
    const currentKeyBox = document.getElementById(`key-box-${state.currentIndex}`);
    if (currentKeyBox) {
        currentKeyBox.classList.add('wrong');
        
        // Remover clase después de animación
        setTimeout(() => {
            currentKeyBox.classList.remove('wrong');
        }, 500);
    }
}

// 9. Manejar secuencia completada
function handleSequenceComplete() {
    console.log('✅ Secuencia completada!');
    
    state.isComplete = true;
    state.isActive = false;
    
    // Detener temporizador
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    
    // Remover event listener
    document.removeEventListener('keydown', handleKeyPress);
    
    // Mostrar resultado exitoso
    showSuccessResult();
}

// 10. Manejar tiempo agotado
function handleTimeOut() {
    console.log('⏰ Tiempo agotado!');
    
    state.isFailed = true;
    state.isActive = false;
    
    // Detener temporizador
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    
    // Remover event listener
    document.removeEventListener('keydown', handleKeyPress);
    
    // Mostrar fallo
    showFailure();
}

// 11. Mostrar resultado exitoso
function showSuccessResult() {
    // Ocultar QTE2
    if (qte2Overlay) {
        qte2Overlay.classList.add('hidden');
    }
    
    // Obtener información del pez actual
    const currentFish = getCurrentFish();
    
    // Marcar como atrapado
    if (currentFish) {
        markCaught(currentFish.id);
    }
    
    // Mostrar modal de resultado
    showResultModal(currentFish);
}

// 12. Mostrar modal de resultado (similar a qteSpin.js)
function showResultModal(fish) {
    const resultModal = document.getElementById('result-modal');
    const resultFishName = document.getElementById('result-fish-name');
    const resultRarity = document.getElementById('result-rarity');
    const resultPoints = document.getElementById('result-points');
    const caughtFishImage = document.querySelector('.chatched-fish');
    
    if (!resultModal || !fish) return;
    
    // Mostrar información del pez
    if (resultFishName) resultFishName.textContent = fish.name.toUpperCase();
    if (resultRarity) resultRarity.textContent = fish.rarity.toUpperCase();
    if (resultPoints) resultPoints.textContent = '+100 PTS';
    
    // Mostrar imagen
    if (caughtFishImage) {
        caughtFishImage.src = `../${fish.image}`;
        caughtFishImage.alt = fish.name;
    }
    
    // Mostrar modal
    resultModal.classList.remove('hidden');
}

// 13. Mostrar fallo
function showFailure() {
    // Mostrar mensaje de fallo
    const keyTimerFill = document.getElementById('key-timer-fill');
    if (keyTimerFill) {
        keyTimerFill.style.backgroundColor = '#ff0000';
    }
    
    if (keyTimeDisplay) {
        keyTimeDisplay.textContent = '0.0s';
        keyTimeDisplay.style.color = '#ff0000';
    }
    
    // Después de un breve retraso, reiniciar a Fase 1
    setTimeout(() => {
        restartToPhase1();
        resetQTE2();
    }, 1500);
}

// 14. Reiniciar QTE2
export function resetQTE2() {
    // Limpiar intervalo
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    
    // Remover event listener
    document.removeEventListener('keydown', handleKeyPress);
    
    // Reiniciar estado
    state = {
        isActive: false,
        currentSequence: [],
        currentIndex: 0,
        timeLeft: CONFIG.timeLimit,
        timerInterval: null,
        isComplete: false,
        isFailed: false
    };
    
    // Reiniciar displays
    if (keyTimerFill) {
        keyTimerFill.style.width = '100%';
        keyTimerFill.style.backgroundColor = '';
    }
    
    if (keyTimeDisplay) {
        keyTimeDisplay.textContent = `${CONFIG.timeLimit.toFixed(1)}s`;
        keyTimeDisplay.style.color = '';
    }
    
    if (keyCountDisplay) {
        keyCountDisplay.textContent = '0 / 6';
    }
    
    console.log('🔄 QTE2 reiniciado');
}

// 15. Función para iniciar QTE2 desde QTE1
export function startQTE2() {
    // Ocultar QTE1
    const qte1 = document.getElementById('qte1');
    if (qte1) {
        qte1.classList.add('hidden');
    }
    
    // Mostrar QTE2
    const qte2 = document.getElementById('qte2');
    if (qte2) {
        qte2.classList.remove('hidden');
    }
    
    // Inicializar QTE2
    initQTE2();
}

// ===== INICIALIZACIÓN =====
// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar si estamos en la página de juego
    if (window.location.pathname.includes('ingame.html')) {
        // Configurar elementos DOM
        keySequenceContainer = document.getElementById('key-sequence');
        keyTimerFill = document.getElementById('key-timer-fill');
        keyTimeDisplay = document.getElementById('key-time');
        keyCountDisplay = document.getElementById('key-count');
        qte2Overlay = document.getElementById('qte2');
        
        console.log('📝 QTE2 inicializado (listener setup)');
    }
});