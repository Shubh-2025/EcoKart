const container = document.getElementById("itemContainer"); // the data holder

async function getItems() {
  try {
    let response = await fetch("http://localhost:4000/EcoKart/data");
    if (!response.ok) {
      container.innerHTML = "<h1> No Items Found...</h1>";
    } else {
      data = await response.json();
      // console.log(data);
      let itemarray = data.message;
      console.log(itemarray);
      for (let i of itemarray) {
        let div1 = document.createElement("div");
        div1.className =
          "bg-white rounded-lg shadow-xl overflow-hidden flex flex-col items-center h-70 sm:h-100 md:h-100 cursor-pointer";
        let img = document.createElement("img");
        img.src = i.imageurl;
        img.alt = "item image";
        img.className = "w-full h-70 object-cover mb-4";
        let h4 = document.createElement("h4");
        h4.textContent = i.name;
        h4.className =
          "text-md sm:text-lg md:text-lg font-semibold text-green-700 mb-2";
        let h3 = document.createElement("h3");
        h3.className = "text-lg font-bold text-green-500 mb-2";
        let sp1 = document.createElement("span");
        sp1.textContent = "₹";
        let sp2 = document.createElement("span");
        sp2.textContent = i.price; //price
        h3.appendChild(sp1);
        h3.appendChild(sp2);
        let p = document.createElement("p");
        p.className = "text-green-800 mb-4 text-center";
        p.textContent = i.description;
        div1.appendChild(img);
        div1.appendChild(h4);
        div1.appendChild(h3);
        div1.appendChild(p);

        // for each loop the items are appended here
        container.appendChild(div1);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
getItems();
