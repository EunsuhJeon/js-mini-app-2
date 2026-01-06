document.getElementById('start-button')?.addEventListener('click', () =>{
    window.location.href = './pages/ingame.html';
})

function showRound() {
    document.getElementById('round-transition').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('round-transition').classList.add('hidden');
    }, 3000)
    setTimeout(() => {
        document.getElementById('target-modal').classList.remove('hidden');
    }, 3500)
}

window.addEventListener('DOMContentLoaded', () => {
    showRound();
})