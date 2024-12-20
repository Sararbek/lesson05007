
const productCardsEl = document.querySelector(".products__cards")
const seeMoreBtn = document.querySelector(".addProducts")
const loadingWrapperEl = document.querySelector(".loading")
const popularProductsWrapperEl = document.querySelector(".popular__wrapper")

const BASE_URL = "https://dummyjson.com"
const perPageCount = 8;
let offset = 0

window.addEventListener("load", ()=> {
    createLoadingForProducts(perPageCount)
    fetchPopularProducts(`/products?limit=4`)
    fetchProducts(`/products?limit=${perPageCount}`)
})

async function fetchProducts(endPoint) {
    try{
        const response = await fetch(`${BASE_URL}${endPoint}`)
        if(!response.ok){
            throw new Error (`Error: ${response.status}`)
        }
        
        const data = await response.json()

        createProductCards(data)
    }catch(e){
        console.log(e.message)
    }finally{
        loadingWrapperEl.style.display = "none"
        productCardsEl.style.display = "grid"
    }
}

function createProductCards(data){
    data.products.forEach(product => {
        const productCard = document.createElement("div")
        productCard.className = "products__card";
        productCard.innerHTML = `
         <div class="products__card__img">
                            <img data-id=${product.id} src=${product.thumbnail}>
                        </div>
                        <div class="products__card__info">
                            <p>${product.title}</p>
                            <p>$${product.price}</p>
                        </div>
        `
        productCardsEl.appendChild(productCard)
    })
}

function createLoadingForProducts(n){
    loadingWrapperEl.innerHTML = null
    loadingWrapperEl.style.display = "grid"
    Array(n).fill().forEach(()=> {
        const productsLoading = document.createElement("div")
        productsLoading.className = "products__loading"
        productsLoading.innerHTML = `
            <div class="loading__img">
                        <div class="load__img to-left"></div>
                    </div>
                    <div class="loading__info">
                        <div class="loading__text to-left"></div>
                        <div class="loading__text to-left"></div>
                    </div>
        `
        loadingWrapperEl.appendChild(productsLoading)
    })
}

seeMoreBtn.addEventListener("click", ()=> {
    createLoadingForProducts(perPageCount)
    offset++
    fetchProducts(`/products?skip=${offset * perPageCount}&limit=${perPageCount}`)
})

async function fetchPopularProducts(endpoint) {
    try{
        const response = await fetch(`${BASE_URL}${endpoint}`)
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        createPopularProductCards(data)
    }catch(e){
        console.log(e.message)
    }finally{

    }
}

function createPopularProductCards(data){
    data.products.forEach(product => {
        const popularProductEl = document.createElement("div")
        popularProductEl.className = "products__card"
        popularProductEl.innerHTML = `
        <div class="products__card__img">
                            <img data-id="${product.id}" src=${product.thumbnail}>
                        </div>
                        <div class="products__card__info">
                            <p>${product.title}</p>
                            <p>$${product.price}</p>
                        </div>
        `
        popularProductsWrapperEl.appendChild(popularProductEl)
    })
}

productCardsEl.addEventListener("click", (e)=> {
    if(e.target.tagName === "IMG"){
        open(`/pages/details.html?id=${e.target.dataset.id}`)
    }
})

popularProductsWrapperEl.addEventListener("click", e  => {
    if(e.target.tagName === "IMG"){
        open(`/pages/details.html?id=${e.target.dataset.id}`)
    }
})