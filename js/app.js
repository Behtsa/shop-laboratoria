$(document).ready(function(){
    // $('.carousel').carousel();
  });

  
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

const form=document.getElementById('search-form');
const searchField=document.getElementById('search-key-word');
const responseContainer=document.getElementsByClassName('response-container');
const carCounter = document.getElementById('items-counter');
let counter = 0;
let barContainer = document.getElementById('product-container');
// function button fixed shop

function openNav() {
    document.getElementById("mySidenav").style.width = "370px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("car-icon").style.display = "none";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("car-icon").style.display = "inline-block";
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

// const showNavPrice = totalPrice => {
//   let priceTemplate += ` `;
//   priceTemplate = `
//   <p>${counter} Artículos</p>
//   <h3>Total: ${totalPrice}</h3>
//   <button>IR AL CARRITO</button>
//   ` 
// }

let totalPrice = 0;
const showInSideBar = productsArray => {
  let carTemplate = ` `;

  productsArray.forEach(product => {
    totalPrice += parseInt(product.productPrice);
    
    carTemplate += `
    <div>
      <p>${product.productName}</p>
      <p>${product.productPrice}</p>
      <button>X</button>
    </div>
    `
    barContainer.innerHTML = carTemplate;
    console.log(barContainer);
    })
  // showNavPrice(totalPrice);
}

let productsArray = [];
const addToCar = (id, title, price) => {
    let product = {
        productId: id,
        productName: title,
        productPrice: price
    }

    let productDetails = product;
    console.log(productDetails);
    productsArray.push(productDetails);
    showInSideBar(productsArray);
    localStorage.setItem('productDetails', JSON.stringify(productsArray));
} 

const showCounter = counter => {
  localStorage.setItem('cartCounter', counter.toString());
}

const increaseCounter = (id, title, price) => {
  counter += 1;
  carCounter.innerText = counter;
  console.log(counter);
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
    const titleModal=document.getElementById("nombre-producto")
     titleModal.innerText=title;
     const priceModal=document.getElementById("prices")
     priceModal.innerHTML=price+ '' + "MXN";
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
        templateProducts += `<div class="col-md-3 product-left"> 
        <div class="p-one simpleCart_shelfItem">							
                <img src="${image}" alt="" />
                <div class="mask">
                    <button class="item_add single-but" type="button" onClick=showModal(event) ><span data-image=${image} data-title='${item.title}' data-price=${item.price} data-id=${id}>Quick View</span></button>
                </div>             
            <h4 class="short-text">${item.title}</h4>

            <p><a href="#"><i></i> <span class="item_price">${item.price} MXN</span></a></p>
            <button class="item_add single-but" data-id="${id}" data-title=${title} data-price="${item.price}" onclick="changeButtonStatus(event)" type="" name="action">Agregar a carrito</button>


        </div>
    </div>
        `    
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
