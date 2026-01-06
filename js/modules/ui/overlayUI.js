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

document.querySelectorAll('.bait-btn').forEach(bait =>{
    bait.addEventListener('click', e => {
        document.getElementById('bait-modal').classList.add('hidden');
        document.getElementById('depth-meter').classList.remove('hidden');
    })
})

document.getElementById('list-button').addEventListener('click', ()=>{
    document.getElementById('collection-modal').classList.remove('hidden');
})
