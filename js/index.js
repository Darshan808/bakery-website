//Responsive navbar functioning
const mobileNavbar = document.querySelector(".mobile-navbar");
const openNavbarButton = document.querySelector(".menu-icon");
const closeNavbarButton = document.querySelector(".close-navbar-icon");

openNavbarButton.addEventListener("click", openNavbar);
closeNavbarButton.addEventListener("click", closeNavbar);

function openNavbar() {
  mobileNavbar.classList.add("show-mobile-navbar");
}
function closeNavbar() {
  mobileNavbar.classList.remove("show-mobile-navbar");
}
