import { checkDepth, getCurrentFish } from './gameState.js';
import { resetQTE } from './qte/qteSpin.js';

const depthMeter = document.getElementById('depth-meter')
const depthCursor = document.getElementById('cursor')
const meterBar = document.querySelector('.meter-bar')
const zones = document.querySelectorAll('.zone')

const biteMeterModal = document.getElementById('bite-meter-modal')
const biteMeter = document.getElementById('bite-meter')
const timingCursor = document.getElementById('timingCursor')
const successZone = document.getElementById('successZone')
const biteStatus = document.getElementById('biteStatus')

const qte1 = document.getElementById('qte1')
const baitModal = document.getElementById('bait-modal')
const biteFishImage = document.querySelector('.bite-fish')

const state = {
    active: 'depth',
    depthStopped: false,
    biteStopped: false,
    catchSuccess: false
}

export function resetDepthMeter() {
    state.depthStopped = false
    state.active = 'depth'
    if(depthCursor)
        depthCursor.style.animationPlayState = 'running'
}

function resetBiteMeter() {
    state.biteStopped = false
    state.active = 'bite'
    timingCursor.style.animationPlayState = 'running'
    biteStatus.textContent = 'STOP INSIDE THE TARGET!';
    biteStatus.style.color = ''; // 색상 초기화
}

function updateBiteFish() {
    const fish = getCurrentFish();
    biteFishImage.src = `../${fish.image}`
    biteFishImage.alt = fish
}

function stopDepthMeter() {
    if (state.depthStopped || state.active !== 'depth') return
    state.depthStopped = true

    const cursorStyle = getComputedStyle(depthCursor)
    const cursorLeft = parseFloat(cursorStyle.left)

    depthCursor.style.animationPlayState = 'paused'

    const barRect = meterBar.getBoundingClientRect()
    const cursorCenter = barRect.left + cursorLeft + depthCursor.offsetWidth / 2

    let resultZone = null
    let selectedDepth = null

    zones.forEach(zone => {
        const rect = zone.getBoundingClientRect()
        if (cursorCenter >= rect.left && cursorCenter <= rect.right) {
            resultZone = zone
            // zone의 클래스에서 깊이 추출 (p-zone, m-zone, s-zone)
            const zoneClass = Array.from(zone.classList).find(cls => cls.includes('-zone'))
            if (zoneClass) {
                selectedDepth = zoneClass.split('-')[0] // 'p', 'm', 's'
                // 'p' -> 'deep', 'm' -> 'medium', 's' -> 'shallow'
                if (selectedDepth === 'p') selectedDepth = 'deep'
                else if (selectedDepth === 'm') selectedDepth = 'medium'
                else if (selectedDepth === 's') selectedDepth = 'shallow'
            }
        }
    })

    if (resultZone && selectedDepth) {
        // gameState의 checkDepth 함수로 올바른 깊이인지 검증
        const isCorrect = checkDepth(selectedDepth)
        
        // 시각적 피드백 추가
        if (isCorrect) {
            resultZone.style.backgroundColor = '#00ff00'
            resultZone.style.transition = 'background-color 0.3s'
            setTimeout(() => {
                depthMeter.classList.add('hidden')
                biteMeterModal.classList.remove('hidden')
        
                updateBiteFish()
                resetBiteMeter()
        
                resultZone.style.backgroundColor = ''
            }, 500)
        } else {
            // 실패: 빨간색 피드백
            resultZone.style.backgroundColor = '#ff0000'
            resultZone.style.transition = 'background-color 0.3s'
            setTimeout(() => {
                resultZone.style.backgroundColor = ''
                resetDepthMeter()
                // 실패 시 재시작
                restartToPhase1()
            }, 800)
        }
    } else {
        // 구역을 선택하지 못한 경우
        setTimeout(() => {
            resetDepthMeter()
        }, 500)
    }
}

