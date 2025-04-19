const host = 'https://hostelattendance-backend.onrender.com'
const Pyhost = 'https://rock-becoming-startup-rock.trycloudflare.com'

async function checkAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
        swal("Session Expired!", `You are not logged in!!`, 'error').then((result) => {
            redirect("/index.html");
        }).catch((err) => {

        });
        return;
    }

    try {
        const response = await axios.get(`${host}/protected`, { headers: { "Authorization": `${token}` } });
        if (!response.status == 200) {
            throw new Error("Unauthorized access");
        } else {
            loadWin()
        }
    } catch (error) {
        console.error("Auth Error:", error);
        swal("Session Expired!", `Please login in!!`, 'error')
        localStorage.removeItem("token");
        redirect("/index.html");
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

checkAuth()
function redirect(url) {
    window.location.href = url; // Redirect to the given page
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    redirect("/index.html"); // Redirect back to login page
    fetch(`${host}/logout`)
    window.history.forward()
}

function changeState(state, id = null, cls = null, element = null) {
    if (cls != null) {
        document.getElementsByClassName(`${cls}`).style.display = state;
    } else if (id != null) {
        document.getElementById(`${id}`).style.display = state;
    } else {
        document.querySelectorAll(`${element}`).forEach(item => {
            item.style.display = state;
        })
    }
}

function homefun() {
    fetchStuAttendance()
    changeState('none', "main-body-div")
    setTimeout(() => {
        changeState('block', "main-body-div")
    }, 100);
    changeState('none', "pd-div")
    changeState('none', "mark-attendance-div")
    changeState('none', 'viewAttendance')
    changeState('none', 'complain')
    changeState('none', 'thankYouMessage')
    CloseCamera('success')
}

function showNavBar() {
    changeState('block', hamburger)
}
// Home
async function loadWin() {
    document.getElementById("pd-div").style.display = 'none';
    document.getElementById('UserName').innerHTML = localStorage.getItem('userId');
    const user = localStorage.getItem('userId');
    fetchStuAttendance()
}
window.addEventListener('DOMContentLoaded', () => {
    setProfile(); // runs only once when DOM is ready
});
const profileImage = document.getElementById("profileImage");
const profileUpload = document.getElementById("profileUpload");
const profileDropdown = document.getElementById("profileDropdown");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Toggle dropdown on profile image click
function showDropdown() {
    const style = document.getElementById('profileDropdown').style.display
    if (style == 'block') {
        document.getElementById('profileDropdown').style.display = 'none'
        return
    } else {
        document.getElementById('passwordPopup').style.display = 'none'
        document.getElementById('profileDropdown').style.display = 'block'
    }
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    console.log(event.target.tagName)
    if (event.target.id != 'profileImage') {
        if (event.target.id == 'changePasswordPopUpBtn' || event.target.id == 'oldpassword' || event.target.id == 'newPassword' || event.target.id == 'confirmPassword' || event.target.tagName == 'label' || event.target.tagName == 'H3' || event.target.id == 'password-div') {
            document.getElementById('profileDropdown').style.display = 'block'
            return
        }
        document.getElementById('profileDropdown').style.display = 'none'
        return
    }
});

// Profile Picture Upload
profileUpload.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            profileImage.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});
function uploadPhoto() {
    const formData = new FormData();
    try {
        const fileData = document.getElementById('profileUpload')
        if (fileData.files[0]) formData.append('file', fileData.files[0]);
    } catch (error) {
        console.log(error)
        return
    }
    console.log(formData)
    axios.post(`${host}/uploadProfile`, formData)
        .then(response => {
            console.log(response.data)
        }).catch(err => { console.log(err) })
}

async function setProfile() {
    try {
        const res = await axios.get(`${host}/setProfile`, { responseType: 'blob' });

        const contentType = res.headers['content-type'];
        if (!contentType || !contentType.startsWith('image')) {
            throw new Error("No image found");
        }

        const imgURL = URL.createObjectURL(res.data);
        document.getElementById("profileImage").src = imgURL;
        document.getElementById("student-details-div-profileImage").src = imgURL;

    } catch (err) {
        console.error("Image load error:", err);
        document.getElementById("profileImage").src = "user.png"; // fallback
    }

}

function showPasswordPopUp() {
    document.getElementById("passwordPopup").style.display = "block";
}

// Function to Close Change Password Pop-up
function closePasswordPopup() {
    document.getElementById("passwordPopup").style.display = "none";
}

