import { markCaught } from "../collection.js";
import { restartToPhase1 } from "../meterLogic.js";
import { getCurrentFish } from "../gameState.js";

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

export function handleVictory() {
    const qte1 = document.getElementById('qte1');
    const qte2 = document.getElementById('qte2');
    const resultModal = document.getElementById('result-modal');
    const reelStatus = document.getElementById('reelStatus');
    const clickArea = document.getElementById('reelClickArea');
    
    // 기존 QTE1 처리 후 victory 호출 시
    clearInterval(timerInterval);
    if (clickArea) clickArea.style.cursor = "default";
    if (reelStatus) {
        reelStatus.textContent = 'SUCCESS!';
        reelStatus.style.color = '#00ff00';
    }

    // QTE1 숨기고 QTE2 보이기
    if (qte1) qte1.classList.add('hidden');
    if (qte2) qte2.classList.remove('hidden');

    // QTE2: 아무 키 입력 시 결과 처리
    const handleQTE2 = (e) => {
        if (!qte2 || qte2.classList.contains('hidden')) return;

        // QTE2 숨기기
        qte2.classList.add('hidden');

        // 현재 물고기 정보 가져오기
        const currentFish = getCurrentFish();
        
        // 결과 모달에 물고기 정보 표시
        showResultModal(currentFish);

        // 잡은 물고기 상태 업데이트
        if (currentFish) {
            markCaught(currentFish.id);
        }

        // 이벤트 리스너 제거
        document.removeEventListener('keydown', handleQTE2);
    };

    document.addEventListener('keydown', handleQTE2);
}

function showResultModal(fish) {
    const resultModal = document.getElementById('result-modal');
    const resultFishName = document.getElementById('result-fish-name');
    const resultRarity = document.getElementById('result-rarity');
    const resultPoints = document.getElementById('result-points');
    const caughtFishImage = document.querySelector('.chatched-fish');
    
    if (!resultModal || !fish) return;
    
    // 물고기 정보 표시
    if (resultFishName) resultFishName.textContent = fish.name.toUpperCase();
    if (resultRarity) resultRarity.textContent = fish.rarity.toUpperCase();
    if (resultPoints) resultPoints.textContent = '+100 PTS';
    
    // 물고기 이미지 표시
    if (caughtFishImage) {
        caughtFishImage.src = `../${fish.image}`;
        caughtFishImage.alt = fish.name;
    }
    
    // 모달 표시
    resultModal.classList.remove('hidden');
}

function gameOver() {
    clearInterval(timerInterval);
    isGameOver = true;
    clickArea.style.pointerEvents = "none";
    reelStatus.textContent = 'FAILED!';
    reelStatus.style.color = '#ff0000';
    
    // 실패 시 Fase 1로 재시작
    setTimeout(() => {
        restartToPhase1();
        // QTE 상태 초기화
        resetQTE();
    }, 1500);
}

export function resetQTE() {
    clicks = 0;
    currentRotation = 0;
    timeLeft = timeLimit;
    isGameOver = false;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (handle) handle.style.transform = 'rotate(0deg)';
    if (gaugeFill) gaugeFill.style.width = '0%';
    if (clickDisplay) clickDisplay.innerText = '0';
    if (timeDisplay) timeDisplay.innerText = `${timeLimit.toFixed(1)}s`;
    if (clickArea) clickArea.style.pointerEvents = "auto";
    if (reelStatus) {
        reelStatus.textContent = 'CLICK THE REEL AS FAST AS YOU CAN!';
        reelStatus.style.color = '';
    }
}

// reelLogic.js (QTE 파일) 하단에 추가
// export function resetQTE() {
//     clicks = 0;
//     currentRotation = 0;
//     timeLeft = timeLimit;
//     isGameOver = false;
//     if (timerInterval) {
//       clearInterval(timerInterval);
//       timerInterval = null;
//     }
//     if (handle) handle.style.transform = 'rotate(0deg)';
//     if (gaugeFill) gaugeFill.style.width = '0%';
//     if (clickDisplay) clickDisplay.innerText = '0';
//     if (timeDisplay) timeDisplay.innerText = `${timeLimit.toFixed(1)}s`;
//     if (clickArea) {
//       clickArea.style.pointerEvents = "auto";
//       clickArea.style.cursor = "pointer";  // 클릭 가능 상태
//     }
//     if (reelStatus) {
//       reelStatus.textContent = 'CLICK THE REEL AS FAST AS YOU CAN!';
//       reelStatus.style.color = '';
//     }
//   }
  