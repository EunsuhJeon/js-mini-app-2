const CAUGHT_FISH_KEY = "caughtFishIds";

// 내부 유틸: 로컬스토리지에서 배열 가져오기
function loadCaughtFishFromStorage() {
  try {
    const raw = localStorage.getItem(CAUGHT_FISH_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    console.error("Failed to load caught fish from storage:", e);
    return [];
  }
}

// 내부 유틸: 로컬스토리지에 배열 저장
function saveCaughtFishToStorage(ids) {
  try {
    localStorage.setItem(CAUGHT_FISH_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error("Failed to save caught fish to storage:", e);
  }
}

// 이미 잡은 물고기 id 목록 반환
export function getCaughtFish() {
  return loadCaughtFishFromStorage(); // 예: [1, 3, 5]
}

// 새 물고기 id를 잡았을 때 호출
export function addCaughtFish(fishId) {
  const ids = loadCaughtFishFromStorage();
  if (!ids.includes(fishId)) {
    ids.push(fishId);
    saveCaughtFishToStorage(ids);
  }
  return ids;
}

// 수집 상태를 초기화하고 싶을 때
export function resetCaughtFish() {
  saveCaughtFishToStorage([]);
}

  
// 전체 플레이어 데이터 초기화
  export function resetPlayerState() {
    resetCaughtFish();
    // 나중에 점수, 업적 등 추가
}