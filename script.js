const sideBar = document.querySelector(".bi-list");
const crossSidebar = document.querySelector(".bi-x-square-fill");
const sideNav = document.querySelector(".side-navigation_menu");

sideBar.addEventListener("click", () => {
  sideNav.style.display = "flex";
  sideNav.style.right = "0%";
});
crossSidebar.addEventListener("click", () => {
  sideNav.style.display = "none";
  sideBar.style.display = "block";
});

// cart
let cartIcon = document.querySelector(".item-cart");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let cartTab = document.querySelector(".cartTab");

cartIcon.addEventListener("click", () => {
  cartTab.style.inset = "0 0 0 auto";
  cartTab.transition = " 1s ";
});
closeCart.addEventListener("click", () => {
  cartTab.style.inset = "0 -400px 0 auto";
  cartTab.transition = " 1s";
});

// itemlist
let bakeryItemContainer = document.querySelector(".bakeryItemContainer");
let listProductHTML = document.querySelector(".bakeryItemList");
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".counter");

let listProduct = [];
let carts = [];
let quantity = 0;

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";

  if (listProduct.length > 0) {
    listProduct.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("bakeryItem");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
      <img src="${product.img}" alt="" style="  width= "200px";
      height= "250px"; "/>
      <h2 style="   font-size: large;
      font-weight: 500;">${product.name}</h2>
      <div class="price">&#8377;${product.price}</div>
      <button class="addCart" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          border="none"
          
          class="bi bi-plus-square-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"
         class="addcart" />
        </svg>
      </button>
      `;
      listProductHTML.appendChild(newProduct);
    });
  }
};

listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;

  if (positionClick.closest(".addCart")) {
    let product_id = null;

    let currentElement = positionClick;
    while (currentElement) {
      if (currentElement.hasAttribute("data-id")) {
        product_id = currentElement.getAttribute("data-id");
        break;
      }
      currentElement = currentElement.parentElement;
    }

    if (product_id !== null) {
      // alert(product_id);
    } else {
      console.error('No "data-id" attribute found in the hierarchy.');
    }

    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let quantity = 0;
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity += 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;
      let positionProduct = listProduct.findIndex(
        (value) => value.id == cart.product_id
      );
      let info = listProduct[positionProduct];
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;
      newCart.innerHTML = `
     <div class="image"><img src="${info.img}" alt="" /></div>
     <div class="name"><h3>${info.name}</h3></div>
     <div class="totalPrice">&#8377; ${info.price * cart.quantity}</div>
     <div class="quantity">
       <span class="minus"> < </span>
       <span>${cart.quantity}</span>
       <span class="plus"> > </span>
     </div>
     `;
      listCartHTML.appendChild(newCart);
    });
  }
  iconCartSpan.innerText = totalQuantity;
  totalQuantity = iconCartSpan.innerHTML;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.closest(".minus") || positionClick.closest(".plus")) {
    if (positionClick.hasAttribute("data-id")) {
      product_id = positionClick.getAttribute("data-id");
    } else {
      let currentElement = positionClick.closest("[data-id]");
      if (currentElement) {
        product_id = currentElement.getAttribute("data-id");
      } else {
        console.error('No "data-id" attribute found in the hierarchy.');
      }
    }
    let type = "minus";
    if (positionClick.closest(".plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  }
});
const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemInCart].quantity += 1;
        break;

      default:
        let valueChange = carts[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};
const init = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data;
      addDataToHTML();

      //get cart from memory
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
init();
