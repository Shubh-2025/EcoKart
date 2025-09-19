const container = document.getElementById("itemContainer"); // the data holder
const login = document.getElementById('login')
const profile = document.getElementById('profile');
const card1 = document.getElementById('card1');
const card1h3 = document.getElementById('card1h3');
const card1p = document.getElementById('card1p');
const card2 = document.getElementById('card2');
const card2h3 = document.getElementById('card2h3');
const card2p = document.getElementById('card2p');

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
      let r = Math.floor(Math.random() * array.length);
      card1.src=itemarray[r].imageurl;
      card1h3.textContent=itemarray[r].name;
      card1p.textContent=itemarray[r].description;
      r = Math.floor(Math.random() * array.length);
      card2.src=itemarray[r].imageurl;
      card2h3.textContent=itemarray[r].name;
      card2p.textContent=itemarray[r].description;
      
      for (let i of itemarray) {
        let div1 = document.createElement("div");
        div1.id = i.id;
        div1.addEventListener("click", (e) => {
          localStorage.setItem("id", JSON.parse(e.currentTarget.id));
          // this way the element which has the eventlistner will be the target..not the children
          window.location.href = "/EcoKart/product";
        });
        div1.className =
          "bg-white rounded-lg shadow-xl overflow-hidden flex flex-col items-center h-80 sm:h-100 md:h-100 cursor-pointer";
        let img = document.createElement("img");
        img.src = i.imageurl;
        img.alt = "item image";
        img.className = "w-full h-70 object-cover mb-2";
        let h4 = document.createElement("h4");
        h4.textContent = i.name;
        h4.className =
          "text-md sm:text-lg md:text-lg font-semibold text-green-700 m-2";
        let h3 = document.createElement("h3");
        h3.className = "text-lg font-bold text-green-500 mb-2";
        let sp1 = document.createElement("span");
        sp1.textContent = "₹";
        let sp2 = document.createElement("span");
        sp2.textContent = i.price; //price
        h3.appendChild(sp1);
        h3.appendChild(sp2);
        // let p = document.createElement("p");
        // p.className = "text-green-800 mb-4 text-center";
        // p.textContent = i.description;
        div1.appendChild(img);
        div1.appendChild(h4);
        div1.appendChild(h3);
        // div1.appendChild(p);

        // for each loop the items are appended here
        container.appendChild(div1);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
getItems();
