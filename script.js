const host = 'https://hostelattendance-backend.onrender.com'

window.onload = ()=> {
    document.getElementById('signin_div').style.display = 'block';
}

document.body.addEventListener('keydown', (event)=>{
    if (event.key == 'Enter') {
        signin()
    }

})

// Switch to Forget window
function go_to_forget_win(){
    document.getElementById('enter_otp_field').style.display='none';
    document.getElementById('signin_div').style.display='none';
    document.getElementById('forget_password_div').style.display='block';
    document.getElementById('change_password_div').style.display='none';
}

// Switch to back to Signin Window
function back_to_signin(){
    document.getElementById('signin_div').style.display='block';
    document.getElementById('forget_password_div').style.display='none';
    document.getElementById('change_password_div').style.display='none';

}

// Change Password state from hidden to visible wise-verse
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

// Check Password Strength
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

// Change Password state from hidden to visible wise-verse
function showPswrd() {
    (document.getElementById('new_pswrd').type == 'password')? document.getElementById('new_pswrd').type = 'text':document.getElementById('new_pswrd').type = 'password';
    (document.getElementById('re_pswrd').type == 'password')? document.getElementById('re_pswrd').type = 'text':document.getElementById('re_pswrd').type = 'password';
}

// Methods for show & hide windows
const show = (id)=>{
    document.getElementById(id).style.display = 'inline';
}

const hide = (id)=>{
    document.getElementById(id).style.display = 'none';
}

// Send OTP
function send_otp(){
    const userId = document.getElementById('userId-inp').value;
    if (userId == '') {
        swal("Mandatory Field", `Please enter Student Id!`, 'error')
        return
    }
    hide('btnText-send-otp')
    show('spinner-send-otp')
    document.getElementById('forget_btn').disabled = true;
    axios.post(`${host}/send-otp`, {'userId': userId})
    .then(response => {
        if (response.data['OTP Sent'] == true) {
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
            document.getElementById('forget_btn').disabled = false.get
            // alert('Server not Responding!')
            swal("OTP not Sent", `Server can't sent OTP!`, 'error')
        }
    }).catch(error=>{
        show('btnText-send-otp')
        hide('spinner-send-otp')
        document.getElementById('forget_btn').disabled = false;
        // alert('Server not Responding!')
        swal("Server Issus", `Server not Responding!`, 'error')
    });
}

// Verify OTP
function verify_OTP() {
    const otp_value = document.getElementById('otp-inp').value
    if (String(otp_value).length == 6) {
        hide('btnText-send-otp')
        show('spinner-send-otp')
        axios.post(`${host}/verify-otp`, {OTP: otp_value})
        .then(response =>{
            console.log(response.data)
            if (response.data['Verified'] == true) {
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

// Change Password
function change_pswrd() {
    const new_pswrd = document.getElementById('new_pswrd').value
    const re_pswrd = document.getElementById('re_pswrd').value
    if (new_pswrd == re_pswrd && new_pswrd != '') {
        hide('btnText-updatePswrd')
        show('spinner-updatePswrd')
        axios.post(`${host}/change_pswrd`, {'password': new_pswrd})
        .then(response =>{
            console.log(response.data)
            if (response.data['Msg']) {
                swal('Error', data['Msg'], 'error')
                show('btnText-updatePswrd')
                hide('spinner-updatePswrd')
                return
            }
            if (response.data['Changes'] == true) {
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

// Sign-in
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
        const response = await axios.post(`${host}/signin`, {uid, pswrd})
        console.log(response)
        hide('btnText-signin')
        show('spinner-signin')
        localStorage.setItem("userId", uid);
        const data = await response.data;
        if (response.status == 200) {
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

// Redirection method
function redirect(url) {
    window.location.href = url; // Redirect to the given page
}

// Logout method
async function logout() {
    localStorage.removeItem("token");
    redirect("index.html"); // Redirect back to login page

}

// Authentication Method
async function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
        // alert("You are not logged in!");
        swal("Session Expired!", `You are not logged in!!`, 'error')
        redirect("/index.html");
        return;
    }
    
    try {
        const response = await axios.get(`${host}/protected`)
        if (!response.ok) {
            throw new Error("Unauthorized access");
        }
        
        // const data = await response.json();
        console.log("Protected Data:", response.data);
        
    } catch (error) {
        console.error("Auth Error:", error);
        swal("Session Expired!", `Please login in!!`, 'error')
        localStorage.removeItem("token");
        redirect("index.html");
    }
}
