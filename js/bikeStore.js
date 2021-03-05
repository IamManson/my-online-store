//Show and Hide Bio Feature
$(document).ready(function () {
  // Hide displayed paragraphs
  $(".hideBio").click(function () {
    $("p.bio").hide();
  });

  // Show hidden paragraphs
  $(".showBio").click(function () {
    $("p.bio").show();
  });

  //ACCORDIAN DROPDOWN 
  $(function () {
    let Accordion = function (el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;

      //variable is heading of each menu
      let links = this.el.find('.heading');
      //event is when mouse hovers over menu heading the submenu will dropdown
      links.on('mouseover', {
        el: this.el,
        multiple: this.multiple
      }, this.dropdown)
    }

    //function for dropdown animation
    Accordion.prototype.dropdown = function (e) {
      let $el = e.data.el;
      $this = $(this),
        $next = $this.next();
      //Slide toggle to have parent heading that is hovered over be the only menu that is open
      $next.slideToggle();
      $this.parent().toggleClass('open');

      //When menu heading is hovered over again, menu will close
      if (!e.data.multiple) {
        $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
      };
    }

    let accordion = new Accordion($('#accordion'), false);
  });

  $("#magic-out").click(function () {
    //fade out header image on index page
    $("#headerBike").fadeOut(2000);
    $("#welcome")
      .animate({
        width: "100%"
      })
      .animate({
        fontSize: "55px"
      })
      .animate({
        borderWidth: 30
      });
      //changes intro text color
    $(".introduction").css("color", "blue");
    //moves logo sideways
    $("#logo")
      .animate({
        left: 300
      });
  });

  $("#magic-in").click(function () {
    //fade out header image on index page
    $("#headerBike").fadeIn(2000);
    $("#welcome").removeAttr("style");
    $(".introduction").removeAttr("style");
    $("#logo").removeAttr("style");
  });
  //Stops animation at exact moment
  $("#stop-magic").click(function () {
    $("#headerBike").stop();
  });

});


//Product List

let carts = document.querySelectorAll(".add-cart");

let products = [{
    make: "Titan Racing",
    model: "2021 Cypher RS Ultimate Carbon",
    tag: "M21CypherRSCarbonUltimate",
    price: 45999,
    inCart: 0
  },
  {
    make: "Titan Racing",
    model: "2021 Cypher RS Team Carbon",
    tag: "M21CypherRSCarbonTeam",
    price: 42999,
    inCart: 0
  },
  {
    make: "Titan Racing",
    model: "2021 Cypher Empire Carbon",
    tag: "M21Cypher120CarbonEmpire",
    price: 35999,
    inCart: 0
  },
  {
    make: "Titan Racing",
    model: "2021 Rogue Cruz",
    tag: "M21RogueCruz",
    price: 28999,
    inCart: 0
  },
  {
    make: "Titan Racing",
    model: "2021 Rogue Dash",
    tag: "M21RogueDash",
    price: 25999,
    inCart: 0
  },
  {
    id: 6,
    make: "Titan Racing",
    model: "2021 Rogue Ryde",
    tag: "M21RogueRyde",
    price: 31999,
    inCart: 0
  },
  {
    id: 7,
    make: "Titan Racing",
    model: "2021 Calypso Rogue Nova",
    tag: "M21RogueCalypsoNova",
    price: 25999,
    inCart: 0
  },
  {
    make: "Titan Racing",
    model: "2021 Calypso 26 Disc",
    tag: "M21Calypso26",
    price: 6999,
    inCart: 0
  },
  {
    make: "Titan Racing",
    model: "2021 Calypso 24 V-Brake",
    tag: "M21Calypso24V",
    price: 5999,
    inCart: 0
  },
  {
    make: "Titan Racing",
    model: "2021 Hades 24 V-Brake",
    tag: "M21Hades24V",
    price: 5199,
    inCart: 0
  },
]

//for loop of carts
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
    productsInCart(products[i]);
    //cartTotalAlert(products[i]);
  })
}

