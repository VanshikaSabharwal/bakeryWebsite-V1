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
