const menuIcon = document.getElementById("menuIcon");
const navMenu  = document.getElementById("navMenu");

// Toggle the .active class on nav when the menu icon is clicked
menuIcon.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
