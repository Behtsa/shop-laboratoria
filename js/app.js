$(document).ready(function(){

    // $('.carousel').carousel();


  });

  /*test*/
  let newArray = localStorage.getItem('productDetailRemoved');
  productDetailRemoved = JSON.parse(newArray);
  console.log(productDetailRemoved);

  const apiLoadFirst = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MLM/search?q=articulos de coleccion`, )
        .then(function(response) {
            response.json().then(function(result) {
               // console.log(result.results);
                paintItems(result.results)

        });
    })
        .catch(function(err) {
            console.log(err);
        });
};

apiLoadFirst()

const form = document.getElementById('search-form');
const searchField = document.getElementById('search-key-word');
const responseContainer = document.getElementsByClassName('response-container');
const carCounter = document.getElementById('items-counter');
let counter = 0;

let barContainer = document.getElementById('product-container');
//Cart LocalStorage from Checkout
let cartItemCounterIndex = localStorage.getItem('counterInIndex');
counterInIndex = parseInt(cartItemCounterIndex);
carCounter.innerText = parseInt(counterInIndex);

/*TOTAL PRICE IN SIDE BAR*/
let totalPriceTitle = document.getElementById('total-price-nav');
let priceBDown = document.getElementById('price-breakdown');

// const showInitialCounter => {
//   if(counterInIndex === NaN) {
//     carCounter.innerText = '0';
//   }
//   else {
//     carCounter.innerText = counterInIndex;
//   }
// }

// showInitialCounter();

// function button fixed shop

function openNav() {
    document.getElementById("mySidenav").style.width = "372px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}

// end function button fixed shop

const apiMercadolibre = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/users/306970587/`)
        .then(function(response) {
            response.json().then(function(result) {
//console.log(result);
        });
    })
        .catch(function(err) {
            console.log(err);
        });
};

apiMercadolibre();

form.addEventListener('submit', function(e){
    e.preventDefault();
    responseContainer.innerHTML="";
    searchedForText=searchField.value;
   apiLoad();
})
const apiLoad = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MLM/search?q=${searchedForText}`, )
        .then(function(response) {
            response.json().then(function(result) {
               // console.log(result.results);
                paintItems(result.results)

        });
    })
        .catch(function(err) {
            console.log(err);
        });
};

let shippingCost = 3.76;
let totalPrice = 0;

const showPrice = priceArray => {
  let artNum = priceArray.length;
  priceArray.forEach(function(price){
    totalPrice += parseInt(price);
  })

  let price = ` `;
  price = `
  <p>${artNum} Articulos</p>
  <h3>TOTAL: ${totalPrice} MXN</h3>
  <button class=' style-pay-btn'><a class='a-padding' href='views/ourcheckout.html'>IR AL CARRITO</a></button>`
  totalPriceTitle.innerHTML = price;

  let priceBreakdown = ` `;
  priceBreakdown = `
  <p class="text-right"><strong>Subtotal:      </strong><span>${totalPrice} MXN</span></p>
  <p class="text-right"><strong>Costo de Envío:      </strong><span>${shippingCost} MXN</span></p>
  <h4 class="text-right"><strong>TOTAL: ${totalPrice + shippingCost}MXN</strong></h4>
  `
  priceBDown.innerHTML = priceBreakdown;
}

let priceArray = [];
const showInSideBar = itemsArray => {
  let carTemplate = ` `;
  itemsArray.forEach(product => {
    priceArray.push(product.productPrice);
    carTemplate += `
    <div>
      <p>${product.productName}</p>
      <p>${product.productPrice}</p>
      <button>X</button>
    </div>
    `
    barContainer.innerHTML = carTemplate;
    })
  showPrice(priceArray);
}


let itemsArray = [];
const addToCar = (id, title, price) => {
    let product = {
        productId: id,
        productName: title,
        productPrice: price
    }
    let productDetails = product;
    console.log(productDetails);
    itemsArray.push(productDetails);
    priceArray = [];
    showInSideBar(itemsArray);
    localStorage.setItem('productDetails', JSON.stringify(itemsArray));
}




const showCounter = counter => {
  localStorage.setItem('cartCounter', counter.toString());
}

const increaseCounter = (id, title, price) => {
  counter += 1;
  carCounter.innerText = counter;
  // console.log(counter);
  console.log(title, price);
  addToCar(id, title, price);
  showCounter(counter);
}

const decreaseCounter = () => {
  counter -= 1;
  carCounter.innerText = counter;
  console.log(counter);
  showCounter(counter);
}

const changeButtonStatus = event => {
    
    let element = event.target
    let buttonText = element.firstChild.data;
    let itemId = element.dataset.id;
    let itemTitle = element.dataset.title;
    let itemPrice = element.dataset.price;

    if(buttonText === "Agregar a carrito") {
        element.innerText = "Remover del carrito";
        increaseCounter(itemId, itemTitle, itemPrice);
        element.classList.add('item_added')
    } else {
        element.innerText = "Agregar a carrito";
        decreaseCounter();
    }

}


const showModal=(event)=>{
    const eventTarget=event.target;
    console.log(eventTarget);
    const modal=document.getElementById("modal-product");
    modal.classList.add("display-true");
    const id=eventTarget.dataset.id;
    const imagen=eventTarget.dataset.image;
    const price=eventTarget.dataset.price;
    const title=eventTarget.dataset.title;
    console.log(price);
    //console.log(price)
    fillmodal(id, imagen, price, title );
}

const fillmodal=(id, imagen, price, title)=>{
    const imgCont=document.getElementById("image")
    imgCont.setAttribute("src",imagen);
    imgCont.classList.add("size-modal-image");
    const titleModal=document.getElementById("nombre-producto")
     titleModal.innerText=title;
     const priceModal=document.getElementById("prices")
     priceModal.innerHTML=price+ ' '+ "MXN";
    const containerModal=document.getElementById("modal-product");
  
}



const paintItems = (result) => {
    let containerProducts = document.getElementById('site-container');
    let templateProducts = ``;
   
     result.forEach((item) => {
        const id = item.id;
        const addres=item.address.state_name;
       const title=item.title;
        const image=item.thumbnail;
        templateProducts += `<div class="col-md-3 product-left "> 
        <div class="p-one simpleCart_shelfItem color-card">							
                    <img src="${image}" alt="" />
                    <div class="mask">
                      <button class="item_add" type="button" onClick=showModal(event) data-image=${image} data-title='${item.title}' data-price=${item.price} data-id=${id}>Quick View</button>
                    </div>
            <h4 class="short-text">${item.title}</h4>
            <p><a href="#"><i></i> <span class="item_price">${item.price} MXN</span></a></p>
            <button class="item_add single-but" data-id="${id}" data-title="${title}" data-price="${item.price}" onclick="changeButtonStatus(event)" type="" name="action">Agregar a carrito</button>

        </div>
    </div>
        `
    //     `<div class="col s12 m3">
    //     <div class="card">
    //         <div class="card-image">
    //             <img src="${image}">
    //         </div>
    //         <div class="card-content">
    //             <p class="card-title short-text">${item.title}</p>
    //             <p class="">${item.price} MXN</p>
    //         </div>
    //         <div class="card-action">
    //             <button data-id="${id}" data-title="${item.title}" data-price="${item.price}" onclick="changeButtonStatus(event)" class="btn waves-effect" type="" name="action">Agregar a carrito</button>
    //         </div>
    //     </div>
    // </div>`
    