function onLoadCartNumbers() {
  //checking localStorage for productNumbers 
  let productNumbers = localStorage.getItem('cartNumbers');

  //if there are products in localStorage then display them in the cart span
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');

  //changing string to numbers
  productNumbers = parseInt(productNumbers);

  //when product is clicked it'll check for existing key values and add 1 to it
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else { //if nothing is in localStorage then it'll add 1
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  //calling setItems(product)
  setItems(product);
}

//function for setItems(product)
function setItems(product) {
  //checking if there is already products in cart
  let cartItems = localStorage.getItem("productsInCart");

  //parseing cartItems from JSON to object
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    //if product.tag is equaled to undefined
    if (cartItems[product.tag] == undefined) {
      //update cartItems
      cartItems = {
        ...cartItems, //grabbing what was in cart before using rest operator
        //adding new product
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    //declaring variable for cartItems
    cartItems = {
      [product.tag]: product
    }
  }

  //setting the products in cart with JSON stringify
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  //getting item from localStorage
  let cartCost = localStorage.getItem('totalCost');

  console.log("My cartCost is", cartCost);
  //check what cartCost is
  console.log(typeof cartCost);

  //if cartCost is not null
  if (cartCost != null) {
    //converting cartCost string to number
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
    //Alerts user of their total cart price
    alert("Your total cart is R" + Number(cartCost + product.price));
  } else { //if cartCost is null add price of product
    localStorage.setItem("totalCost", product.price);
    //Alerts user of their total cart price
    alert("Your total cart is R" + product.price);
  }

}

//function to display cart items on cart page
function displayCart() {
  //getting productsInCart from localStorage and assigning it as variable
  let cartItems = localStorage.getItem("productsInCart");
  //parsing the retrieved cartItems
  cartItems = JSON.parse(cartItems);

  //selecting the product container from HTML
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');
  let totalContainer = document.querySelector(".totalContainer");
  /*let shippingBtn = document.querySelector(".confirm");
  let shipping = document.getElementsByClassName("shipping");
  let shippingCost = 30;

  shippingBtn.addEventListener('click', () => {
    shipping.innerHTML = shippingCost;
  });*/

  console.log(cartItems);
  if (cartItems && productContainer) {
    //if there is nothing in productsInCart then display nothing
    productContainer.innerHTML = '';
    //retrieving values of cartItems and mapping them
    Object.values(cartItems).map(item => {
      //PRODUCT CONTAINER
      productContainer.innerHTML +=
        ` 
        <div class="row" id="product-row">
             <div class="product col-md-5">
               <img src="./images/${item.tag}.jpg">
               <span class="bikeModel">${item.model}</span>
               </div>
               <div class="price col-md-2" id="productPrice" >R${item.price}.00</div>
               <div class="quantity col-md-3" >
               <span class="cartQuantity">${item.inCart}</span>  
               </div>
               <div class="total col-md-2" >R${item.inCart * item.price}.00</div>

             </div>
             `
    });
    //FINAL BASKET CONTAINER
    productContainer.innerHTML += `
    <div class="row" id="basket">
      <div class="basketTotalContainer col-md-12">
        <h4 class="basketTotalTitle col-md-8">
          Basket Total
          </h4>
          <h4 class="basketTotal col-md-4">
            R${cartCost}.00
          </h4>
        </div>
             </div>
        <div class="row" id="basket-vat">
        <div class="basketVatContainer col-md-12">
          <h4 class="basketVatTitle col-md-8">
            Basket Total Incl. VAT
            </h4>
          <h4 class="basketVatTotal col-md-4">
            R${Number(cartCost)+Number(cartCost*0.15)}
            </h4>
            </div>
        </div> 
    `
    //FINAL TOTAL CONTAINER
    totalContainer.innerHTML += `
    <div class="totalContainer">
    <ul class="list-group list-group-flush">
      <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
        Total
        <span>R${cartCost}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center px-0">
        Delivery
        <span class="shipping">R</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center px-0">
        Discount
        <span class="discountAmount">-R</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
        <div>
          <strong>The total amount is</strong>
          <strong>
            <p class="mb-0">(Incl. VAT)</p>
          </strong>
        </div>
        <span class="total-vat"><strong>R</strong></span>
      </li>
    </ul>
  </div>
    `
  }

}
//Calling onLoadCartNumbers function
onLoadCartNumbers();
displayCart();

//Unique Reference Number generator
function refNoGenerator() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//Creating the onclick function that will alert shopper at checkout with their unique reference number
function uniqueRef() {
  alert("Your order has been confirmed. Your reference number is: " + refNoGenerator());
}

//DISCOUNT COUPON
function validate(coupon) {
  let discountContainer = document.querySelector(".discountAmount");
  let vatContainer = document.querySelector(".total-vat");
  let cartCost = localStorage.getItem('totalCost');
  cartCost = parseInt(cartCost);

  codes = new Object();
  codes.TITAN10 = 1000;

  //if TITAN10 is entered
  if (codes[coupon]) {
    //coupon is accepted and alert is displayed
    window.alert("Coupon Code Accepted! Proceed to Checkout.");
    //discounted amount is displayed in discountContainer
    discountContainer.innerHTML += `${1000}`;
    //total Amount incl. Vat changes
    vatContainer.innerHTML += `<strong>${Number(cartCost-1000)+Number((cartCost-1000)*0.15)}</strong>`;
  } else {
    //input != TITAN10 displays an alert that says coupon is invalid
    window.alert("Sorry, The Coupon Code you entered is invalid. Please check and try again!");
    //total Amount incl. Vat stays the same
    vatContainer.innerHTML += `<strong>${Number(cartCost)+Number(0.15*cartCost)}</strong>`;
  }
}

//COLLECTION DELIVERY AMOUNT
function shipping() {
  let shippingContainer = document.querySelector(".shipping");
  let discountContainer = document.querySelector(".discountAmount");
  let vatContainer = document.querySelector(".total-vat");
  let cartCost = localStorage.getItem('totalCost');
  cartCost = parseInt(cartCost);
  //if 1>0 is entered then final delivery amount and total incl VAT is displayed
  if (1>0) {
    //alert to confirm delivery selection
    window.alert("Delivery Details Confirmed");
    //discounted amount is displayed in shipping Container
    shippingContainer.innerHTML += `${40}`;
    vatContainer.innerHTML += `<strong>${Number(cartCost+40)+Number((cartCost+40)*0.15)}</strong>`;
    
  } 
}

//COLLECTION FINAL AMOUNT
function collection() {
  let collection = document.getElementById("#customRadio3");
  let vatContainer = document.querySelector(".total-vat");
  let cartCost = localStorage.getItem('totalCost');
  cartCost = parseInt(cartCost);

  //collection button event listener
  collection.addEventListener('click',function(){
    vatContainer.innerHTML += `<strong>${Number(cartCost)+Number(0.15*cartCost)}</strong>`;
  });
  } 


//CLEAR CART
function clearCart() {
  let total = localStorage.getItem('totalCost');
  let prduct = localStorage.getItem('productsInCart');
  let cartNums = localStorage.getItem('cartNumbers');

  //resets key value pairs in local storage back to default
  total = 0;
  prduct = [];
  cartNums = 0;

  //sets the new default key value pairs
  localStorage.setItem("totalCost", JSON.stringify(total));
  localStorage.setItem("productsInCart", JSON.stringify(prduct));
  localStorage.setItem("cartNumbers", JSON.stringify(cartNums));
  //reloads in window to display empty cart
  window.location.reload()
}