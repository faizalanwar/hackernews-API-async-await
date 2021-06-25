//https://api.hnpwa.com/v0/news/1.json
const globalState = {
    page : 1,
    activePage: 'news'
}

const generateTemplate = function (n) {  
    return `
    <div class="news-item">
        <div class="score">${n.points || 0}</div>
        <div class="title">
            <a href="${n.url}">${n.title}</a>
            <span class="host">${n.domain}</span>
        </div>
        <div class="meta">
            <span class="by">
                by <a href="">${n.user}</a>
            </span>
            <span class="time">${n.time_ago}</span>
            <span class="comments-link">| <a href="${n.url}">comments: ${n.comments_count}</a></span>
        </div>
    </div>
    `
}

const fetchNewsData = async function (param) {
    const res = await fetch(`https://api.hnpwa.com/v0/${globalState.activePage}/${globalState.page}.json`)
    return await res.json();
}

window.addEventListener('DOMContentLoaded', async function () {  
    const containerLists = document.getElementById('container-lists')
    const navigations = document.querySelectorAll('.js-navbar')
    const nextPage = document.querySelector('.js-next-page')
    const currentPage = document.querySelector('.js-current-page')

    nextPage.addEventListener('click', async () => {
        globalState.page = globalState.page + 1
        currentPage.innerText = globalState.page

        const news = await fetchNewsData('news')
        const newsList = news.map(generateTemplate)

        containerLists.innerHTML = newsList.join('')
    })

    console.log(navigations);
    navigations.forEach(function (nav) {  
        nav.addEventListener('click', async function (event) {  
            const navbar = event.target.dataset.navbar;
            globalState.page = 1
            globalState.activePage = navbar
            currentPage.innerText = globalState.page
            const news = await fetchNewsData(navbar)

            const newsList = news.map(generateTemplate)
            containerLists.innerHTML = newsList.join('')
        })
    })

    
    const news = await fetchNewsData('news')
    const newsList = news.map(generateTemplate)

    containerLists.innerHTML = newsList.join('')

})