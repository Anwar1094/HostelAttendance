const host = 'https://hostelattendance-backend.onrender.com'

const $ = (id) => document.getElementById(id);
const toggleDisplay = (id, state) => $(id).style.display = state ? 'block' : 'none';

function toggleButtonLoading(btnId, loading) {
    toggleDisplay(`btnText-${btnId}`, !loading);
    toggleDisplay(`spinner-${btnId}`, loading);
    $(`${btnId}`).disabled = loading;
}

window.onload = () => {
    $('signin_div').style.display = 'block';
    localStorage.removeItem('token')
    $('eyeBtn').addEventListener('click', togglePasswordVisibility)
    $('forget').addEventListener('click', showForgetPassword)
    $('signin').addEventListener('click', signin)
}


// Switch to Forget window
function showForgetPassword() {
    toggleDisplay('signin_div', false);
    toggleDisplay('forget_password_div', true);

    $('back_to_signin').addEventListener('click', showSignin)
    $('btnText-send-otp').innerHTML = 'Get OTP'

    $('send-otp').replaceWith($('send-otp').cloneNode(true));
    $('send-otp').addEventListener('click', send_otp)

    $('new_pswrd').addEventListener('input', checkStrength)
    $('checkboxPswrd').addEventListener('input', showPswrd)
}

// Switch to back to Signin Window
function showSignin() {
    toggleDisplay('signin_div', true);
    toggleDisplay('forget_password_div', false);
    toggleDisplay('enter_otp_field', false);
    $('userId-inp').value = '';
}

// Change Password state from hidden to visible wise-verse
function togglePasswordVisibility() {
    const passField = $('inp-Pass');
    passField.type = passField.type === 'text' ? 'password' : 'text';
    let source = String($('eyeImg').src)
    if (source.endsWith('eyeClosed.svg') == true) {
        source = source.replace('eyeClosed.svg', 'eyeOpen.svg')
        $('eyeImg').src = source
    } else {
        source = source.replace('eyeOpen.svg', 'eyeClosed.svg')
        $('eyeImg').src = source
    }
}

// Check Password Strength
function checkStrength() {
    const pswrd = $('new_pswrd').value
    const lbl = $('passMisMatchLbl');
    const rules = [
        { regex: /[a-z]/, message: 'Password must contain Alphabets!' },
        { regex: /[0-9]/, message: 'Password must contain Numbers!' },
        { regex: /[A-Z]/, message: 'Password must contain Capital Letter!' },
        { regex: /[\W_]/, message: 'Password must contain Special Characters!' },
        { check: () => pswrd.length >= 8, message: 'Password length must be 8!' }
    ];
    for (const rule of rules) {
        if ('regex' in rule && !rule.regex.test(pswrd)) {
            lbl.innerText = 'Password must contain Alphabets, Numbers, Capital Letter, Special Symbols & 8 length';
            lbl.classList.remove('pass_not_match_label');
            return;
        } else if ('check' in rule && !rule.check()) {
            lbl.innerText = 'Password must contain Alphabets, Numbers, Capital Letter, Special Symbols & 8 length';
            lbl.classList.remove('pass_not_match_label');
            return;
        }
    }
    lbl.innerText = '';
    $('re_pswrd').disabled = false;
    lbl.classList.add('pass_not_match_label');
}

// Change Password state from hidden to visible wise-verse
function showPswrd() {
    ['new_pswrd', 're_pswrd'].forEach(id => {
        const el = $(id);
        el.type = el.type === 'password' ? 'text' : 'password';
    });
}



// Send OTP
function send_otp() {
    const userId = $('userId-inp').value;
    if (userId == '') return swal("Mandatory Field", `Please enter Student Id!`, 'error')

    toggleButtonLoading('send-otp', true)
    try {
        axios.post(`${host}/send-otp`, { userId })
            .then(response => {
                if (response.data.otpSent == true) {
                    swal(response.data.Title, response.data.Msg, 'success')
                    toggleDisplay('enter_otp_field', true)
                    toggleButtonLoading('send-otp', false)
                    $('btnText-send-otp').innerHTML = "Verify OTP";
                    $('send-otp').replaceWith($('send-otp').cloneNode(true));
                    $('send-otp').addEventListener('click', () => verify_OTP(userId));
                    $('send-otp').disabled = false;
                }
            })
            .catch(error => {
                console.log('Error:', error?.message); // Handle any error
                console.log('Error:', error?.response?.statusText, error?.response?.status); // Handle any error
                toggleButtonLoading('send-otp', false)
                if (error.response?.status) {
                    let { data } = error.response
                    swal(data.Title, data.Msg, 'error')
                } else {
                    swal('Server Not Responding!', 'Server not Responding!', 'error');
                }
            });
    } catch {
        console.log(err)
    }
}

// Verify OTP
function verify_OTP(userId) {
    const otp_value = $('otp-inp').value
    if (otp_value.length !== 6) return;
    toggleButtonLoading('send-otp', false)

    axios.post(`${host}/verify-otp`, { OTP: otp_value, userId: userId })
        .then(response => {
            if (response.data.Verified) {
                swal(response.data.Title, response.data.Msg, 'success')
                toggleDisplay('forget_password_div', false)
                toggleDisplay('change_password_div', true)
                $('change_pswrd_btn').addEventListener('click', () => change_pswrd(userId))
                $('re_pswrd').disabled = true
                toggleButtonLoading('send-otp', true)
            }
        }).catch(error => {
            toggleButtonLoading('send-otp', false)
            console.log('Error:', error); // Handle any error
            if (error.response?.status) {
                let { data } = error.response
                swal(data.Title, data.Msg, 'error')
            } else {
                swal('Server Not Responding!', 'Server not Responding!', 'error');
            }
        })
}

