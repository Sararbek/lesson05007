const BASE_URL = "https://dummyjson.com"
const detailsPage = document.querySelector('.details')

async function fetchSingleProduct() {
    try{
        const params =  new URLSearchParams(window.location.search)
        const response = await fetch(`${BASE_URL}/products/${params.get("id")}`)

        if(!response.ok){
            throw new Error(`Error:  ${response.status}`)
        }
        const data = await response.json()
        createSingleProduct(data)
    }catch(e){
        console.log(e.message)
    }finally{

    }
}

function createSingleProduct(data){
    detailsPage.innerHTML = `
    <div class="details__imgcard">
                        <div class="details__img">
                            <img src=${data.thumbnail}>
                        </div>
                        <div class="details__imgInfo">
                            <p>${data.warrantyInformation}</p>
                            <a href="#">Free shipping</a>
                        </div>
                    </div>
                    <div class="details__info">
                        <div class="details__title">
                            <h2>${data.title}</h2>
                        </div>
                        <div class="details__extradetail">
                            <div class="side__top">
                                <p>${data.price}</p>
                                <div class="icCount">
                                    <p>Quantity</p>
                                    <div class="incrementBox">
                                        <button>-</button>
                                        <p>${data.stock}</p>
                                        <button>+</button>
                                    </div>
                                </div>
                            </div>
                            <div class="side__bottom">
                                <div class="content">
                                    <div class="content__title">
                                    <p>Subscribe and delivery every</p>
                                    <span>4 weeks</span>
                                    </div>
                                    <div class="content__body">
                                        <p>
                                            Subscribe now and get the 10% of discount on every recurring order.  The discount will be applied at checkout. See details
                                        </p>
                                    </div>
                                </div>
                                <button><i class="fa-solid fa-cart-shopping"></i> +Add to cart</button>
                            </div>
                        </div>
                    </div>
    `
}

window.onload = () => {
    fetchSingleProduct()
}