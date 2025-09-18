const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginemail = document.getElementById('loginemail');
const loginpassword = document.getElementById('loginpassword');
const registername= document.getElementById("registername");
const registeremail= document.getElementById("registeremail");
const registerpassword= document.getElementById("registerpassword");
const registerphone= document.getElementById("registerphone");
const registeraddress= document.getElementById("registeraddress");

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

registerForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    if(registername.value.length<=4){
        alert("Name too short");
        return;
    } else {
         if (registeremail.value.length<=8){
            alert("Email too short");
            return;
        } else {
            if (registerpassword.value.length<=8) {
                alert("Password too short");
                return;
            } else {
                if(registerphone.value.length!=10) {
                    alert("Phone number must be of length 10");
                    return;
                } else {
                    if(registeraddress.value.length<=5){
                        alert("your full address is required");
                        return;
                    } else {
                        try {
                            data={name:registername.value,email:registeremail.value,pass:registerpassword.value,
                                phone:registerphone.value,address:registeraddress.value};
                            let response = await fetch("http://localhost:4000/Ecokart/register",{
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data)
                            });
                            if(!response.ok){
                                alert("Registeration Unsuccessful");
                                return;
                            } else {
                                    loginForm.classList.remove('hidden');
                                    registerForm.classList.add('hidden');
                                    loginTab.classList.add('border-green-500');
                                    registerTab.classList.remove('border-green-500');
                                    registerTab.classList.add('border-transparent');
                                    loginTab.classList.remove('border-transparent');
                            }
                        } catch (error) {
                            console.log(error.message);
                        }
                    }
                }
            }
        }
    }
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