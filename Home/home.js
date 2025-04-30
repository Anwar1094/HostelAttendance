const host = 'https://hostelattendance-backend.onrender.com'
const Pyhost = 'https://effects-tubes-chicken-pure.trycloudflare.com'

window.onload = () => checkAuth()
const $1 = (id) => document.getElementById(id);

const getToken = function () {
    return localStorage.getItem('token')
}

async function checkAuth() {
    const token = getToken()
    if (!getToken()) {
        swal("Session Expired!", `You are not logged in!!`, 'error').then((result) => {
            return redirect("/index.html");
        })
    }
    try {
        const response = await axios.get(`${host}/protected`, { headers: { Authorization: token } });
        if (!response.status == 200)
            throw new Error("Unauthorized access");
        loadWin();
    } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem("token");
        swal("Session Expired!", `Please login in!!`, 'error').then(res => redirect("/index.html"))
    }
}
// async function checkAuth() {
//     await fetch(`${Pyhost}/read-cookies`).then(response=>response.json())
//     .then(data=>{
//         console.log(data)
//     })
//     // try {
//     //     const response = await fetch("http://localhost:3000/protected", {
//     //         method: "GET",
//     //         credentials: "include" // Send cookies
//     //     });

//     //     if (!response.ok) {
//     //         throw new Error("Unauthorized access");
//     //     }

//     //     const data = await response.json();
//     //     console.log("Protected Data:", data);
//     // } catch (error) {
//     //     console.error("Auth Error:", error);
//     //     alert("Session expired. Please login again.");
//     //     redirect("/index.html");
//     // }
// }

// checkAuth()
function redirect(url) {
    location.replace(url)
}

function logout() {
    axios.get(`${host}/logout`).then(res => {
        if (res.status == 200) {
            localStorage.removeItem("token");
            redirect("/index.html");
        }
    })
}

function changeState(state, id = null, cls = null, element = null) {
    if (cls) {
        Array.from(document.getElementsByClassName(cls)).forEach(el => el.style.display = state);
    } else if (id) {
        $1(id).style.display = state;
    } else if (element) {
        document.querySelectorAll(element).forEach(el => el.style.display = state);
    }
}

function homefun() {
    fetchStuAttendance()
    changeState('none', "main-body-div")
    setTimeout(() => changeState('block', "main-body-div"), 100);
    ['pd-div', 'mark-attendance-div', 'viewAttendance', 'complain', 'thankYouMessage']
        .forEach(id => changeState('none', id));
    CloseCamera('success')
}

function showNavBar() {
    changeState('block', hamburger)
}
// Home
async function loadWin() {
    const token = getToken()
    const response = await axios.get(`${host}/setuser`, { headers: { Authorization: token } })
    $1('UserName').innerText = response?.data?.userId
    $1("pd-div").style.display = 'none';
    $1('Home-nav').addEventListener('click', homefun)
    $1('PersonalDetails-nav').addEventListener('click', Personal_Details)
    $1('MarkAttendance-nav').addEventListener('click', MarkAttendance)
    $1('viewAttendance-nav').addEventListener('click', viewAttendance)
    $1('complain-nav').addEventListener('click', complain)
    $1('profile-nav').addEventListener('click', showDropdown)
    fetchStuAttendance()
}
window.addEventListener('DOMContentLoaded', () => {
    setProfile(); // runs only once when DOM is ready
});
const profileImage = $1("profileImage");
const profileUpload = $1("profileUpload");
const profileDropdown = $1("profileDropdown");
const hamburger = $1("hamburger");
const navLinks = $1("navLinks");