function stopBiteMeter() {
    if (state.biteStopped || state.active !== 'bite') return
    state.biteStopped = true

    timingCursor.style.animationPlayState = 'paused'

    const cursorRect = timingCursor.getBoundingClientRect()
    const zoneRect = successZone.getBoundingClientRect()
    const cursorCenter = cursorRect.left + cursorRect.width / 2

    if (cursorCenter >= zoneRect.left && cursorCenter <= zoneRect.right) {
        state.catchSuccess = true
        biteStatus.textContent = 'SUCCESS'
        biteStatus.style.color = '#00ff00'
        setTimeout(() => {
            biteMeterModal.classList.add('hidden')
            qte1.classList.remove('hidden')
            state.active = null
        }, 500)
    } else {
        state.catchSuccess = false
        biteStatus.textContent = 'FAIL'
        biteStatus.style.color = '#ff0000'
        setTimeout(() => {
            resetBiteMeter()
            // 실패 시 재시작
            restartToPhase1()
        }, 800)
    }
}

// 모든 단계에서 실패 시 Fase 1로 재시작하는 함수
export function restartToPhase1() {
    // 모든 모달 숨기기
    biteMeterModal.classList.add('hidden')
    qte1.classList.add('hidden')
    document.getElementById('qte2')?.classList.add('hidden')
    document.getElementById('result-modal')?.classList.add('hidden')
    
    // 상태 초기화
    state.active = 'depth'
    state.depthStopped = false
    state.biteStopped = false
    state.catchSuccess = false
    
    // 깊이 미터 재시작
    depthMeter.classList.remove('hidden')
    resetDepthMeter()
    
    // 미끼 모달 다시 표시 (선택을 다시 하도록)
    // baitModal.classList.remove('hidden')
}

depthMeter?.addEventListener('click', stopDepthMeter)
biteMeter?.addEventListener('click', stopBiteMeter)

document.addEventListener('keydown', e => {
    if (e.code !== 'Space') return
    if (state.active === 'depth') stopDepthMeter()
    if (state.active === 'bite') stopBiteMeter()
})

resetDepthMeter();

// document.getElementById("play-button")?.addEventListener("click", () => {
//     spinRoulette();  // 최소한의 액션
//   });
  
//   const player = { score: 0, upgrades: {} };  // 최소 객체 리터럴



  ////////
  // meterLogic.js 하단에 추가 (resetDepthMeter() 아래)

// 이벤트 리스너 재설치 함수
// function reinstallEventListeners() {
//     // 기존 리스너 제거 (중복 방지)
//     depthMeter.removeEventListener('click', stopDepthMeter);
//     biteMeter.removeEventListener('click', stopBiteMeter);
//     document.removeEventListener('keydown', handleKeydown);
    
//     // 새로 설치
//     depthMeter.addEventListener('click', stopDepthMeter);
//     biteMeter.addEventListener('click', stopBiteMeter);
//     document.addEventListener('keydown', handleKeydown);
//   }
  
//   // 키다운 핸들러 별도 함수로 분리
//   function handleKeydown(e) {
//     if (e.code !== 'Space') return;
//     if (state.active === 'depth') stopDepthMeter();
//     if (state.active === 'bite') stopBiteMeter();
//   }
  
//   // restartToPhase1() 수정
//   // meterLogic.js의 restartToPhase1() 함수 수정
// export function restartToPhase1() {
//     // 기존 코드...
//     biteMeterModal.classList.add('hidden');
//     qte1.classList.add('hidden');
//     document.getElementById('qte2')?.classList.add('hidden');
//     document.getElementById('result-modal')?.classList.add('hidden');
    
//     state.active = 'depth';
//     state.depthStopped = false;
//     state.biteStopped = false;
//     state.catchSuccess = false;
    
//     depthMeter.classList.remove('hidden');
//     resetDepthMeter();
//     baitModal.classList.remove('hidden');
    
//     // **QTE 상태 완전 초기화** ⭐
//     resetQTE();
    
//     reinstallEventListeners();
//   }
  
  
//   // 초기 실행 시 한 번 설치
//   reinstallEventListeners();
  
  
