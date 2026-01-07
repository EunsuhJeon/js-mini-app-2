// /js/modules/phaseManager.js
import { checkDepth, checkHookTiming, getGameState } from './gameState.js';

export function setupDepthMeter() {
    const depthMeter = document.getElementById('depth-meter');
    const cursor = document.getElementById('cursor');
    
    if (!depthMeter || !cursor) return;
    
    depthMeter.addEventListener('click', () => {
        const cursorStyle = getComputedStyle(cursor);
        const cursorLeft = parseFloat(cursorStyle.left);
        const meterBar = document.querySelector('.meter-bar');
        const barRect = meterBar.getBoundingClientRect();
        const cursorCenter = barRect.left + cursorLeft + cursor.offsetWidth / 2;
        
        const zones = document.querySelectorAll('.zone');
        let selectedZone = null;
        
        zones.forEach((zone, index) => {
            const rect = zone.getBoundingClientRect();
            if (cursorCenter >= rect.left && cursorCenter <= rect.right) {
                const zoneNames = ['deep', 'medium', 'shallow'];
                selectedZone = zoneNames[index];
            }
        });
        
        if (selectedZone) {
            const isCorrect = checkDepth(selectedZone);
            
            if (isCorrect) {
                depthMeter.classList.add('hidden');
                document.getElementById('bite-meter-modal').classList.remove('hidden');
            } else {
                alert('Wrong depth! Try again.');
                depthMeter.classList.add('hidden');
                document.getElementById('bait-modal').classList.remove('hidden');
            }
        }
    });
}