// Button Click for Password Change (without form tag)
function changePasswordDropdown() {
    let oldPassword = document.getElementById("oldpassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let errorMessage = document.getElementById("error-message");

    // Clear previous error messages
    errorMessage.style.display = "none";
    if (!oldPassword || !newPassword || !confirmPassword) {
        errorMessage.textContent = "fields do not empty!";
        errorMessage.style.display = "block";
        return; // Stop further execution
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        errorMessage.style.display = "block";
        return; // Stop further execution
    }

    axios.post(`${host}/changeStudentpassword`, { oldPassword, newPassword })
        .then(response => {
            console.log('Success:', response.data); // Handle server response here (e.g., success message)
            closePasswordPopup(); // Close the popup after successful password change
        })
        .catch((error) => {
            console.error('Error:', error); // Handle any error
            errorMessage.textContent = "Something went wrong. Please try again!";
            errorMessage.style.display = "block"; // Show error message if request fails
        });
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
    console.log("hello");

    const container = document.getElementById("data-container-getData_of_list_of_holidays");
    container.innerHTML = "Loading..."; // Show loading message while data is being fetched

    try {
        const response = await axios.get(`${host}/getData_of_list_of_holidays`);

        // Check if the response status is OK (200)
        console.log(response.status)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.data;

        // Clear loading message and existing data
        container.innerHTML = "";

        // Generate the HTML string for all data
        let htmlContent = "";
        data.forEach(item => {
            htmlContent += `
                <div class="data-box">
                    <strong>${item.Festival}</strong><br>
                    Date: ${item.Date}<br>
                    Day: ${item.Day}<br>
                    No. of Day: ${item.NoofDay}
                </div>
            `;
        });

        // Append the generated HTML content to the container
        container.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error fetching data in list of holidays:", error);
        container.innerHTML = "Failed to load data. Please try again later."; // Show error message
    }
}


// getData_of_list_of_holidays();

function fetchStuAttendance() {
    axios.get(`${host}/getData_of_student_attendance_data`)
        .then(response => {

            const { Student_ID, Name, Hostel, Room_Number } = response.data[0];
            if (Name != null) {
                document.getElementById("student-details-div-name-labels").innerText = Name;
            }
            if (Student_ID != null) {
                document.getElementById("student-details-div-studentid-labels").innerText = Student_ID;
            }
            if (Hostel != null || Room_Number != null) {
                document.getElementById("hostel-and-room-label").innerText = `${Hostel}-${Room_Number}`;
            }

            document.getElementById("progressBar-totalattendance").style.width = 100 + "%";
            document.getElementById("progressBar-totalattendance").innerText = '100' + "%";

            document.getElementById("progressBar-totalpresent").style.width = 70 + "%";
            document.getElementById("progressBar-totalpresent").innerText = '70' + "%";

            document.getElementById("progressBar-totalabsent").style.width = 30 + "%";
            document.getElementById("progressBar-totalabsent").innerText = '30' + "%";

        })
        .catch(error => console.error("Error fetching users:", error));
}

// Personal Details Window
async function Personal_Details() {
    changeState('none', "pd-div")
    setTimeout(() => {
        changeState('block', "pd-div")
    }, 100);
    changeState('none', "main-body-div")
    changeState('none', "mark-attendance-div")
    changeState('none', 'viewAttendance')
    changeState('none', 'complain')
    changeState('none', 'thankYouMessage')
    CloseCamera('success')
    document.querySelectorAll('.inp').forEach(item => {
        item.value = ''
    });
    setCountryDropDown()

    const currUserID = document.getElementById('student-details-div-studentid-labels').innerHTML
    await axios.post(`${host}/fetch-stu-pd`, { currUserID })
        .then((response) => {
            const inps = []
            document.querySelectorAll('.inp').forEach(inp => {
                inps.push(inp.id)
            })
            var save = false
            for (let [key, val] of Object.entries(response.data[0]).sort()) {
                if (val == null && key != 'Profile') {
                    save = true
                }
                if (val != null && inps.includes(key)) {
                    if (document.getElementById(key).type == 'date') {
                        document.getElementById(key).value = val.split('T')[0]
                    } else {
                        if (key == 'Country') {
                            setState(val)
                        }
                        document.getElementById(key).value = val
                    }
                    if (document.getElementById(key).tagName == 'SELECT') {
                        document.getElementById(key).setAttribute('disabled', true)
                    } else {
                        document.getElementById(key).setAttribute('readonly', true)
                    }
                }
            }
            if (save == true) {
                document.getElementById('Save').style.display = 'block';
            } else {
                document.getElementById('Save').style.display = 'none';
            }
        }).catch((err) => {
            console.log(err)
        });
}

function saveStuData() {
    const data = {}
    document.querySelectorAll('.inp').forEach(element => {
        if (element.id != 'Student_ID') {
            (element.value != '') ? data[element.id] = (element.value) : data[element.id] = null;
        }
    })
    const Student_ID = document.getElementById('Student_ID').value
    axios.post(`${host}/updateStuDetails`, { data, Student_ID })
        .then(response => {
            if (response.data['err']) {
                swal(response.data['err']['Title'], response.data['err']['Msg'], 'error')
            }
            if (response.data['Updated']) Personal_Details();
        })
}

var CountryObj;
async function setCountryDropDown() {
    await axios.get(`${host}/Countries`)
    .then(response=>{
        const Country = document.getElementById('Country')
        CountryObj = response.data
        for (item of Object.keys(CountryObj)) {
            const option = document.createElement('option')
            option.value = item
            option.text = item
            Country.appendChild(option)
        }
    })
}

async function setState(country = null) {
    if (country == null) {
        country = document.getElementById('Country').value
    }
    const State = document.getElementById('State')
    try {
        document.querySelectorAll('option.state').forEach(option => {
            State.removeChild(option)
        })
        const states = CountryObj[country]
        for (let i = 0; i < states.length; i++) {
            const option = document.createElement('option')
            option.className = 'state'
            option.value = states[i]
            option.text = states[i]
            State.appendChild(option)
        }
    } catch { }
}
// Mark Attendance Window Code
var captInterval
var videoStream
function MarkAttendance() {
    changeState('none', "mark-attendance-div")
    setTimeout(() => {
        changeState('flex', "mark-attendance-div")
    }, 100);
    changeState('none', "main-body-div")
    changeState('none', "pd-div")
    changeState('none', 'viewAttendance')
    changeState('none', 'complain')
    changeState('none', 'thankYouMessage')
    // Reset GUI on load
    document.getElementById('stuID').textContent = ''
    document.getElementById('btnText-captureImage').textContent = 'Mark Attendance'
    document.getElementById('submitAttendance').disabled = true;
    changeState('block', 'scan-line')
    document.getElementById('scanner').style.borderColor = '#0095ff'
    document.getElementById('att-h1').innerHTML = 'Marking Your Attendance...'
    const video = document.getElementById('video');
    // Access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoStream = stream;
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing webcam: ', error);
        });

    captInterval = setInterval(() => {
        captureImage()
    }, 2000)
}

