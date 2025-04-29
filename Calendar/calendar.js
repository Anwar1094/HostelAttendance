let holidaysByYear = []; // 2D array: years → months → holidays
// async function fetchData() {
//     try {
//         const response = await fetch("http://localhost:3000/getData");
//         const data = await response.json();
//         data.forEach(({ id, festival, date, month, year, datewithmonth }) => {
//             if (!year || !month || !date || !festival) {
//                 console.warn("Skipping invalid data:", { id, festival, date, month, year });
//                 return;
//             }
//             let yearIndex = year - 2019; // Adjust index to start from 2019
//             // Ensure the yearIndex exists in the array
//             if (!holidaysByYear[yearIndex]) {
//                 holidaysByYear[yearIndex] = Array.from({ length: 12 }, () => []);
//             }
//             // Ensure the month array exists before pushing data
//             if (!holidaysByYear[yearIndex][month - 1]) {
//                 holidaysByYear[yearIndex][month - 1] = [];
//             }
//             // Push holiday details inside the respective month
//             holidaysByYear[yearIndex][month - 1].push([festival, String(date).padStart(2, "0"), datewithmonth]);
//         });

//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

//new code
async function fetchData() {
    try {
        const response = await fetch(`${process.env.HOST}/getData`);
        const data = await response.json();
        console.log(data)
        data.forEach(({ id, festival, date, month, year, datewithmonth }) => {
            if (!year || !month || !date || !festival) {
                console.warn("Skipping invalid data:", { id, festival, date, month, year });
                return;
            }
            let yearIndex = year - 2019;
            if (!holidaysByYear[yearIndex]) {
                holidaysByYear[yearIndex] = Array.from({ length: 12 }, () => []);
            }

            
            holidaysByYear[yearIndex][month - 1].push([festival, String(date).padStart(2, "0"), datewithmonth]);
        });

        // Now that data is available, generate the calendar
        generateCalendar(currentMonth.value, currentYear.value);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


async function main() {
    await fetchData();  // Wait until data is fetched

    generateCalendar(currentMonth.value, currentYear.value); 

}
main();



//




const isLeapYear = (year) => {
    return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    );
};
const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');
const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');
const holidayformatediv = document.querySelector('.holiday-formate-div');




month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
    holidayformatediv.classList.remove('showtime');
    holidayformatediv.classList.add('hidetime');
    document.querySelector('.holiday-formate-label-div').classList.add('hidetime');
    document.querySelector('.holiday-value-div').classList.add('hidetime');
    document.querySelector('.holiday-value-label').classList.add('hidetime');
    // holidayformatediv.style.display='none';
};

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    let currentDate = new Date();

    month_picker.innerHTML = month_names[month];
    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');
        day.id = "calendar-days" + (i + 1);
        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1;
            if (i - first_day.getDay() + 1 === currentDate.getDate() &&
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth()
            ) {
                day.classList.add('current-date');
            }
        }
        calendar_days.appendChild(day);
    }

    let yearIndex = year - 2019;
    let holiday_label_date = [];
    let holidayList = document.getElementById("holidays-downof-calendar"); // UL element

    //Clear previous holidays before adding new ones
    holidayList.innerHTML = "";

    if (holidaysByYear[yearIndex] && holidaysByYear[yearIndex][month]) {
        //   (holidaysByYear[yearIndex][month])
        if (holidaysByYear[yearIndex][month].length === 0) {
            
            let li = document.createElement("li"); 
            li.textContent = `No Holidays!`;
            li.style.listStyle = "none";
            holidayList.appendChild(li); 
        }
        else {


            holidaysByYear[yearIndex][month].forEach(all_holidays_of_month => {
                document.getElementById(`calendar-days${Number(all_holidays_of_month[1]) + first_day.getDay()}`).style.color = "red";
                // console.log(all_holidays_of_month[0].length)
                if (!holiday_label_date.includes(all_holidays_of_month[0])) {
                    holiday_label_date.push(all_holidays_of_month[0], all_holidays_of_month[2]);
                }
            });
            //      Loop through `holiday_label_date` and create LI elements
            for (let i = 0; i < holiday_label_date.length; i += 2) {
                let li = document.createElement("li"); // ✅ Create new LI inside loop
                li.textContent = `${holiday_label_date[i]} | ${holiday_label_date[i + 1]}`;
                holidayList.appendChild(li); // ✅ Append each LI to UL
            }
        }



        // console.log(holiday_label_date);
    }



};


let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;

    month_list.append(month);
    month.onclick = () => {

        if (month_list.classList.contains('show')) {
            month_list.classList.remove('show');
            month_list.classList.add('hide');
        } else {
            month_list.classList.remove('hide');
            month_list.classList.add('show');
        }
        currentMonth.value = index;
        generateCalendar(currentMonth.value, currentYear.value);
        month_list.classList.replace('show', 'hide');



        dayTextFormate.classList.remove('hideTime');
        dayTextFormate.classList.add('showtime');
        timeFormate.classList.remove('hideTime');
        timeFormate.classList.add('showtime');
        dateFormate.classList.remove('hideTime');
        dateFormate.classList.add('showtime');
        // holidayformatediv.style.display='block';
        holidayformatediv.classList.remove('hidetime');
        holidayformatediv.classList.add('showtime');
        document.querySelector('.holiday-formate-label-div').classList.remove('hidetime');
        document.querySelector('.holiday-formate-label-div').classList.add('showtime');
        document.querySelector('.holiday-value-div').classList.remove('hidetime');
        document.querySelector('.holiday-value-div').classList.add('showtime');
        document.querySelector('.holiday-value-label').classList.remove('hidetime');
        document.querySelector('.holiday-value-label').classList.add('showtime');
    };
});

(function () {
    month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
};
const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
    const timer = new Date();
    const option = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
        2,
        '0'
    )}:${`${timer.getMinutes()}`.padStart(
        2,
        '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
}, 1000);
