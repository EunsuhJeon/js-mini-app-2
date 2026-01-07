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

const state = {
    active: 'depth',
    depthStopped: false,
    biteStopped: false,
    catchSuccess: false
}

function resetDepthMeter() {
    state.depthStopped = false
    state.active = 'depth'
    depthCursor.style.animationPlayState = 'running'
}

function resetBiteMeter() {
    state.biteStopped = false
    state.active = 'bite'
    timingCursor.style.animationPlayState = 'running'
    biteStatus.textContent = 'STOP INSIDE THE TARGET!';
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

    zones.forEach(zone => {
        const rect = zone.getBoundingClientRect()
        if (cursorCenter >= rect.left && cursorCenter <= rect.right) {
            resultZone = zone
        }
    })

    if (resultZone) {
        depthMeter.classList.add('hidden')
        biteMeterModal.classList.remove('hidden')
        resetBiteMeter()
    } else {
        setTimeout(resetDepthMeter, 500)
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
        setTimeout(() => {
            biteMeterModal.classList.add('hidden')
            qte1.classList.remove('hidden')
            state.active = null
        }, 500)
    } else {
        state.catchSuccess = false
        biteStatus.textContent = 'FAIL'
        setTimeout(resetBiteMeter, 600)
    }
}

depthMeter.addEventListener('click', stopDepthMeter)
biteMeter.addEventListener('click', stopBiteMeter)

document.addEventListener('keydown', e => {
    if (e.code !== 'Space') return
    if (state.active === 'depth') stopDepthMeter()
    if (state.active === 'bite') stopBiteMeter()
})

resetDepthMeter()