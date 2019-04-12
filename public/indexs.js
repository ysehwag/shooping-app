function fetchProducts(done){
    $.get('/products', function (data) {
       done(data)
    })
}

function createProductCard(product){
    console.log(sessionStorage.getItem("userName"))
    let obj= 
        `<div class="col-lg-4">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
        <div class="card-header">${product.name}</div>
        <img style="height: 200px; width: 100%; display: block;" src="images/im1.jfif" alt="Card image">
        <div class="card-body">
          <h4 class="card-title"></h4>
          <p class="card-text"><b>Price:- </b>${product.price} `
          if(sessionStorage.getItem("userName")!=null)   
            obj+=`<form><button type="button" onClick="addToCart(${product.id})" class="btn btn-primary">Buy</button></form>`

            obj +=`</p>
                    </div>
            </div></div>`

        return obj
}

function getProductsList(){
    let productList = $('#product-list')
    fetchProducts(function(products) {
        productList.empty()
        for(product of products) {
            productList.append(createProductCard(product))
        }
    })
}

function getCartItems(){

    fetchCart(function(cart){
        let loggedData = $('#loginData')
        loggedData.empty()
        loggedData.append(` <a href="carts.html" class="alert-link" ><i  class="fas fa-shopping-cart"><span class="ml-1 badge badge-primary badge-pill">${cart.count}</span></i></a>
        <button class="btn btn-secondary my-2 my-sm-0" onClick="logout()" type="submit">Logout</button>`)
    })
}

function logout(){
    console.log("in logout")
    sessionStorage.clear()
    location.reload()
}

function fetchCart(done){
    console.log(sessionStorage.getItem("userId"))
    $.post('/carts/getCartTotal',{
            userId: sessionStorage.getItem("userId")},
            function (data) {
                done(data)
    })
}

$(function getProducts() {
   
        getCartItems()

    
    getProductsList()
})

function loginUser(name,done){
    $.post('/users',{
        name: name,
    }, function (data) {
        done(data)
    })
}

function addToCart(id){
    $.post('/carts',{
        productId: id,
        userId: sessionStorage.getItem("userId")
    }, function (data){
        alert(data)
        location.reload()
    })
}

