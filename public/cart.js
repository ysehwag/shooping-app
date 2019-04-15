function deleteProduct(productId){
    const choice = confirm("Do You Really Want to delete it?")
    if(choice == true){
      $.ajax({
        url:'/carts',
        type: 'DELETE',
        data :{
          id : productId
        },
        success : function(){
          refreshProductList()
        }
      })
    }
}
function refreshProductList(){
    console.log("in login")
    $.get("/users/"+$("#userName").val(),(user)=>{
            $.post("/carts/getItems/",
            {id : user.id},
            (data)=>{
                $('#productList').empty()
                let i = 1
                console.log(data)
                for (let product of data) {
                    $('#productList').append(
                    `<tr>
                        <th>${i++}</th>
                        <td> ${product.product.pname}</td>
                        <td> ${product.qty}</td>
                        <td> ${product.product.price}</td>
                        <td> 
                        <button id="${product.id}" onclick="deleteProduct(${product.id})" type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>`
                    )
                }
            })
        }
    )
}

$(()=>{
    $("#login").click(()=>{
    refreshProductList()
    })
})