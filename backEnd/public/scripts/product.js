function addToCart(event) {
  event.preventDefault();
  document.getElementById("cart-message").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("cart-message").classList.add("hidden");
  }, 2000);
  let btn = document.getElementById("cartBtn");
  btn.textContent = "Go to Cart";
  btn.addEventListener("click", () => {
    window.location.href = "/EcoKart/Cart";
  });
}