// Toggle dropdown on profile image click
function showDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    $1('changePasswordPopUpBtn').addEventListener('click', showPasswordPopUp)
    $1('logout-btn').addEventListener('click', logout)
    $1('close-btn').addEventListener('click', closePasswordPopup)
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    const allowedIds = ['changePasswordPopUpBtn', 'oldpassword', 'newPassword', 'confirmPassword', 'passwordPopup', 'changePasswordButton', 'password-div']
    const exemptIds = ['profileImage', 'passwordPopup', 'changePasswordPopUpBtn', 'changePasswordButton', 'oldpassword', 'newPassword', 'confirmPassword', 'password-div'];
    const tagExempt = ['LABEL', 'H3'];
    if (!exemptIds.includes(event.target.id) && !tagExempt.includes(event.target.tagName)) {
        $1('profileDropdown').style.display = 'none';
        $1('passwordPopup').style.display = 'none';
    } else if (allowedIds.includes(event.target.id)) {
        $1('profileDropdown').style.display = 'block';
    }
    if (event.target.id == 'profileImage') {
        $1('passwordPopup').style.display = 'none';
    }
});

// // Profile Picture Upload
profileUpload.addEventListener("change", uploadPhoto)


function uploadPhoto() {
    const fileData = $1('profileUpload')
    if (!fileData.files[0]) return;

    const formData = new FormData();
    const token = getToken()
    formData.append('file', fileData.files[0]);
    axios.post(`${host}/uploadProfile`, formData, { headers: { Authorization: token } })
        .then(response => { if (response.status == 200) setProfile() })
        .catch(err => console.log(err.message))
}

async function setProfile() {
    try {
        const token = getToken()
        const res = await axios.get(`${host}/setProfile`, { headers: { 'authorization': token }, responseType: 'blob' });

        const contentType = res.headers['content-type'];
        if (!contentType || !contentType.startsWith('image')) {
            throw new Error("No image found");
        }
        if (res.data) {
            const imgURL = URL.createObjectURL(res.data);
            document.getElementById("profileImage").src = imgURL;
            document.getElementById("student-details-div-profileImage").src = imgURL;
        } 

    } catch (err) {
        console.log("Image load error:", err);
        document.getElementById("profileImage").src = "../src/user.png"; // fallback
        document.getElementById("student-details-div-profileImage").src = "../src/user.png"; // fallback
    }

}

function showPasswordPopUp() {
    $1("passwordPopup").style.display = "block";
    $1("changePasswordButton").addEventListener('click', changePasswordDropdown)
}

// Function to Close Change Password Pop-up
function closePasswordPopup() {
    $1("passwordPopup").style.display = "none";
    $1("changePasswordButton").removeEventListener('click', changePasswordDropdown)
}

// Button Click for Password Change (without form tag)
function changePasswordDropdown() {
    const oldPassword = $1("oldpassword").value;
    const newPassword = $1("newPassword").value;
    const confirmPassword = $1("confirmPassword").value;
    const errorMessage = $1("error-message");
    const token = getToken()
    // Clear previous error messages
    errorMessage.style.display = "none";
    if (!oldPassword || !newPassword || !confirmPassword) {
        return showError("fields do not empty!");
    }
    // Validate password match
    if (newPassword !== confirmPassword) {
        return showError('Passwords do not match!');
    }
    axios.post(`${host}/changeStudentpassword`, { oldPassword, newPassword }, { headers: { Authorization: token } })
        .then(response => closePasswordPopup())
        .catch((error) => {
            console.error('Error:', error.message); // Handle any error
            console.error('Error:', error.response['statusText', error.status]); // Handle any error
            showError("Something went wrong. Please try again!");
        });
    function showError(msg) {
        errorMessage.textContent = msg;
        errorMessage.style.display = "block";
    }
};

// Toggle hamburger menu
hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove("active");
    }
});

// Fetching List of Holidays
async function getData_of_list_of_holidays() {
    const container = document.getElementById("data-container-getData_of_list_of_holidays");
    container.innerHTML = "Loading...";

    try {
        const response = await axios.get(`${host}/getData_of_list_of_holidays`);
        const data = response.data;

        container.innerHTML = "";

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format received");
        }

        const htmlContent = data.map(item => `
            <div class="data-box">
                <strong>${item.Festival}</strong><br>
                Date: ${item.Date}<br>
                Day: ${item.Day}<br>
                No. of Day: ${item.NoofDay}
            </div>
        `).join("");

        container.innerHTML = htmlContent;
    } catch (error) {
        console.error("Error fetching list of holidays:", error);
        container.innerHTML = "Failed to load data. Please try again later.";
    }
}


