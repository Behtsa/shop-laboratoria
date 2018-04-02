/*Local Storage Products Object Array*/
let product = localStorage.getItem('productDetails');
productDetails= JSON.parse(product);
console.log(productDetails)
// local Storage Counter
let cartItemCounter = localStorage.getItem('cartCounter');
cartCounter = parseInt(cartItemCounter);

let itemContainer = document.getElementById('items');
let resume = document.getElementById('shopping-resume');
let cartItemContainer = document.getElementById('car-counter');
cartItemContainer.innerText = cartCounter;

console.log(cartItemContainer);
/*localStorage back in Index*/
localStorage.setItem('counterInIndex', cartCounter.toString());
/**/


const removeCard = (event) => {
    let idToRemove = event.target.parentNode.parentNode.parentNode.id;
    let indexToRemove = '';
    productDetails.forEach(function(element, index){
        if(element.productId === idToRemove){
            indexToRemove = index;
        }
    })
    productDetails.splice(indexToRemove, 1);
    console.log(productDetails);
    localStorage.setItem('productDetailRemoved', JSON.stringify(productDetails));
    let cardToRemove = event.target.offsetParent.offsetParent.offsetParent;
    cardToRemove.innerHTML = " ";
}

let totalPrice = 0;
let shippingCost = 3.76;
const showResume = total => {
    totalPrice = total;
    let resumeCard = ` `;
    resumeCard = `<thead class="color-table-checkout col-md-12">
                    <tr>
                        <th >
                            <h3>Resumen Pago</h3>
                        </th>
                    </tr>
                </thead>
            
                <tbody class="col-md-12">
                    <tr class="row">
                        <td class="col-md-6">SUBTOTAL:</td>
                        <td class="col-md-6">$${totalPrice}</td>
                    </tr>
                    <tr class="row">
                        <td class="col-md-6">Costo de envío:</td>
                        <td class="col-md-6">$${shippingCost}</td>
                    </tr>
                    <tr class="row">
                        <td class="col-md-6">TOTAL:</td>                        
                        <td class="col-md-6">$${totalPrice + shippingCost}</td>
                    </tr>
                    <tr class="row">
                        <td class="col-md-12"><div id="paypal-button"></div></td>                        
                        
                    </tr>
                </tbody>`
    resume.innerHTML = resumeCard;
}

const calculateTotal = productDetails => {
  let tableTemplate = ` `;
  let totalGap = ` `;
 console.log(productDetails)
  productDetails.forEach(product => {
      totalPrice += parseInt(product.productPrice);
    tableTemplate += `<tr>
                        <td>
                            <div id="${product.productId}" class="panel panel-default row">
                                <div class="col-md-4">
                                    <img src="https://lorempixel.com/200/200/city/6">
                                </div>
                                <div class="col-md-8">
                                    <div class="panel-body">
                                        <h5 class="panel-title">${product.productName}</h5>
                                        <p>Código del Artículo: ${product.productId}</p>
                                        <p>Disponible: In Stock</p>
                                        <p>Precio: ${product.productPrice} MXN</p>
                                    </div>
                                        <div class="panel-footer">
                                            <button class="bnt item_add single-but">Eliminar</button>
                                        </div>
                                </div>
                            </div>
                        </td>
                    </tr>`
    itemContainer.innerHTML = tableTemplate;
    })
    let boton = document.getElementsByClassName('bnt');
    let btnCollection = Array.from(boton);
    btnCollection.forEach(item => {
        item.addEventListener('click', removeCard);
    })

  showResume(totalPrice);
}



calculateTotal(productDetails);

// PAYPAL BUTTON
paypal.Button.render({
    
    env: 'sandbox',
    
    client: {
                sandbox:    'ARFR55shlOKXCT1VE6IHXqv3AZR587gFxu3TmQt17IsBrc02eHLQA8tpC1thuOTyING5EDOdMn5Bvlya',
                production: 'xxxxxxxxx'
            },
    
    commit: true, // Show a 'Pay Now' button
    
    payment: function(data, actions) {
        return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: totalPrice + shippingCost, currency: 'MXN' }
                        }
                    ]
                }
            });
    },
    
    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function(payment) {
    
            alert ("The payment is complete!")
                    // You can now show a confirmation message to the customer
            });
        }
    
    }, '#paypal-button');