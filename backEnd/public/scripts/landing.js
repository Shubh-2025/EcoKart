const container = document.getElementById("itemContainer"); // the data holder
const login = document.getElementById('login')
const profile = document.getElementById('profile');
const card1 = document.getElementById('card1');
const card1h3 = document.getElementById('card1h3');
const card1p = document.getElementById('card1p');
const card2 = document.getElementById('card2');
const card2h3 = document.getElementById('card2h3');
const card2p = document.getElementById('card2p');

(function cards() {
  const c1 = document.getElementById('one');
  const c2 = document.getElementById('two');
  let toggle = true;

  setInterval(() => {
    if (toggle) {
      c1.classList.add('scale-105', 'z-10');
      c2.classList.remove('scale-105', 'z-10');
    } else {
      c1.classList.remove('scale-105', 'z-10');
      c2.classList.add('scale-105', 'z-10');
    }
    toggle = !toggle;
  }, 2000);
})();

// footer scrool..
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth" // makes the scroll smooth
  });
}
// products scroll...
function products() {
  window.scrollTo({
    top: 620,
    left: 0,
    behavior: "smooth" // makes the scroll smooth
  });
}

(function isloggedin(){
  if(localStorage.getItem("token")){
    login.classList.add("hidden");
    login.classList.remove("inline-block");
    profile.classList.add("inline-block");
    profile.classList.remove("hidden");
  } else {
    profile.classList.add("hidden");
    profile.classList.remove("inline-block");
    login.classList.add("inline-block");    
    login.classList.remove("hidden");
  }
})()

async function getItems() {
  try {
    let response = await fetch("https://ecokart-app.onrender.com/EcoKart/data");
    if (!response.ok) {
      container.innerHTML = "<h1> No Items Found...</h1>";
    } else {
      data = await response.json();
      let itemarray = data.message;
      // console.log(itemarray);
      // cards are displayed from here..
      let r = Math.floor(Math.random() * itemarray.length);
      card1.src=itemarray[r].imageurl;
      card1h3.textContent=itemarray[r].name;
      card1p.textContent=itemarray[r].description;

      r = Math.floor(Math.random() * itemarray.length);
      card2.src=itemarray[r].imageurl;
      card2h3.textContent=itemarray[r].name;
      card2p.textContent=itemarray[r].description;
      
      for (let i of itemarray) {
        let div1 = document.createElement("div");
div1.id = i.id;

div1.addEventListener("click", (e) => {
  localStorage.setItem("id", JSON.parse(e.currentTarget.id));
  window.location.href = "/EcoKart/product";
});

// Card container with group hover
div1.className = `
  relative w-full max-w-xs sm:max-w-sm md:max-w-md 
  h-72 sm:h-80 md:h-96 
  rounded-xl overflow-hidden 
  cursor-pointer group
  transform transition duration-400 ease-in-out
`;

// Background image as full cover
let bgImg = document.createElement("div");
bgImg.style.backgroundImage = `url(${i.imageurl})`;
bgImg.className = `
  absolute inset-0 bg-cover bg-center 
  group-hover:scale-105 transition-transform duration-500 ease-in-out
`;

// Dark overlay for readability
let overlay = document.createElement("div");
overlay.className = `
  absolute inset-0 bg-black/40 
  group-hover:bg-black/5 
  transition-colors duration-300
`;

// Content wrapper (text on top of image)
let content = document.createElement("div");
content.className = `
  relative z-10 flex flex-col items-center justify-end 
  h-full text-white text-center p-4
`;

// Product name
let h4 = document.createElement("h4");
h4.textContent = i.name;
h4.className = `
  text-md sm:text-xl md:text-2xl 
  font-semibold mb-2 drop-shadow-md
`;

// Price
let h3 = document.createElement("h3");
h3.className = `text-xl font-bold text-green-300 drop-shadow-md`;
let sp1 = document.createElement("span");
sp1.textContent = "₹";
let sp2 = document.createElement("span");
sp2.textContent = i.price;
h3.appendChild(sp1);
h3.appendChild(sp2);

// Optional: View button
let btn = document.createElement("div");
btn.textContent = "View Product";
btn.className = `
  mt-4 inline-block px-4 py-2 
  bg-white/10 border border-white/30 rounded-full 
  text-sm font-medium 
  hover:bg-white/20 transition
`;

// Append content
content.appendChild(h4);
content.appendChild(h3);
content.appendChild(btn);

// Assemble the card
div1.appendChild(bgImg);
div1.appendChild(overlay);
div1.appendChild(content);
container.appendChild(div1);

      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
getItems();