// getData_of_list_of_holidays();
function fetchStuAttendance() {
    const token = getToken()
    axios.get(`${host}/getData_of_student_attendance_data`, {headers: { Authorization: token }})
        .then(response => {
            const { Student_ID, Name, Hostel, Room_Number } = response.data[0];
            if (Name) {
                $1("student-details-div-name-labels").innerText = Name;
            }
            if (Student_ID) {
                $1("student-details-div-studentid-labels").innerText = Student_ID;
            }
            if (Hostel || Room_Number) {
                $1("hostel-and-room-label").innerText = `${Hostel}-${Room_Number}`;
            }
            updateProgressBar('totalattendance', 100)
            updateProgressBar('totalpresent', 70)
            updateProgressBar('totalabsent', 30)

            function updateProgressBar(id, percent) {
                const bar = $1(`progressBar-${id}`);
                bar.style.width = `${percent}%`;
                bar.innerText = `${percent}%`;
            }
        })
        .catch(error => {
            console.error('Error:', error.message); // Handle any error
            console.error('Error:', error.response['statusText', error.status]); // Handle any error
            console.error("Error fetching users:", error)
        });
}


// Personal Details Window
async function Personal_Details() {
    ["pd-div", "main-body-div", "mark-attendance-div", "viewAttendance", "complain", "thankYouMessage"].forEach(id => changeState('none', id));
    setTimeout(() => {
        changeState('block', "pd-div")
    }, 100);
    CloseCamera('success')
    document.querySelectorAll('.inp').forEach(item => item.value = '');
    const country = $1('Country')
    country.addEventListener('change', ()=>{
        setState(country.value)
    })
    $1('Save').addEventListener('click', saveStuData)
    await setCountryDropDown()
    const token = getToken()
    try {
        const response = await axios.get(`${host}/fetch-stu-pd`, { headers: { 'Authorization': token } } );
        const studentData = response.data[0];
        const inps = Array.from(document.querySelectorAll('.inp')).map(inp => inp.id);
        let showSave = false
        for (let [key, val] of Object.entries(studentData)) {
            if (val == null && key !== 'Profile') showSave = true;
            if (val !== null && inps.includes(key)) {
                const element = $1(key);
                if (element.type === 'date') {
                    element.value = val.split('T')[0];
                } else {
                    element.value = val;
                    if (key === 'State'){
                        setState(studentData['Country'], val)
                    }
                }
                if (element.tagName === 'SELECT') {
                    element.disabled = true;
                } else {
                    element.readOnly = true;
                }
            }
        }
        $1('Save').style.display = showSave ? 'block' : 'none';
    } catch (error) {
        console.error("Error fetching personal details:", error);
    }
}

function saveStuData() {
    const data = {}
    const token = getToken()
    document.querySelectorAll('.inp').forEach(element => {
        if (element.id != 'Student_ID') {
            data[element.id] = element.value || null;;
        }
    })
    const Student_ID = $1('Student_ID').value
    axios.post(`${host}/updateStuDetails`, { data, Student_ID }, { headers: { Authorization: token } })
        .then(response => {
            if (response.data?.Updated) Personal_Details();
        }).catch(error => {
            let { err } = error?.response?.data
            swal(err.Title, err.Msg, 'error')
            console.error('Error:', error); // Handle any error
        })
}

let CountryObj = {};
async function setCountryDropDown() {
    try {
        const response = await axios.get(`${host}/Countries`);
        CountryObj = response.data;

        const Country = $1('Country');
        Country.innerHTML = `<option value="">Select Country</option>`;
        for (const country of Object.keys(CountryObj)) {
            const option = document.createElement('option');
            option.value = country;
            option.text = country;
            Country.appendChild(option);
        }
    } catch (error) {
        console.error("Error loading country dropdown:", error);
    }
}

