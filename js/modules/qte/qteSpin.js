//import { markCaught } from "../collection.js";
import { addCaughtFish } from '../playerState.js';
import { getGameState } from '../gameState.js';

let clicks = 0;
let currentRotation = 0;
const maxClicks = 10;
const timeLimit = 5.0;
let timeLeft = timeLimit;
let timerInterval = null;
let isGameOver = false;

const handle = document.getElementById("reelHandle");
const clickArea = document.getElementById("reelClickArea");
const gaugeFill = document.getElementById("reel-progress-fill");
const clickDisplay = document.getElementById("reel-count");
const timeDisplay = document.getElementById("reel-time");
const reelStatus = document.getElementById('reelStatus');

if (handle && clickArea && gaugeFill && clickDisplay && timeDisplay) {
    clickArea.addEventListener("click", () => {
        if (isGameOver || clicks >= maxClicks) return;

        if (clicks === 0 && !timerInterval) {
            startTimer();
        }

        clicks++;
        currentRotation += 200;
        handle.style.transform = `rotate(${currentRotation}deg)`;

        clickDisplay.innerText = clicks;
        gaugeFill.style.width = `${(clicks / maxClicks) * 100}%`;

        if (clicks === maxClicks) {
            handleVictory();
        }
    });
}

function startTimer() {
    const startTime = Date.now();
    
    timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        timeLeft = (timeLimit - elapsed).toFixed(1);

        if (timeLeft <= 0) {
            timeLeft = "0.0";
            gameOver();
        }
        
        timeDisplay.innerText = `${timeLeft}s`;
    }, 100);
}

export function handleVictory(fishId) {
    const qte1 = document.getElementById('qte1');
    const qte2 = document.getElementById('qte2');
    const resultModal = document.getElementById('result-modal');
    const reelStatus = document.getElementById('reelStatus');
    const clickArea = document.getElementById('clickArea'); // QTE 클릭 영역
    let timerInterval;

    // 기존 QTE1 처리 후 victory 호출 시
    clearInterval(timerInterval);
    if (clickArea) clickArea.style.cursor = "default";
    if (reelStatus) reelStatus.textContent = 'SUCCESS!';

    // QTE1 숨기고 QTE2 보이기
    if (qte1) qte1.classList.add('hidden');
    if (qte2) qte2.classList.remove('hidden');

    // QTE2: 아무 키 입력 시 결과 처리
    const handleQTE2 = (e) => {
        if (!qte2 || qte2.classList.contains('hidden')) return;

        // QTE2 숨기기
        qte2.classList.add('hidden');

        // 결과 모달 열기
        if (resultModal) resultModal.classList.remove('hidden');

        // 잡은 물고기 상태 업데이트
        // 예: QTE 성공 시 물고기 ID 3을 잡음 처리
        //markCaught(3); // Catfish 잡음 처리 후 콜렉션 UI 자동 갱신
        const state = getGameState();
        if (state.currentFish) {
            addCaughtFish(state.currentFish.id);
            console.log(`🎉 ${state.currentFish.name} caught!`);
        }

        // 이벤트 리스너 제거
        document.removeEventListener('keydown', handleQTE2);
    };

    document.addEventListener('keydown', handleQTE2);
}

function gameOver() {
    clearInterval(timerInterval);
    isGameOver = true;
    clickArea.style.pointerEvents = "none";
    reelStatus.textContent = 'FAILED!';
}