let productsArrayList = [];
let cartArrayList = []; //itemCode, qty,total
let orderArrayList = [];

function loadProducts() {
    return fetch("../json/products.json")
        .then(res => res.json())
        .then(dataList => {
            productsArrayList = dataList;
        })

}

loadProducts().then(() => {
    const burgerDiv = document.getElementById("burger-div");
    const submarineDiv = document.getElementById("submarine-div");
    const pastaDiv = document.getElementById("pasta-div");
    const friesDiv = document.getElementById("fries-div");
    const chickenDiv = document.getElementById("chicken-div");
    const breaverageDiv = document.getElementById("breaverage-div");

    burgerDiv.innerHTML = getProductBody("Burgers");
    submarineDiv.innerHTML = getProductBody("Submarines");
    pastaDiv.innerHTML = getProductBody("Pasta");
    friesDiv.innerHTML = getProductBody("Fries");
    chickenDiv.innerHTML = getProductBody("Chicken");
    breaverageDiv.innerHTML = getProductBody("Breverages");

    console.log(productList);
});

function getProductBody(category) {
    let body = `<h1 class="text-center rubik-one">${category}</h1><div class="d-flex flex-wrap justify-content-center">`;
    let productList = productsArrayList.filter(products => products.category === category)
    productList.forEach(product => {
        body += `<div  class="product-card p-3 m-3" style="width: 18rem;">
                        <div class="row">
                            <div class="col-7"><img src="${product.imageUrl}" style="width: 10rem;" alt=""></div>
                            <div class="col-5">
                                <h5 class="rubik-one">${product.itemCode}</h5>
                            </div>
                        </div>
                        <h5 class="rubik-one">${product.itemName}</h5>
                        <h2 class="rubik-one text-danger">LKR <span>${product.price}</span></h2>
                        <h5 class="rubik-one"><span>${product.discount} Discount</span></h5>
                        <button class="btn btn-danger" onclick="addToCart('${product.itemCode}',${product.price})" id="btn-${product.itemCode}">Add to Cart</button>

                    </div>`;
    })
    body += `</div>`

    return body;
}

function addToCart(itemCode, price) {
    let product = {
        itemCode: itemCode,
        price: price
    }
    cartArrayList.push(product);
    loadCartTabele();
    loadCartTable();
}


// set Order Count
function setOrderCount(){
    document.getElementById("order-count").innerText = cartArrayList.length;
}

function loadCartTable(){
    let groupedCartArrayList = [];
    cartArrayList.forEach((element , index) =>{
        let product = {
            itemCode : element.itemCode,
            qty : 1
        }
        if (groupedCartArrayList.length === 0) {
            groupedCartArrayList.push(product);
        }else if(groupedCartArrayList.find(p => p.itemCode === element.itemCode) === undefined){
            groupedCartArrayList.push(product);
        }


    })

    console.log(groupedCartArrayList);
}
loadCartTable();
function loadCartTabele() {
    const grouped = cartArrayList.reduce((acc, item) => {
        const key = item.itemCode;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(item);
        return acc;
    }, {});

    //console.log(grouped); // For debugging
    


    let cart_body = document.getElementById("cart-body");
    let body = "";

    // Loop through each group (itemCode)
    let ar = Object.values(grouped);
    //console.log(ar);
    Object.values(grouped).forEach((groupItems) => {
        const item = groupItems[0]; // Use the first item in the group for display
        const quantity = groupItems.length;

        // You can calculate total price or discounted price here
        const price = item.price;
        const discount = item.discount || 0; // if discount is undefined
        const total = (price * quantity * (1 - discount / 100)).toFixed(2);

        body += `<tr>
            <td class="align-middle">
                <!--<div class="row">
                    <div class="col-12">
                        <img src="../img/burger.png" alt="" style="width: 5rem;">
                    </div>
                    <div class="col-12">
                        <p class="fs-5">${item.itemName}</p>
                        <p class="text-secondary">item code : <span>${item.itemCode}</span></p>
                    </div>
                </div>-->
                ${item.itemName}
            </td>
            <td class="align-middle">${price}</td>
            <td class="align-middle"><span class="pe-3 ps-3 bg-secondary rounded">${quantity}</span></td>
            <td class="text-center align-middle">${discount}%</td>
            <td class="align-middle">
                <div class="row">
                    <div class="col">${total}</div>
                    <div class="col">
                        <button class="btn btn-danger pt-0 pb-0 rounded">-</button>
                    </div>
                </div>
            </td>
        </tr>`;
    });

    cart_body.innerHTML = body;
    setOrderCount();
}

loadCartTabele();
