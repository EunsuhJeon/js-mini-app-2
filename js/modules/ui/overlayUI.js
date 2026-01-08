import { checkBait } from "../../modules/gameState.js";
import { resetDepthMeter } from "../../modules/meterLogic.js";
import { getAllBaits } from "../../modules/baits.js";  // baits.js import


document.querySelectorAll('.close-icon').forEach(icon => {
    icon.addEventListener('click', e => {
        const overlay = e.currentTarget.closest('.overlay')
        if (!overlay) return
        overlay.classList.add('hidden')
    })
})

document.getElementById('book-button').addEventListener('click', () =>{
    document.getElementById('encyclopedia-modal').classList.remove('hidden');
})

document.getElementById('cast-button').addEventListener('click', () =>{
    document.getElementById('bait-modal').classList.remove('hidden');
})

// document.querySelectorAll('.bait-btn').forEach(bait =>{
//     bait.addEventListener('click', e => {
//         document.getElementById('bait-modal').classList.add('hidden');
//         document.getElementById('depth-meter').classList.remove('hidden');
//         renderBaitGrid();
//     })
// })

document.getElementById('list-button').addEventListener('click', ()=>{
    document.getElementById('collection-modal').classList.remove('hidden');
})


// overlayUI.js 하단에 추가 (또는 별도 baitUI.js)


function renderBaitGrid() {
  const baitGrid = document.getElementById("bait-grid");
  if (!baitGrid) return;

  const baits = getAllBaits();  // baits.js에서 데이터 가져오기

  // 기존 버튼들 제거
  baitGrid.innerHTML = "";

  baits.forEach(bait => {
    const baitBtn = document.createElement("button");
    baitBtn.className = "bait-btn";
    baitBtn.dataset.baitName = bait.name.toLowerCase();  // 선택 시 사용

    baitBtn.innerHTML = `
      <div class="bait-btn-img">
        <img src="../${bait.image}" alt="${bait.name}" class="bait-image">
      </div>
      <div class="bait-btn-name">${bait.name.toUpperCase()}</div>
    `;

    // 미끼 선택 이벤트
    baitBtn.addEventListener("click", () => {
      selectBait(bait.name);
        document.getElementById('bait-modal').classList.add('hidden');
        document.getElementById('depth-meter').classList.remove('hidden');
        renderBaitGrid();
    });

    baitGrid.appendChild(baitBtn);
  });
}

// 미끼 선택 처리
function selectBait(baitName) {
  // gameState.js의 checkBait 호출
  const isCorrect = checkBait(baitName);
  
  if (isCorrect) {
    console.log(`✅ Correct bait: ${baitName}`);
    // 올바른 미끼 → depth meter로 진행
    document.getElementById("bait-modal").classList.add("hidden");
    document.getElementById("depth-meter").classList.remove("hidden");
    resetDepthMeter();  // meterLogic.js에서
  } else {
    console.log(`❌ Wrong bait: ${baitName}`);
    // 잘못된 미끼 → 다시 선택
  }
}

// 초기화
document.addEventListener("DOMContentLoaded", renderBaitGrid);
