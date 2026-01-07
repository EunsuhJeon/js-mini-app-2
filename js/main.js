import { loadRound, getCurrentFish, getCurrentRound, resetGame } from "./modules/gameState.js";
import { resetPlayerState } from "./modules/playerState.js";

document.getElementById('start-button')?.addEventListener('click', () =>{
    window.location.href = './pages/ingame.html';
})

function showRound() {
    let currentRound = getCurrentRound();
    if (currentRound === 1) {
        resetGame();
        resetPlayerState();
    }

    loadRound(1);
    updateHeader();

    document.getElementById('round-transition').classList.remove('hidden');
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
    showRound();
})