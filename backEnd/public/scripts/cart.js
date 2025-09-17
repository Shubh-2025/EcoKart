let totalcount = document.getElementById("cart-total");
let actual = 0;
const coupons = ["FAB20", "FAB30", "FAB40", "FAB50"];
let coupon = document.querySelector("#coupon");
let cart = [];

(function authenticateUser(){ // check if there a authenticated token or not
    if (!localStorage.getItem('token')) {
      window.location.href='/EcoKart';
    } 
    // if no auithentication token simply redirect to home page
})();

(function isloggedin(){
  if(localStorage.getItem("token")){
    login.classList.remove("inline-block");
    login.classList.add("hidden");
    profile.classList.remove("hidden");
    profile.classList.add("inline-block");
  } else {
    profile.classList.remove("inline-block");
    profile.classList.add("hidden");
    login.classList.remove("hidden");
    login.classList.add("inline-block");    
  }
})()

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth" // makes the scroll smooth
  });
}

function applyCoupon() {
  coupon.addEventListener("input", (e) => {
    const enteredCode = e.currentTarget.value.trim().toUpperCase();
    if (coupons.includes(enteredCode)) {
      switch (enteredCode) {
        case "FAB20":
          totalcount.textContent = (actual * 0.8).toFixed(2);
          break;
        case "FAB30":
          totalcount.textContent = (actual * 0.7).toFixed(2);
          break;
        case "FAB40":
          totalcount.textContent = (actual * 0.6).toFixed(2);
          break;
        case "FAB50":
          totalcount.textContent = (actual * 0.5).toFixed(2);
          break;
      }
    } else {
      totalcount.textContent = actual;
    }
  });
}
//incoke the coupon discount function
applyCoupon();

function bringCartData() {
  let cartData = localStorage.getItem("cart");
  if (cartData) {
    // console.log(cartData);
    cart = JSON.parse(cartData);
  }
  // console.log(cart);

  renderCart();
}
// invoking
bringCartData();

function renderCart() {
  const tbody = document.getElementById("cart-items");
  tbody.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" class="text-center py-6 text-gray-500">Your cart is empty.</td></tr>';
    document.getElementById("checkout-btn").disabled = true;
  } else {
    cart.forEach((item, index) => {
      const subtotal = item.qty * item.price;
      total += subtotal;
      const tr = document.createElement("tr");
      tr.innerHTML = `
                        <td class="px-4 py-3">${item.name}</td>
                        <td class="px-4 py-3">${item.qty}</td>
                        <td class="px-4 py-3">₹${item.price.toFixed(2)}</td>
                        <td class="px-4 py-3">₹${subtotal.toFixed(2)}</td>
                        <td class="px-4 py-3">
                            <button onclick="removeItem(${index
        })" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">Remove</button>
                        </td>
                    `;
      tbody.appendChild(tr);
    });
    document.getElementById("checkout-btn").disabled = false;
  }
  totalcount.textContent = actual = total.toFixed(2);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  bringCartData();
  renderCart();

  if (cart.length > 0) {
    coupon.dispatchEvent(new Event("input")); //craziest shit found today.
    // manually dispatch any event when you like....
  } else {
    coupon.value = "";
  }
}


function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
  coupon.value = "";

  bringCartData();
  renderCart();
}

function checkout() {
  localStorage.setItem("cart", JSON.stringify([]));

  alert("Thank you for your purchase!\nYour order has been placed successfully.\n Total : ₹" + totalcount.textContent);
  bringCartData();
}

// Initial render
renderCart();