// Change Password
function change_pswrd(userId) {
    const new_pswrd = $('new_pswrd').value
    const re_pswrd = $('re_pswrd').value
    console.log(userId)
    if (new_pswrd !== re_pswrd || !new_pswrd) {
        $('passMisMatchLbl').innerText = 'Password not Matched!';
        $('passMisMatchLbl').classList.remove('pass_not_match_label');
        return
    }
    axios.post(`${host}/change_pswrd`, { password: new_pswrd, userId: userId })
        .then(response => {
            if (response.data.Changes) {
                swal(response.data.Title, response.data.Msg, 'success')
                toggleDisplay('signin_div', true)
                toggleDisplay('forget_password_div', false)
                toggleDisplay('change_password_div', false)
            }
        }).catch(error => {
            console.error('Error:', error.message); // Handle any error
            console.error('Error:', error.response?.statusText, error.response?.status); // Handle any error
            toggleDisplay('signin_div', true)
            toggleDisplay('forget_password_div', false)
            toggleDisplay('change_password_div', false)
            if (error.response?.status) {
                let { data } = error.response
                swal(data.Title, data.Msg, 'error')
            } else {
                swal('Server Not Responding!', 'Server not Responding!', 'error');
            }
        })
}

// Sign-in
async function signin() {
    const uid = $('inp-userId').value
    const pswrd = $('inp-Pass').value
    if (!uid || !pswrd) return swal('Mandatory Field', 'Please fill in all fields!', 'error');
    toggleButtonLoading('signin', true);
    try {
        const response = await axios.post(`${host}/signin`, { uid, pswrd })
        toggleButtonLoading('signin', false);
        const data = await response.data;
        if (response.status == 200) {
            localStorage.setItem("token", data.token); // Store token in localStorage
            if (data.role === 'Warden') return redirect("Warden/warden.html");
            if (data.div) {
                // console.log(response.data)
                $('signin_div').style.display = 'none'
                $('bg-img').innerHTML += data.div
                const video = $('video');
                // Access the user's camera
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => video.srcObject = stream)
                    .catch((error) => {
                        console.error('Webcam access denied:', error);
                        swal("Permission Denied", "Camera access is required!", "error");
                    });
            } else {
                redirect('Home/home.html')
            }
            toggleButtonLoading('signin', false);
        }
    } catch (error) {
        console.error('Error:', error.message); // Handle any error
        console.error('Error:', error.response?.statusText, error.response?.status); // Handle any error
        toggleButtonLoading('signin', false);
        if (error.response?.status == 422) {
            let { data } = error.response
            swal(data.Title, data.Msg, 'error')
        } else {
            swal('Server Not Responding!', 'Server not Responding!', 'error');
        }
    }
}

// Redirection method
function redirect(url) {
    console.log(location)
    location.replace(url)
}

// Logout method
function logout() {
    localStorage.removeItem("token");
    redirect("/index.html"); // Redirect back to login page
}

// Authentication Method
async function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) { return swal("Session Expired!", `You are not logged in!!`, 'error') && redirect("/index.html"); }

    try {
        const response = await axios.get(`${host}/protected`)
        if (response.status !== 200) { throw new Error("Unauthorized access"); }
    } catch (error) {
        console.error("Auth Error:", error);
        localStorage.removeItem("token");
        swal("Session Expired!", `Please login in!!`, 'error')
        redirect("index.html");
    }
}

// Function to capture an image and send it to the server
function captureImage() {
    let i = 1
    let images = []
    const interval = setInterval(() => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.save();
        context.scale(-1, 1);  // flip horizontally
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        context.restore();
        const imageDataUrl = canvas.toDataURL('image/png');
        images.push(String(imageDataUrl))
        $('register-face-div').style.height = '500px'
        $(`captured-image${i}`).setAttribute('src', imageDataUrl)
        toggleDisplay(`captured-image${i}`, true)
        if (i == 5) {
            toggleDisplay('tick', true)
            toggleDisplay('cross', true)
            $('CaptureBtn').disabled = true
            $('tick').addEventListener('click', () => {
                $('CaptureBtn').disabled = false
                $('CaptureBtn').onclick = () => saveImage(images)
                $('btnText-captureImage').innerHTML = 'Register Face'
            })
            $('cross').addEventListener('click', () => {
                $('CaptureBtn').disabled = false
                $('btnText-captureImage').innerHTML = 'Capture'
                $('CaptureBtn').onclick = captureImage
                for (let j = 1; j <= 5; j++) {
                    $(`captured-image${j}`).src = ''
                    toggleDisplay(`captured-image${j}`, false)
                    $('register-face-div').style.height = '366px'
                }
                toggleDisplay('tick', false)
                toggleDisplay('cross', false)
            })
            clearInterval(interval)
        }
        i++
    }, 2000);
}

function saveImage(images) {
    axios.post(`${host}/save-image`, { images: images })
        .then(response => {
            if (response.data.save) {
                redirect("Home/home.html");
            }
        }).catch(error => {
            console.error('Error:', error.message); // Handle any error
            console.error('Error:', error.response?.statusText, error.response?.status); // Handle any error
        })
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

// history.pushState(window.document.title, "");
