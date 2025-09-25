let totalcount = document.getElementById("cart-total");
let actual = 0;
const coupons = ["FAB20", "FAB30", "FAB40", "FAB50"];
const couponmessage = document.getElementById('coupon-message');
let coupon = document.querySelector("#coupon");
let cart = [];
const details = document.querySelector("#Details");
const checkoutbtn = document.getElementById("checkout-btn");
let form = document.getElementById('deliveryform');

(function authenticateUser() { // check if there a authenticated token or not
  if (!localStorage.getItem('token')) {
    window.location.href = '/EcoKart';
  }
  // if no auithentication token simply redirect to home page
})();

(function isloggedin() {
  if (localStorage.getItem("token")) {
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
          couponmessage.textContent = '20% off';
          couponmessage.classList.remove("text-red-700");
          couponmessage.classList.add("text-green-700");
          break;
        case "FAB30":
          totalcount.textContent = (actual * 0.7).toFixed(2);
          couponmessage.textContent = '30% off';
          couponmessage.classList.remove("text-red-700");
          couponmessage.classList.add("text-green-700");
          break;
        case "FAB40":
          totalcount.textContent = (actual * 0.6).toFixed(2);
          couponmessage.textContent = '40% off';
          couponmessage.classList.remove("text-red-700");
          couponmessage.classList.add("text-green-700");
          break;
        case "FAB50":
          totalcount.textContent = (actual * 0.5).toFixed(2);
          couponmessage.textContent = '50% off';
          couponmessage.classList.remove("text-red-700");
          couponmessage.classList.add("text-green-700");
          break;
      }
    } else {
      totalcount.textContent = actual;
      if (enteredCode != "") {
        couponmessage.textContent = 'Invalid Coupon';
        couponmessage.classList.remove("text-green-700");
        couponmessage.classList.add("text-red-700");

      } else {
        couponmessage.textContent = '';
      }
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
    details.classList.remove("block");
    details.classList.add("hidden");
    coupon.value = "";
    couponmessage.textContent = '';
  } else {
    cart.forEach((item, index) => {
      const subtotal = item.qty * item.price;
      total += subtotal;
      const tr = document.createElement("tr");

tr.innerHTML = `
  <td class="px-2 sm:px-3 py-2 text-xs sm:text-sm break-words">${item.name}</td>
  <td class="px-2 sm:px-3 py-2 text-xs sm:text-sm">${item.qty}</td>
  <td class="px-2 sm:px-3 py-2 text-xs sm:text-sm">₹${item.price.toFixed(2)}</td>
  <td class="px-2 sm:px-3 py-2 text-xs sm:text-sm">₹${subtotal.toFixed(2)}</td>
  <td class="px-2 sm:px-3 py-2">
    <button onclick="removeItem(${index})"
      class="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded">
      Remove
    </button>
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
  couponmessage.textContent = '';
  details.classList.remove("block");
  details.classList.add("hidden");
  checkoutbtn.textContent = 'Checkout';

  bringCartData();
  renderCart();
}

function payout(){
    localStorage.setItem("cart", JSON.stringify([]));
    alert("Thank you for your purchase!\nYour order has been placed successfully.\n Total : ₹" + totalcount.textContent);
    bringCartData();
    checkoutbtn.removeEventListener('click',payout);
    checkoutbtn.addEventListener('click',checkout);
    details.classList.remove("block");
    details.classList.add("hidden");
    coupon.value = "";
    couponmessage.textContent = '';
};

function checkout() {
  details.classList.remove("hidden");
  details.classList.add("block"); // work pending...
  checkoutbtn.textContent = 'Place Order';
  checkoutbtn.removeEventListener("click", checkout);
  checkoutbtn.addEventListener("click", payout);
}

// Initial render
renderCart();