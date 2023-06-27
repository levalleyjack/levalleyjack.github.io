window.addEventListener("scroll", function () {
  let header = document.querySelector("nav");
  header.classList.toggle("sticky", window.scrollY > 0);
});
