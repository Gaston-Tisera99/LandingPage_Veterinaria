const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click',comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');
function addToCartClicked(event){
    const button = event.target;
    const item = button.closest('.item');

    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    

    addItemToShoppingCart(itemTitle, itemPrice);
}

function addItemToShoppingCart(itemTitle, itemPrice){

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);

    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged)


    updateShoppingCartTotal()
}

function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
    shoppingCartItems.forEach(shoppingCartItem => {
    const shoppingCartItemPriceElement =  shoppingCartItem.querySelector('.shoppingCartItemPrice');
     const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', ''));

    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
    const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity
   
    
    });
    shoppingCartTotal.innerHTML = `${total}$`
}

function removeShoppingCartItem(event){
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

function quantityChanged(event){
    const input = event.target;
    if (input.value <= 0){
        input.value = 1;
    }
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal(); 
}

function comprarButtonClicked(){
    shoppingCartItemsContainer.innerHTML = '';
    alert("SE REGISTRO LA COMPRA DE LOS PRODUCTOS");
    updateShoppingCartTotal();
}

