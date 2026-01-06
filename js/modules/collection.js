// collection.js
import { getAllFish, getFishById } from "./fishData.js";

// 특정 fishId가 잡혔는지 상태를 바꾸는 함수
export function markCaught(fishId) {
  const fish = getFishById(fishId);
  if (fish) fish.caught = true; // 잡았다고 상태 변경
  renderCollection();          // UI 업데이트
}

// 콜렉션 UI 렌더링
export function renderCollection() {
  const grid = document.getElementById("fishGrid");
  if (!grid) return;

  grid.innerHTML = "";

  getAllFish().forEach(fish => {
    const slot = document.createElement("div");
    slot.className = `fish-slot ${fish.caught ? "unlocked" : "locked"}`;

    slot.innerHTML = `
      <div class="fish-icon-wrapper">
        <img src="${fish.caught ? fish.image : 'assets/fish/placeholder.png'}" alt="${fish.name}">
      </div>
      <div class="fish-name">${fish.caught ? fish.name : "???"}</div>
      <div class="fish-biome">${fish.caught ? fish.biome : "???"}</div>
    `;

    grid.appendChild(slot);
  });
}

// 페이지 로드 시 렌더링
window.addEventListener("DOMContentLoaded", () => {
  renderCollection();
});