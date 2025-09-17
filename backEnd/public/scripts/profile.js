let username = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let address = document.getElementById('address');

(function authenticateUser(){ // check if there a authenticated token or not
    if (!localStorage.getItem('token')) window.location.href='/EcoKart'; 
    // if no auithentication token simply redirect to home page
})();

async function fetchUserData(){ 
    try {
        const uid = localStorage.getItem("token");
        const response = await fetch(`http://localhost:4000/EcoKart/Users/${uid}`);
        if(!response.ok){
            window.location.href='/EcoKart';
        } else {
            let userdata  = await response.json();
            username.textContent = userdata.message[0].name;
            email.textContent = userdata.message[0].email;
            phone.textContent = userdata.message[0].phone;
            address.textContent = userdata.message[0].address;
        }
    } catch (error) {
        console.log(error.message);
    }
}
fetchUserData();

function logoutUser(){ // logout handler
        alert('are you sure you want to logout?');
        localStorage.removeItem('token');
        window.location.href = '/EcoKart';
}