// Function to capture an image and send it to the server
function captureImage() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a data URL (base64 image)
    const imageDataUrl = canvas.toDataURL('image/png');

    // Send the image data to the server
    sendImageToServer(imageDataUrl);

    // Create an image element and add it to the captured images section
    var imgUrl = imageDataUrl;
}

// Function to send image data to the server
let count = 0
let Detected = 0
function sendImageToServer(imageDataUrl) {
    document.getElementById('scanner').style.borderColor = '#0095ff'
    document.getElementById('att-h1').innerHTML = 'Detecting Your Face...'
    axios.post(`${Pyhost}/recognize_face`, { imageDataUrl })
        .then(response => {
            console.log(response.data['stuId'])
            if (response.data['stuId'] == null) {
                count++;
                // document.getElementById('att-h1').innerHTML = 'Can\'t Detected Face!'
                if (count > 10) {
                    document.getElementById('scanner').style.borderColor = 'red'
                    document.getElementById('att-h1').innerHTML = 'No Face Detected!'
                    CloseCamera('fail');
                    setTimeout(() => {
                        document.getElementById('att-h1').innerHTML = 'Restart...'
                        MarkAttendance()
                    }, 2000);
                }
            } else if (response.data['stuId'] != 'Undetected' && response.data['stuId'] != null) {
                document.getElementById('stuID').textContent = response.data['stuId']
                changeState('none', 'scan-line')
                document.getElementById('scanner').style.borderColor = '#00ff6e'
                if (document.getAnimations('att-h1')) {
                    CloseCamera('success')
                    document.getElementById('att-h1').innerHTML = 'Attendance Marked!'
                }
                document.getElementById('submitAttendance').disabled = false;
            } else {
                Detected++;
                if (Detected > 5) {
                    if (Detected % 3 == 0) {
                        document.getElementById('att-h1').innerHTML = 'Face Not Matched!'
                        document.getElementById('scanner').style.borderColor = 'red'
                    }
                }
            }
        }
        )
}

function CloseCamera(st) {
    setTimeout(() => {
        clearInterval(captInterval)
    }, 1000)
    if (videoStream) {
        // Get all video tracks from the stream
        const tracks = videoStream.getTracks();
        // Stop each track (including the video track)
        tracks.forEach(track => track.stop());
        changeState('none', 'scan-line')
        count = 0
    }
}

