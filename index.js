// load api 
const loadData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
}
// dislay product in ui 
const displayProducts = (searchProducts) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    searchProducts.forEach(product => {
        const { category, image, title, price, description, rating } = product;
        console.log(product)
        const div = document.createElement("div");
        div.classList.add("col", "px-3");
        div.innerHTML = `
        <div class="card">
            <img src="${image}" class="card-img-top card-img p-3" alt="...">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title text-capitalize text-primary">${category}</h5>
                <h6>${title}</h6>
                <div class="d-flex justify-content-between  align-items-baseline">
                <h6><b class="text-primary">Price: </b><span class="text-warning">${price} tk</span><h6>
                <button onclick="modalDetail('${image}', '${description}', ${rating.rate},'${title}')" type="button" class="btn btn-primary ms-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Read more
                    </button>
            </div>
        </div>
            </div>
        `; 2
        cardContainer.appendChild(div);
        spinnar(false);
    });
}
// displayData in ui 
const displayData = async () => {
    const data = await loadData();
    displayProducts(data);
}
displayData();

// send searchProduct into displayProducts() 
const process = (data, searchValue) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const searchValueToLower = searchValue.toLowerCase();
    const searchProducts = data.filter(product => product.category.startsWith(searchValueToLower));
    const notFound = document.getElementById("not-found");
    if (searchProducts.length === 0) {
        notFound.classList.remove("d-none");
        spinnar(false);
        return;

    }
    else {
        notFound.classList.add("d-none");
    }
    displayProducts(searchProducts);
}

// event handler search-btn and enter
document.getElementById("search-field").addEventListener("keyup", async (e) => {
    const data = await loadData();
    const searchValue = document.getElementById("search-field").value;

    // console.log(data);
    if (e.code === "Enter") {
        process(data, searchValue);
    }
    else {
        document.getElementById("search-btn").addEventListener("click", () => {
            process(data, searchValue);
        })
    }
})

const targetMenuList = async () => {
    const data = await loadData();
    const mennuListContainer = document.getElementById("menu-list-container");
    const uniqueArray = [];
    data.forEach(product => {
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);
            const li = document.createElement("li");
            li.classList.add("nav-item");
            li.innerHTML = `
                <a class="nav-link text-white fw-semibold" aria-current="page" href="#" onclick="menuListProducts(this)">${product.category}</a>
                ` ;
            mennuListContainer.appendChild(li);
        }
    })
}
targetMenuList();

const menuListProducts = async event => {
    const data = await loadData();
    const searchValue = event.innerText;
    process(data, searchValue);
    // console.log(searchValue);

}

// moda body 
const modalDetail = (image, description, rating, title) => {
    const modalBody = document.getElementById("modal-body");
    const productTitle = document.getElementById("product-title");
    productTitle.innerHTML = title;
    modalBody.innerHTML = `
    <div class="card h-100">
        <img src="${image}" class="card-img-top h-50" alt="...">
        <div class="card-body">
        <p class="card-text fw-semibold">${description}</p>
        <p class="fw-bold text-primary">Rate: <span class="fw-bold text-warning">${rating}</span></p>
        </div>
  </div>
    `;
}

//spinner
const spinnar = (isLoading) => {
    const laoder = document.getElementById("laoder");
    if (isLoading) {
        laoder.classList.remove("d-none");
    }
    else {
        laoder.classList.add("d-none");
    }
}
spinnar(true);