function setState(country = null, selectedState=null) {
    if (!country)
    country = $1('Country').value;
    const State = $1('State');
    State.innerHTML = '';

    if (!CountryObj[country]) return;

    CountryObj[country].forEach(state => {
        const option = document.createElement('option');
        option.className = 'state';
        option.value = state;
        if (selectedState && option.value == selectedState) {
            option.selected = true
        }
        option.text = state;
        State.appendChild(option);
    });
}
// Mark Attendance Window Code
let captInterval, videoStream, count = 0, Detected = 0;
const hideAllSections = () => {
    ['main-body-div', 'pd-div', 'viewAttendance', 'complain', 'thankYouMessage', 'mark-attendance-div'].forEach(id => changeState('none', id));
};

function MarkAttendance() {
    hideAllSections()
    setTimeout(() => changeState('flex', "mark-attendance-div"), 100);
    // Reset GUI on load
    $1('stuID').textContent = ''
    $1('btnText-captureImage').textContent = 'Mark Attendance'
    $1('submitAttendance').disabled = true;
    changeState('block', 'scan-line')
    $1('scanner').style.borderColor = '#0095ff'
    $1('att-h1').innerHTML = 'Marking Your Attendance...'
    const token = getToken()
    axios.get(`${Pyhost}/fetchFaces`, { headers: { 'Authorization': token } });
    const video = $1('video');
    // Access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoStream = stream;
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing webcam: ', error);
            swal("Can't Access Webcam", "Make Sure Your Camera is Accesible!", 'error');
        });

    captInterval = setInterval(captureImage, 2000)
}
// Function to capture an image and send it to the server
function captureImage() {
    const video = $1('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Send the image data to the server
    sendImageToServer(canvas.toDataURL('image/png'));
}

// Function to send image data to the server
async function sendImageToServer(imageDataUrl) {

    $1('scanner').style.borderColor = '#0095ff'
    $1('att-h1').innerHTML = 'Detecting Your Face...'

    try {
        const token = getToken()
        const response = await axios.post(`${Pyhost}/recognize_face`, { imageDataUrl })
        const stuId = response?.data?.['stuId'];
        const res = await axios.get(`${host}/setuser`, { headers: { Authorization: token } })
        const currId = res?.data?.userId
        if (!stuId) {
            if (++count > 10) {
                $1('scanner').style.borderColor = 'red'
                $1('att-h1').innerHTML = 'No Face Detected!'
                CloseCamera('fail');
                setTimeout(MarkAttendance, 2000);
            }
        } else if (stuId != 'Undetected' && stuId == currId) {
            $1('stuID').textContent = stuId;
            changeState('none', 'scan-line')
            $1('scanner').style.borderColor = '#00ff6e'
            if (document.getAnimations('att-h1')) {
                CloseCamera('success')
                $1('att-h1').innerHTML = 'Attendance Marked!'
            }
            $1('submitAttendance').disabled = false;
            return;
        } else if (++Detected > 5 && Detected % 3 == 0) {
            $1('att-h1').innerHTML = 'Face Not Matched!'
            $1('scanner').style.borderColor = 'red'
        }
        
    } catch (error) {
        console.error('Error:', error); // Handle any error
        const err = error?.response?.data
        if (err) {
            swal(err['Title'], err['Msg'], 'error')
                .then(() => {
                    if (err.status != 403) setTimeout(MarkAttendance, 1000);
                    else homefun()
                })
        }
        CloseCamera('fail')
    }
}

function CloseCamera(st) {
    clearInterval(captInterval);
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }
    changeState('none', 'scan-line')
    count = 0
}

