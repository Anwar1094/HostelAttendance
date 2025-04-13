const host = 'https://hostelattendance-backend.onrender.com'

window.onload = ()=> {
    document.getElementById('signin_div').style.display = 'block';
}

document.body.addEventListener('keydown', (event)=>{
    if (event.key == 'Enter') {
        signin()
    }

})

function go_to_forget_win(){
    document.getElementById('enter_otp_field').style.display='none';
    document.getElementById('signin_div').style.display='none';
    document.getElementById('forget_password_div').style.display='block';
    document.getElementById('change_password_div').style.display='none';
}

function back_to_signin(){
    document.getElementById('signin_div').style.display='block';
    document.getElementById('forget_password_div').style.display='none';
    document.getElementById('change_password_div').style.display='none';

}

function changePswrdState() {
    (document.getElementById('inp-Pass').type == 'text'?document.getElementById('inp-Pass').type = 'password':document.getElementById('inp-Pass').type = 'text');
    console.log(document.getElementById('eyeImg').src);
    let source = String(document.getElementById('eyeImg').src)
    if (source.endsWith('eyeClosed.svg') == true) {
        source = source.replace('eyeClosed.svg', 'eyeOpen.svg')
        document.getElementById('eyeImg').src = source
    } else {
        source = source.replace('eyeOpen.svg', 'eyeClosed.svg')
        document.getElementById('eyeImg').src = source
    }
}

function checkStrength() {
    const pswrd = document.getElementById('new_pswrd').value
    console.log(pswrd)
    document.getElementById('passMisMatchLbl').classList.remove('pass_not_match_label')
    if (/[a-z]/.test(pswrd) == false) {
        document.getElementById('passMisMatchLbl').innerHTML = 'Password must contain Alphabets!'
    } else if (/[0-9]/.test(pswrd) == false) {
        document.getElementById('passMisMatchLbl').innerHTML = 'Password must contain Numbers!'
    } else if (/[A-Z]/.test(pswrd) == false) {
        document.getElementById('passMisMatchLbl').innerHTML = 'Password must contain Capital Letter!'
    } else if (/[\W_]/.test(pswrd) == false) {
        document.getElementById('passMisMatchLbl').innerHTML = 'Password must contain Speical Characters!'
    } else if ((pswrd.length >= 8) ==false) {
        document.getElementById('passMisMatchLbl').innerHTML = 'Password length must be 8!'
    } else {
        document.getElementById('passMisMatchLbl').innerHTML = ''
        document.getElementById('re_pswrd').disabled = false
        document.getElementById('passMisMatchLbl').classList.add('pass_not_match_label')
    }
}

function showPswrd() {
    (document.getElementById('new_pswrd').type == 'password')? document.getElementById('new_pswrd').type = 'text':document.getElementById('new_pswrd').type = 'password';
    (document.getElementById('re_pswrd').type == 'password')? document.getElementById('re_pswrd').type = 'text':document.getElementById('re_pswrd').type = 'password';
}

const show = (id)=>{
    document.getElementById(id).style.display = 'inline';
}

const hide = (id)=>{
    document.getElementById(id).style.display = 'none';
}

function send_otp(){
    const userId = document.getElementById('userId-inp').value;
    if (userId == '') {
        swal("Mandatory Field", `Please enter Student Id!`, 'error')
        return
    }
    hide('btnText-send-otp')
    show('spinner-send-otp')
    document.getElementById('forget_btn').disabled = true;
    fetch(`${host}/send-otp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'userId': userId})
    }).then(response => response.json())
    .then(data => {
        if (data['OTP Sent'] == true) {
            swal("OTP Sent", `OTP is sent to your register Email!`, 'success')
            document.getElementById('enter_otp_field').style.display='block';
            show('btnText-send-otp')
            hide('spinner-send-otp')
            document.getElementById('btnText-send-otp').innerHTML = "Verify OTP";
            document.getElementById('forget_btn').setAttribute("onclick", "verify_OTP()");
            document.getElementById('forget_btn').disabled = false;
        } else{
            show('btnText-send-otp')
            hide('spinner-send-otp')
            document.getElementById('forget_btn').disabled = false;
            // alert('Server not Responding!')
            swal("OTP not Sent", `Server can't sent OTP!`, 'error')
        }
        console.log(data)
    }).catch(error=>{
        show('btnText-send-otp')
        hide('spinner-send-otp')
        document.getElementById('forget_btn').disabled = false;
        // alert('Server not Responding!')
        swal("Server Issus", `Server not Responding!`, 'error')
    });
}