async function submitAttendance() {
    changeState('none', 'btnText-captureImage')
    changeState('flex', 'spinner-captureImage')
    const Student_ID = document.getElementById('stuID').textContent;
    // await fetch(`${Pyhost}/verify`).then(response => response.json())
    await axios.get(`${Pyhost}/verify`)
        .then(response => {
            if (!response.data['success']) {
                return
            }
            axios.post(`${host}/markAttendance`, { Student_ID })
                .then(response => {
                    changeState('none', 'spinner-captureImage')
                    changeState('flex', 'btnText-captureImage')
                    console.log(response)
                    if (response.data['err']) {
                        swal(response.data['err']['Title'], response.data['err']['Msg'], 'error')
                        return
                    }
                    document.getElementById('btnText-captureImage').innerHTML = 'Attendance Submitted!'
                    setTimeout(() => {
                        viewAttendance()
                    }, 2000);
                })
        })
}

// View Attendance Window
function viewAttendance() {
    changeState('none', 'viewAttendance')
    setTimeout(() => {
        changeState('block', 'viewAttendance')
    }, 100);
    changeState('none', "main-body-div")
    changeState('none', "pd-div")
    changeState('none', "mark-attendance-div")
    changeState('none', 'complain')
    changeState('none', 'thankYouMessage')
    CloseCamera('success')
}


function createTableRow(srNo, date, days, time, attendance) {
    return `
    <tr>
    <td>${srNo}</td>
    <td>${date}</td>
    <td>${days}</td>
    <td>${time}</td>
    <td>${attendance}</td>
    </tr>
    `;
}

function showAttendance() {
    const dayMap = { '0': "MONDAY", '1': "TUESDAY", '2': "WEDNESDAY", '3': "THURSDAY", '4': "FRIDAY", '5': "SATURDAY", '6': "SUNDAY" }
    const startDate = document.getElementById('fromDate').value
    const endDate = document.getElementById('toDate').value
    axios.post(`${host}/fetchAttendance`, { startDate, endDate })
        .then(response => {
            if (response.data['err']) {
                swal(response.data['err']['Title'], response.data['err']['Msg'], 'error')
            } else if (response.data['code']) {
                swal('Database Error', 'Server Error!', 'error')
            } else {

                const tableBody = document.getElementById('tableBody');
                while (tableBody.firstChild) {
                    tableBody.removeChild(tableBody.firstChild)
                }
                let i = 1
                response.data.forEach(row => {
                    tableBody.innerHTML += createTableRow(i, String(row['Date']).split('T')[0], dayMap[row['Day']], row['Time'], row['Attendance']);
                    i++
                })
            }
        })
}

// Complain Code
function complain() {
    changeState('none', "mark-attendance-div")
    changeState('none', "main-body-div")
    changeState('none', "pd-div")
    changeState('none', 'viewAttendance')
    changeState('none', 'thankYouMessage')
    changeState('none', 'complain')
    setTimeout(() => {
        changeState('block', 'complain')
    }, 100);
    CloseCamera('success')
    document.querySelectorAll('.complain-inp').forEach(data => {
        data.value = ''
    })
    document.getElementById('complaintForm').classList.remove('hidden')
    document.getElementById('thankYouMessage').classList.add('hidden')

    const complains = [
        "Hostel Issue",
        "Electricity Issue",
        "Water Issue",
        "Maintenance Issue",
        "Food Quality Issue",
        "Internet Issue",
        "Attendance Discrepancy",
        "Other"
    ]

    const Wardens = [
        "Abhishek Gupta",
        "Kedar",
        "Himalay Warden",
        "Shivalik Warden",
        "Arawali Warden",
        "Kaveri Warden",
        "Narmada Warden",
        "Godawari Warden",
        "Bhagirathi Warden"
    ]
    const complainType = document.getElementById('complaintType')
    complains.forEach(complain => {
        const option = document.createElement('option')
        option.value = complain
        option.text = complain
        complainType.appendChild(option)
    })

    const Warden = document.getElementById('warden')
    Wardens.forEach(warden => {
        const option = document.createElement('option')
        option.value = warden
        option.text = warden
        Warden.appendChild(option)
    })

}

async function submitComplain() {
    const complainData = {}
    document.querySelectorAll('.complain-inp').forEach(inp => {
        complainData[inp.id] = inp.value
    })
    console.log(complainData)
    const formData = new FormData();
    try {
        const fileData = document.getElementById('uploadDoc')
        console.log(JSON.stringify(complainData))
        formData.append('complainData', JSON.stringify(complainData))
        if (fileData.files[0]) formData.append('file', fileData.files[0]);
    } catch (error) {
        console.log(error)
    }
    await axios.post(`${host}/submitComplain`, formData)
        .then(response => {
            if (response.data['err']) {
                swal(response.data['err']['Title'], response.data['err']['Msg'], 'error')
            } else if (response.data['code']) {
                console.log(data)
                swal('Database Error', 'Server Error!', 'error')
            }
            if (response.data['success']) {
                document.getElementById('complain').style.display = 'none';
                document.getElementById('thankYouMessage').style.display = 'block';
            }
        })

}
