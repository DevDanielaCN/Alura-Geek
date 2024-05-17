import { connectionAPI } from "./connectionAPI.js";


/* LISTAR PRODUCTOS */
const container = document.querySelector('[data-product-container]');


/* CREAR ESTRUCTURA DE TARJETA PRODUCTO */
export function createCard(name, price, image,id){
    const product = document.createElement('div');

    product.className = "bg-[#F5F5F5] p-2 rounded-lg shadow-md w-[150px] hover:scale-105 max-[400px]:w-full"

    product.innerHTML = `
    <img src="${image}" alt="${name}" class="product__img aspect-square border border-gray-200 object-cover rounded-lg max-[400px]:w-full">
    <div class="relative p-1">
        <p class="capitalize font-bold text-[#585858] mb-3">${name}</p>
        <p class="font-bold text-[#95CADC]">S/ ${price}</p>
        <button class="btn-show-modal absolute bottom-0 right-0 rounded-full bg-[#7700FF] w-[35px] h-[35px] p-2" type="button" data-name="${name}" data-product-id="${id}" >
            <img class="m-auto h-full object-contain" src="./assets/icons/trash.svg" alt="eliminar"></button>
    </div>
    `;
    return product;
}



/* FUNCION LISTAR */
async function listProducts(){
    try{
        const listAPI = await connectionAPI.listProducts();

        listAPI.forEach(product => container.appendChild(createCard(product.name, product.price, product.image, product.id)))

        const btnShowModals = document.querySelectorAll('.btn-show-modal')

        btnShowModals.forEach(btnShowModal => {

            btnShowModal.addEventListener('click', () => {
                //obtener id de la card
                const productId = btnShowModal.getAttribute('data-product-id');
                const nameProduct = btnShowModal.getAttribute('data-name');
                 deleteProductModal(productId, nameProduct); 
            });
        });

    }catch(e){
        container.innerHTML = `<h2 clas="text-red font-bold text-center">Ha ocurrido un problema con la conexión </h2>`;
    }
    
}

/* CREAR NUEVO PRODUCTO */
const form = document.querySelector('[data-form]');

async function createProduct(e){
    e.preventDefault();
    
    const name = document.querySelector('[data-name]').value;
    const price = parseFloat(document.querySelector('[data-price]').value);
    const image = document.querySelector('[data-image]').value;


    try{
        await connectionAPI.sendProduct(name, price, image);
        window.location.reload();
    }catch(e){
        alert(e);
    }
}

form.addEventListener('submit', event => createProduct(event));

/* BOTON LIMPIAR */
const buttonClean = document.querySelector('[data-clean]');

buttonClean.addEventListener('click', clean)

function clean(){
    const inputName = document.querySelector('[data-name]');
    const inputPrice = document.querySelector('[data-price]');
    const inputImage = document.querySelector('[data-image]');
    
    inputName.value = "";
    inputPrice.value = "";
    inputImage.value = "";

    inputName.focus();
}

listProducts();



/* FUNCION ELIMINAR */

function deleteProductModal(productId, nameProduct){

    const deleteModal = document.querySelector('[data-deleteModal]');

    deleteModal.style.display = "flex";

    let showNameProduct = document.querySelector('[data-product-name]');
    showNameProduct.textContent = nameProduct;

    let btnCancel = document.querySelector('.btn-cancel');
    let btnDelete = document.querySelector('.btn-delete');

    btnCancel.addEventListener('click',function(){
        deleteModal.style.display = "none";
    });

    btnDelete.addEventListener('click',async function(){
        
        deleteModal.style.display = "none";
        
        
        try{
            const response = await connectionAPI.deleteProduct(productId);
            if(response.success){
                window.location.reload();
            }else{
                console.error('error al eliminar')
            }
        }catch(error){
            console.error('error')
        }
        deleteModal.style.display = "none";
        

    });
    
}
/* 
console.log(btnShowModals);
btnShowModals.forEach(btnShowModal => {

    btnShowModal.addEventListener('click', () => {
        //obtener id de la card
        const productId = btnShowModal.getAttribute('data-product-id');


        // deleteProductModal(productId); 
    });
});
 */




