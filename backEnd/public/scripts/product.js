function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth" // makes the scroll smooth
  });
}

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

function addToCart(event) {
  let cart = localStorage.getItem("cart");
  if(cart) {
  cart = JSON.parse(cart);
  console.log(cart);
  cart.push({...itemdata,qty:document.getElementById('quantity').value});
  console.log(cart)
  localStorage.setItem('cart',JSON.stringify(cart));

  document.getElementById("cart-message").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("cart-message").classList.add("hidden");
  }, 2000);
} else {
  localStorage.setItem('cart',JSON.stringify([{...itemdata,qty:document.getElementById('quantity').value}]))
}
}
// alert(localStorage.getItem("id")); // checking of id
let itemdata;
// getting the container
const productContainer = document.getElementById("productContainer");

const getProduct = async ()=> {
try {
    const response = await fetch(`https://ecokart.onrender.com/EcoKart/productdata/${localStorage.getItem("id")}`);
    if(!response.ok){
      window.location.href = "/EcoKart"
    } else {
      let data  = await response.json();
      data = itemdata = data.message[0];
            const flexDiv = document.createElement('div');
      flexDiv.className = 'flex flex-col md:flex-row gap-10';

      // Image Container
      const imgDiv = document.createElement('div');
      imgDiv.className = 'min-w-50 md:min-w-150 lg:min-w-150 md:w-1/3';

      const img = document.createElement('img');
      img.src = data.imageurl;
      img.alt = 'Product Image';
      img.className = 'w-full rounded';

      imgDiv.appendChild(img);

      // Product Info Container
      const infoDiv = document.createElement('div');
      infoDiv.className = 'md:w-2/3 flex flex-col';

      // Title
      const title = document.createElement('div');
      title.className = 'text-2xl font-bold mb-2';
      title.id = 'product-title';
      title.textContent = data.name;

      // Price
      const price = document.createElement('div');
      price.className = 'text-green-600 text-xl font-semibold mb-4';
      price.id = 'product-price';
      price.innerHTML = `<span>₹</span><span id="price">${data.price}</span>`;

      // Description
      const desc = document.createElement('div');
      desc.className = 'mb-6 text-gray-600';
      desc.id = 'product-desc';
      desc.textContent = data.description;

      // Form
      const form = document.createElement('form');
      form.className = 'flex items-center gap-3 mb-4 overflow-hidden';
      form.onsubmit = function (e) {
        e.preventDefault();
        addToCart(e);
        const message = document.getElementById('cart-message');
        message.classList.remove('hidden');
        setTimeout(() => message.classList.add('hidden'), 2000);
      };

      const label = document.createElement('label');
      label.setAttribute('for', 'quantity');
      label.className = 'font-medium';
      label.textContent = 'Quantity:';

      const input = document.createElement('input');
      input.type = 'number';
      input.id = 'quantity';
      input.name = 'quantity';
      input.min = '1';
      input.value = '1';
      input.required = true;
      input.className = 'w-16 px-2 py-1 border rounded outline-none focus:ring-2 focus:ring-green-400';

      const button = document.createElement('button');
      button.id = 'cartBtn';
      button.type = 'submit';
      button.className = 'bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition cursor-pointer';
      button.textContent = 'Add to Cart';
      if(!localStorage.getItem('token')){
        button.disabled=true;
        button.title='login first';
        button.classList.remove('bg-green-600','hover:bg-green-700');
        button.classList.add('bg-gray-400');
      } 

      form.append(label, input, button);

      // Cart Message
      const messageDiv = document.createElement('div');
      messageDiv.id = 'cart-message';
      messageDiv.className = 'text-green-600 font-semibold hidden';
      messageDiv.textContent = 'Added to cart!';

      // Append all to infoDiv
      infoDiv.append(title, price, desc, form, messageDiv);

      // Append imgDiv and infoDiv to flexDiv
      flexDiv.append(imgDiv, infoDiv);

      // Append to container
      productContainer.appendChild(flexDiv);
    }
  } catch (error) {
    console.log(error.message);
  }
} 
getProduct();
