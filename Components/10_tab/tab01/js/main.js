// tab01
const tabList = document.querySelectorAll('.s__tab01-box')
tabList.forEach(e => {
    const thisTabName = e.dataset.tab
    e.addEventListener('click', () => {
        tabList.forEach(t => {
            if (t.dataset.tab === thisTabName) {
                t.classList.remove('is-active')
            }
        })
        e.classList.add('is-active')
    }

    )
})