//console.log(available);
         
     });

     containerProducts.innerHTML = templateProducts;
    
}


const categoriesCall = (category) => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MLM/search?category=${category}`)
        .then(function(response) {
            response.json().then(function(result) {
                paintItems(result.results)
                // console.log("hola");
        });
    })
        .catch(function(err) {
            console.log(err);
        });
};

const codeAccion="MLM3422";
const action=document.getElementById("actionFigures").addEventListener("click", function(e){
   
  categoriesCall(codeAccion);
})

const codeHotWheels="MLM3398";
const hot=document.getElementById("tazos").addEventListener("click", function(e){
    
   categoriesCall(codeHotWheels);
 })

const codeStarWars="MLM2661";
const star=document.getElementById("starWars").addEventListener("click", function(e){
    
   categoriesCall(codeStarWars);
 })

const codeMusic="MLM7809"
const musica=document.getElementById("musica").addEventListener("click", function(e){
    
   categoriesCall(codeMusic);
 })

 const codeMovies="MLM7841"
 const movies=document.getElementById("movies").addEventListener("click", function(e){
     
    categoriesCall(codeMovies);
  })

  const codeSeries="MLM6217"
  const series=document.getElementById("series").addEventListener("click", function(e){
      
     categoriesCall(codeSeries);
   })

   const codeBooks="MLM1196"
   const books=document.getElementById("books").addEventListener("click", function(e){
       
      categoriesCall(codeBooks);
    })

    const codeComics="MLM3043"
    const comics=document.getElementById("comics").addEventListener("click", function(e){
        
       categoriesCall(codeComics);
     })
     
     const codeMag="MLM8227"
     const magazines=document.getElementById("mag").addEventListener("click", function(e){
         
        categoriesCall(codeMag);
      })




//https://api.mercadolibre.com/sites/MLM/search?category=MLM7841   peliculas
//https://api.mercadolibre.com/sites/MLM/search?category=MLM6217 series
// https://api.mercadolibre.com/sites/MLM/search?category=MLM7809 musica