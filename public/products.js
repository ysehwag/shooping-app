$(function refresh(){
    console.log("On loaded")
    let pname=$('#pname')
    let vname=$('#vname')
    let price=$('#price')
    let Qty=$('#Qty')
    console.log(pname.val())
    $('#addproduct').click(function(){
        console.log("button add click")
        addProduct(pname.val(),vname.val(),price.val(),Qty.val(),function(item){
            alert("product added")
            formTable()
        })
    })
    getVendors()
    formTable()
})


 
function getVendors(){
    let vendorList = $('#vname')

        fetchVendors(function(vendors) {
            console.log(vendors)
            for(vendor of vendors) {
            var opt = document.createElement('option');
            opt.value = vendor.id;
            opt.innerHTML = vendor.name;
            vendorList.append(opt);
        }
    })
} 
 
function fetchVendors(done){
    $.get('/vendors',function(data){
        done(data)
    })
}


function formTable(){
    console.log("in dorm table")
    let productList=$('#product-List')
    fetchProduct(function(products){
        productList.empty()
        
        for(product of products){
            console.log("retuned item"+product.id)
            // productList.append(
            // `<li>
            //     ${product.id} ${product.pname}  ${product.price}  ${product.qty} 
            //     <button type="button" id="${product.id}" onclick="deleteProduct(${product.id})" class="btn btn-primary">Delete</button >
            // </li>` 
            // )
            productList.append(
                `   <tr>
                        <th scope="row">${product.id}</th>
                        <td>${product.pname}</td>
                        <td>${product.price}</td>
                        <td>${product.qty}</td>
                        <td><button type="button" id="${product.id}" onclick="deleteProduct(${product.id})" class="btn btn-primary">Delete</button ></td>

                    </tr>` 
                )
        }
    })
}

function fetchProduct(done){
    $.get('/products',function(data){
        done(data)
    })

}


function deleteProduct(id){
    $.ajax({
        url: '/products',
        type: 'DELETE',
        data: {
            id:id
        },
        success: function(result){
            formTable()
        }
    })
}


function addProduct(pname,vendorId,price,qty,done){

    console.log("add product "+"**"+ pname+"**"+vendorId)
    $.post('/products',{
        pname:pname,
        vendorId:vendorId,
        price:price,
        qty:qty
    },function(data){
        done(data) 
    })
}