function verify_OTP() {
    const otp_value = document.getElementById('otp-inp').value
    if (String(otp_value).length == 6) {
        hide('btnText-send-otp')
        show('spinner-send-otp')
        fetch(`${host}/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({OTP: otp_value})
        }).then(response=>response.json())
        .then(data =>{
            console.log(data)
            if (data['Verified'] == true) {
                swal("OTP Verified", `OTP Verification Successfull!`, 'success')
                document.getElementById('forget_password_div').style.display='none';
                document.getElementById('change_password_div').style.display='block';
                document.getElementById('forget_btn').addEventListener('click', change_pswrd)
                document.getElementById('re_pswrd').disabled = true
                show('btnText-send-otp')
                hide('spinner-send-otp')
            } else {
                show('btnText-send-otp')
                hide('spinner-send-otp')
                // alert('Enter a valid OTP!')
                swal("Invalid OTP", `Enter a valid OTP!`, 'error')
            }
        })
    } else {
        swal("Server Issus", `Server not Responding!`, 'error')
    }
}

function change_pswrd() {
    const new_pswrd = document.getElementById('new_pswrd').value
    const re_pswrd = document.getElementById('re_pswrd').value
    if (new_pswrd == re_pswrd && new_pswrd != '') {
        hide('btnText-updatePswrd')
        show('spinner-updatePswrd')
        fetch(`${host}/change_pswrd`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'password': new_pswrd})
        }).then(response=>response.json())
        .then(data =>{
            console.log(data)
            if (data['Msg']) {
                swal('Error', data['Msg'], 'error')
                show('btnText-updatePswrd')
                hide('spinner-updatePswrd')
                return
            }
            if (data['Changes'] == true) {
                swal("Password Updated", `Password Changed Successfully!`, 'success')
                document.getElementById('signin_div').style.display='block';
                document.getElementById('forget_password_div').style.display='none';
                document.getElementById('change_password_div').style.display='none';
                show('btnText-updatePswrd')
                hide('spinner-updatePswrd')
            } else {
                show('btnText-updatePswrd')
                hide('spinner-updatePswrd')
                // alert('Server not Responding!')
                swal("Server Issus", `Server not Responding!`, 'error')
            }
        })
    } else {
        document.getElementById('passMisMatchLbl').innerHTML = 'Password not Matched!'
        document.getElementById('passMisMatchLbl').classList.remove('pass_not_match_label')
    }
}

async function signin() {
    const uid = document.getElementById('inp-userId').value
    const pswrd = document.getElementById('inp-Pass').value
    if (uid == '') {
        swal("Mandatory Field", `Please enter Student Id!`, 'error')
        return
    } else if(pswrd == '') {
        swal("Mandatory Field", `Please enter your Password!`, 'error')
        return
    }
    try {
        const response = await fetch(`${host}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // credentials: "include", // Send cookies
            body: JSON.stringify({uid, pswrd})
        })
        hide('btnText-signin')
        show('spinner-signin')
        localStorage.setItem("userId", uid);
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token); // Store token in localStorage
            if (String(uid).startsWith('INVW')) {
                redirect("Warden/warden.html");
            } else {
                redirect("Home/home.html");
            }
            show('btnText-signin')
            hide('spinner-signin')
        } else {
            swal("Mismatch", `Username or Password is incorrect!`, 'error') 
            show('btnText-signin')
            hide('spinner-signin')
        }
    } catch (err) {
        console.log(err.message)
        show('btnText-signin')
        hide('spinner-signin')
        swal("Server Issus", `Server not Responding!`, 'error')
    }
}

function redirect(url) {
    window.location.href = url; // Redirect to the given page
}

async function logout() {
    localStorage.removeItem("token");
    redirect("index.html"); // Redirect back to login page
    // await fetch("http://localhost:3300/logout", {
    //     method: "POST",
    //     credentials: "include" // Send cookies
    // });

}

async function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
        // alert("You are not logged in!");
        swal("Session Expired!", `You are not logged in!!`, 'error')
        redirect("/index.html");
        return;
    }
    
    try {
        const response = await fetch("http://localhost:3300/protected", {
            method: "GET",
            headers: { "Authorization": token }
        });
        
        if (!response.ok) {
            throw new Error("Unauthorized access");
        }
        
        const data = await response.json();
        console.log("Protected Data:", data);
        
    } catch (error) {
        console.error("Auth Error:", error);
        swal("Session Expired!", `Please login in!!`, 'error')
        localStorage.removeItem("token");
        redirect("index.html");
    }
}


// async function checkAuth() {
//     try {
//         const response = await fetch("http://localhost:3300/protected", {
//             method: "POST",
//             credentials: "include" // ✅ Ensures cookies are sent with the request
//         });

//         if (!response.ok) {
//             throw new Error("Unauthorized access");
//         }

//         const data = await response.json();
//         console.log("Protected Data:", data);

//     } catch (error) {
//         console.error("Auth Error:", error);
//         swal("Session Expired!", `Please log in!!`, 'error');
//         localStorage.removeItem("token"); // Optional: Clear localStorage
//         redirect("index.html");
//     }
// }

// history.pushState(window.document.title, "#");
