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

let listProduct = [];

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";

  if (listProduct.length > 0) {
    listProduct.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("bakeryItem");
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
          />
        </svg>
      </button>
      `;
      listProductHTML.appendChild(newProduct);
    });
  }
};

const init = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data;
      addDataToHTML();
    });
};
init();
