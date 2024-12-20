const sidebarOpenBtn = document.querySelector('.openSidebarBtn')
const sidebarCloseBtn = document.querySelector(".closeSidebarBtn")
const sidebarEl = document.querySelector(".toggleSideBar")
const searchBtn = document.querySelectorAll(".searchBtn")
const searchEl = document.querySelector(".search")
const searchDropEl = document.querySelector(".search__drop")
const searchInputEl = document.querySelector(".search__input input")
const clearSearchInputBtn = document.querySelector(".clearSearchInput")

sidebarOpenBtn.addEventListener("click", ()=> {
    sidebarEl.style.right = "0px"
})

sidebarCloseBtn.addEventListener("click", ()=> {
    sidebarEl.style.right = "-250px"
})

searchBtn.forEach(eachBtn => {
    eachBtn.addEventListener("click", () => {
        searchEl.classList.toggle("activeSearch")
    })
})

window.addEventListener("resize", () => {
    if (window.innerWidth >= 850) {
        if (searchEl.classList.contains("activeSearch")) {
            searchEl.classList.remove("activeSearch");
        }
    }
});

searchInputEl.addEventListener("keyup", async (e)=> {
    const value = e.target.value.trim()
    if(value){
        searchDropEl.style.display = "block"
        const response = await fetch(`${BASE_URL}/products/search?q=${value}&limit=5`)
        response.json()
        .then(res => {
            searchDropEl.innerHTML = null
            res.products.forEach(item => {
                const searchItem = document.createElement("div")
                searchItem.className = "search__item"
                searchItem.dataset.id = item.id
                searchItem.innerHTML = `
                    <img src=${item.thumbnail}>
                    <p>${item.title}</p>
                `
                searchDropEl.appendChild(searchItem)
            })
        }).catch(e => console.log(e))
    }else{
        searchDropEl.style.display = "none"
    }
})

clearSearchInputBtn.addEventListener("click", ()=> {
    if(searchDropEl.style.display === "block"){
        searchInputEl.value = ""
        searchDropEl.style.display = "none"
    }
})

searchDropEl.addEventListener("click", (e)=> {
    if(e.target.closest(".search__item")?.className === "search__item"){
        open(`/pages/details.html?id=${e.target.closest(".search__item").dataset.id}`)
    }
})