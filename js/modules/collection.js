import { getAllFish, getFishById } from "./fishData.js";
import { getCaughtFish, addCaughtFish } from "./playerState.js";

export function markCaught(fishId) {
  const fish = getFishById(fishId);
  if (!fish) return false;
  
  const success = addCaughtFish(fishId);
  if (success) {
    renderCollection();
    return true;
  }
  return false;
}

export function renderCollection() {
  const grid = document.getElementById("fishGrid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  const allFish = getAllFish();
  const caughtIds = getCaughtFish();
  
  allFish.forEach(fish => {
    const isCaught = caughtIds.includes(fish.id);
    const slot = document.createElement("div");
    slot.className = `fish-slot ${isCaught ? "unlocked" : "locked"}`;
    
    slot.innerHTML = `
      <div class="fish-icon-wrapper">
        <img src="../${fish.image}" alt="${fish.name}" style="${!isCaught ? 'filter: brightness(0) opacity(0.5);' : ''}">
      </div>
      <div class="fish-name">${isCaught ? fish.name : "???"}</div>
      <div class="fish-biome">${isCaught ? fish.biome.toUpperCase() : "???"}</div>
    `;
    
    grid.appendChild(slot);
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    renderCollection();
  });
}
/*import { getAllFish, getFishById } from "./fishData.js";
import { getCaughtFish, addCaughtFish } from "./playerState.js";

// 특정 fishId가 잡혔는지 상태를 저장하는 함수
export function markCaught(fishId) {
  const fish = getFishById(fishId);
  if (!fish) return;

  // 수집 상태는 playerState에만 저장
  addCaughtFish(fishId);

  // UI 업데이트
  renderCollection();
}

// 콜렉션 UI 렌더링
export function renderCollection() {
  const grid = document.getElementById("fishGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const allFish = getAllFish();
  const caughtIds = getCaughtFish(); // [1, 3, 5] 같은 배열

  allFish.forEach(fish => {
    const isCaught = caughtIds.includes(fish.id);

    const slot = document.createElement("div");
    slot.className = `fish-slot ${isCaught ? "unlocked" : "locked"}`;

    slot.innerHTML = `
      <div class="fish-icon-wrapper">
        <img src="${isCaught ? '../' + fish.image : 'assets/fish/placeholder.png'}" alt="${fish.name}">
      </div>
      <div class="fish-name">${isCaught ? fish.name : "???"}</div>
      <div class="fish-biome">${isCaught ? fish.biome : "???"}</div>
    `;

    grid.appendChild(slot);
  });
}

// 페이지 로드 시 렌더링
window.addEventListener("DOMContentLoaded", () => {
  renderCollection();
});*/
