const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginemail = document.getElementById('loginemail');
const loginpassword = document.getElementById('loginpassword');

loginForm.addEventListener('submit', async(e)=>{
    e.preventDefault();
    if(loginemail.value.length<=5){
        alert("email too short to be real");
        return
    } else if (loginpassword.value.length<=5){
        alert("Password Too short");
        return
    } else {
    try {
        data={email:loginemail.value,pass:loginpassword.value}
        let response = await fetch("http://localhost:4000/EcoKart/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
        });
        if(!response.ok){
            alert ("Login Uncessessful");
            return
        } else {
            let data  = await response.json();
            if(data){
                id=data.message;
                localStorage.setItem('token',JSON.stringify(id));
                window.location.href="/EcoKart/home";
            }
        }
    } catch (error) {
        console.log(error.message);
    }
    
    }
});

registerForm.addEventListener('submit',(e)=>{
    e.preventDefault();
});

loginTab.onclick = () => {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginTab.classList.add('border-green-500');
    registerTab.classList.remove('border-green-500');
    registerTab.classList.add('border-transparent');
    loginTab.classList.remove('border-transparent');
};

registerTab.onclick = () => {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    registerTab.classList.add('border-green-500');
    loginTab.classList.remove('border-green-500');
    loginTab.classList.add('border-transparent');
    registerTab.classList.remove('border-transparent');
};
// function registerHandler(e){
//     e.preventDefault();
//     console.log("world");
    
// }