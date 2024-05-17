async function listProducts(){
    
    const connection = await fetch("http://localhost:3000/products")
    const convertConnection = connection.json();

    return convertConnection;
}

async function sendProduct(name, price, image){
    const connection = await fetch("http://localhost:3000/products",{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            price: price,
            image: image
        })
    });

    const convertConnection = await connection.json();

    if(!connection.ok){
        throw new Error("Ha ocurrido un errol al enviar el producto");
    }
    
    return convertConnection;
}

async function deleteProduct(id){
    const connection = await fetch(`http://localhost:3000/products/${id}`,{
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },

    })
    const convertConnection = await connection.json();

    return convertConnection;
}


export const connectionAPI = {
    listProducts, sendProduct, deleteProduct
}