async function submitAttendance() {
    changeState('none', 'btnText-captureImage')
    changeState('flex', 'spinner-captureImage')
    const Student_ID = $1('stuID').textContent;
    const token = getToken()
    try {
        const verifyRes = await axios.get(`${Pyhost}/verify`);
        if (!verifyRes.data.success) return;

        const attendanceRes = await axios.post(`${host}/markAttendance`, { Student_ID }, { headers: { Authorization: token } });
        if (attendanceRes.data) {
            changeState('none', 'spinner-captureImage');
            changeState('flex', 'btnText-captureImage');
            $1('btnText-captureImage').innerHTML = 'Attendance Submitted!';
            setTimeout(viewAttendance, 2000);
        }
    } catch (error) {
        console.error('Error:', error); // Handle any error
        const err = error?.response?.data;
        if (err) {
            swal(err['Title'], err['Msg'], 'error');
        }
    }
}
// View Attendance Window
function viewAttendance() {
    hideAllSections();
    setTimeout(() => changeState('block', 'viewAttendance'), 100);
    $1('fromDate').value = ''
    $1('toDate').value = ''
    $1('tableBody').innerHTML = ''
    CloseCamera('success')
}


function createTableRow(srNo, date, days, time, attendance) {
    return `<tr><td>${srNo}</td><td>${date}</td><td>${days}</td><td>${time}</td><td>${attendance}</td></tr>`;
}

function showAttendance() {
    const dayMap = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const startDate = $1('fromDate').value
    const endDate = $1('toDate').value
    const token = getToken()
    axios.post(`${host}/fetchAttendance`, { startDate, endDate }, { headers: { Authorization: token } })
        .then(response => {
            const tableBody = $1('tableBody');
            tableBody.innerHTML = '';
            response.data.forEach((row, i) => {
                tableBody.innerHTML += createTableRow(i + 1, row['Date'].split('T')[0], dayMap[row['Day']], row['Time'], row['Attendance']);
            });
        }).catch(error => {
            const err = error?.response?.data?.err;
            if (err) swal(err['Title'], err['Msg'], 'error');
            else swal('Database Error', 'Server Error!', 'error');
        })
}

// Complain Code
function complain() {
    hideAllSections();
    setTimeout(() => changeState('block', 'complain'), 100);
    CloseCamera('success')
    document.querySelectorAll('.complain-inp').forEach(data => data.value = '')
    $1('complaintForm').classList.remove('hidden')
    $1('thankYouMessage').classList.add('hidden')

    const complains = [
        "Hostel Issue", "Electricity Issue", "Water Issue", "Maintenance Issue", "Food Quality Issue", "Internet Issue", "Attendance Discrepancy", "Other"
    ]

    const Wardens = [
        "Abhishek Gupta", "Kedar", "Himalay Warden", "Shivalik Warden",
        "Arawali Warden", "Kaveri Warden", "Narmada Warden", "Godawari Warden", "Bhagirathi Warden"
    ]
    const complainType = $1('complaintType')
    const wardenSelect = $1('warden');
    complainType.innerHTML = '';
    wardenSelect.innerHTML = '';
    complains.forEach(complain => complainType.innerHTML += `<option value="${complain}">${complain}</option>`);
    Wardens.forEach(warden => wardenSelect.innerHTML += `<option value="${warden}">${warden}</option>`);
}

async function submitComplain() {
    const complainData = {}
    document.querySelectorAll('.complain-inp').forEach(inp => complainData[inp.id] = inp.value)
    const formData = new FormData();
    try {
        const fileInput = $1('uploadDoc');
        formData.append('complainData', JSON.stringify(complainData));
        if (fileInput.files[0]) formData.append('file', fileInput.files[0]);
        const token = getToken()
        const res = await axios.post(`${host}/submitComplain`, formData, { headers: { Authorization: token } });
        if (res.data?.success) {
            $1('complain').style.display = 'none';
            $1('thankYouMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        const err = error?.response?.data?.err;
        if (err) swal(err['Title'], err['Msg'], 'error');
        else swal('Database Error', 'Server Error!', 'error');
    }
}
