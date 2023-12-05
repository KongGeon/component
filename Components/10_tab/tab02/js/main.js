// tab01
const tabList02 = document.querySelectorAll('.s__tab02-title')
const tabContents02 = document.querySelectorAll('.s__teb-contents')
tabList02.forEach(e => {
    const thisTabName = e.dataset.tab
    e.addEventListener('click', () => {
        tabList02.forEach(t => {
            t.classList.remove('active-on')
        })
        tabContents02.forEach(t => {
            t.classList.remove('active-on')
        })
        e.classList.add('active-on')
        document.getElementById(thisTabName).classList.add('active-on')
    }

    )
})