function addCart(product){
    let user= $("#userName").val()
    if(typeof user=="undefined" || user.trim()==""){
       alert("Login first to add a product")
       $("#userName").focus()
    }else{
        console.log(user +" "+product)
        $.get('/users/'+user,
        (user)=>{
            $.post('/carts',{
                userId:user.id,
                productId:product,
                quantity:1
            },
            (data)=>{
                console.log(data)
                alert(data.message)
            })
        })
    }
}

function refreshProductList() {
    $.get('/products', (data) => {
        $('#productList').empty()
        for (let product of data) {
            console.log(product)
            $('#productList').append(
                `<div class="col-sm-2 card m-2 p-4">
                <h4 class="productName">${product.pname}</h4>
                <div class="vendorName">${product.vendor.name}</div>
                <div class="row">
                    <div class="col m-3 p-3">
                        Rs.${product.price}
                    </div>
                    <button id=${product.id} class="col btn btn-primary m-3" onclick="addCart(${product.id})">Add to cart</button>
                </div> 
            </div>`
            )
        }
    })
}

$(() => {
    $("#login").click(() => {
        if($("#userName").val().trim()=="" || typeof $("#userName").val() == 'undefined'){
            alert("Username cant be blank")
        }else{
            $.post('/users',
            {
                userName: $("#userName").val()
            },
            (data) => {
                console.log(data)
                refreshProductList()
            })
        }
    })
})