import { loadRound, getCurrentFish, getCurrentRound, resetGame } from "./modules/gameState.js";
import { resetPlayerState } from "./modules/playerState.js";
import { restartToPhase1 } from "./modules/meterLogic.js";
import { resetQTE } from "./modules/qte/qteSpin.js";

document.getElementById('start-button')?.addEventListener('click', () =>{
    window.location.href = './pages/ingame.html';
})

function showRound() {
    let currentRound = getCurrentRound();
    if (currentRound === 1) {
        resetGame();
        resetPlayerState();
    }

    loadRound(currentRound);
    updateHeader();

    document.getElementById('round-transition').classList.remove('hidden');
    document.getElementById('transition-round').textContent = currentRound;
    setTimeout(() => {
        document.getElementById('round-transition').classList.add('hidden');
    }, 3000)
    setTimeout(() => {
        updateTargetModal();
        document.getElementById('target-modal').classList.remove('hidden');
    }, 3500)
}

function updateTargetModal() {
    const currentFish = getCurrentFish();
    if (!currentFish) {
      console.error("No target fish selected!");
      return;
    }
  
    // 실제 #target-modal 내부 구조에 맞게 업데이트
    const fishImageEl = document.querySelector("#target-modal .target-fish-image");
    const fishNameEl = document.getElementById("overlay-fish-name");
  
    if (fishImageEl) {
      fishImageEl.src = '../' + currentFish.image;  // 타겟 물고기 이미지
      fishImageEl.alt = currentFish.name;
    }
  
    if (fishNameEl) {
      fishNameEl.textContent = currentFish.name.toUpperCase();  // "ATLANTIC SALMON" 스타일
    }
  
    console.log(`Target modal updated: ${currentFish.name}`);
}

function updateHeader() {
    const currentFish = getCurrentFish();
    if (!currentFish) {
        console.error("No target fish selected!");
        return;
    }

    // 헤더 업데이트
    const headerBiomeEl = document.getElementById("header-biome");
    const headerTargetEl = document.getElementById("header-target");

    if (headerBiomeEl) {
        headerBiomeEl.textContent = currentFish.biome.toUpperCase();  // "RIVER"
    }

    if (headerTargetEl) {
        headerTargetEl.textContent = currentFish.name.toUpperCase();  // "SALMON"
    }

    console.log(`Header updated: ${currentFish.name} (${currentFish.biome})`);
}
  

window.addEventListener('DOMContentLoaded', () => {
    if (!location.pathname.includes('index.html')) {
        showRound();
    }
    
})


////===== meet requirements =======
// main.js 상단에 추가 (기존 import 아래)
// let animationId;

// 최소한의 추가 함수들
// function spinRoulette() {
//   $("#result").text("Spinning...").fadeOut(500).fadeIn(500);
// }

// function updateScore(points) {
//   gameState.score += points;
//   $("#score-display").text(`Score: ${gameState.score.toString().padStart(4, '0')}`);
// }

// function renderHUD() {
//   $("#target-info").html(`TARGET: ${getCurrentFish()?.name || "?"}`);
// }

// Animation 루프 (미미하게)
// function animationLoop() {
//   const canvas = document.getElementById("fishCanvas");
//   const ctx = canvas.getContext("2d");
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // 최소한의 루프
//   animationId = requestAnimationFrame(animationLoop);
// }



////===== backup =======

document.addEventListener("DOMContentLoaded", () => {
    // 기존 showRound() 등...
    
    // CONTINUE 버튼 이벤트
    const continueBtn = document.getElementById("continue-button");
    if (continueBtn) {
      continueBtn.addEventListener("click", nextRound);
    }
  });
  
  // 다음 라운드 함수
  // main.js의 nextRound() 함수 (완전 버전)
function nextRound() {
    const currentRound = getCurrentRound();
    const nextRoundNum = currentRound + 1;
    
    console.log(`Moving to Round ${nextRoundNum}...`);
    
    // 1. 결과 모달 숨기기
    document.getElementById("result-modal")?.classList.add("hidden");
    
    // 2. 라운드 전환 연출
    const transitionEl = document.getElementById("round-transition");
    transitionEl?.classList.remove("hidden");
    document.getElementById('transition-round').textContent = getCurrentRound() + 1;
    
    setTimeout(() => {
      // 3. 다음 라운드 로드
      loadRound(nextRoundNum);
      
      restartToPhase1();     // meter + QTE 초기화
      resetQTE();  
      
      // 5. UI 업데이트
      updateHeader();
      
      // 6. 연출 끝내고 타겟 모달 표시
      transitionEl?.classList.add("hidden");
      setTimeout(() => {
        updateTargetModal();
        document.getElementById("target-modal")?.classList.remove("hidden");
      }, 500);
      
    }, 2000);
  }
  
      
  