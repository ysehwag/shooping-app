$(function refresh(){
    console.log("On loaded")
    let vname=$('#vname')
    $('#addvendor').click(function(){
        console.log("button add click")
        addVendors(vname.val(),function(item){
            alert("vendor added")
            formTable()
        })
    })
    formTable()
})

function formTable(){
    console.log("in dorm table")
    let vendorList=$('#vendor-List')
    fetchProduct(function(vendors){
        vendorList.empty()
        
        for(vendor of vendors){
            // vendorList.append(
            // `<li>
            //     ${vendor.id} ${vendor.name}  
            //     <button type="button" id="${vendor.id}" onclick="deleteVendor(${vendor.id})" class="btn btn-primary">Delete</button >
            // </li>` 
            // )
            vendorList.append(
                `<tr>
                <th scope="row">${vendor.id} </th>
                <td>${vendor.name}</td>
                <td> <button type="button" id="${vendor.id}" onclick="deleteVendor(${vendor.id})" class="btn btn-primary">Delete</button ></td>
                </tr>` 
                )
        }
    })
}

function fetchProduct(done){
    $.get('/vendors',function(data){
        done(data)
    })

}

function deleteVendor(id){
    $.ajax({
        url: '/vendors',
        type: 'DELETE',
        data: {
            id:id
        },
        success: function(result){
            formTable()
        }
    })
}


function addVendors(vname,done){

    console.log("add vendor "+"**"+ vname)
    $.post('/vendors',{
        vname:vname
    }, function(data){

   done(data) 
    })
}
