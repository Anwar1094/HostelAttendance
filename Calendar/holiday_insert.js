const XLSX = require("xlsx");
const mysql = require("mysql2");

// **Create MySQL Pool**
const pool = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12775852',
    password: 'ypaP8rqgqS',
    database: 'sql12775852',
    connectionLimit: 10
}).promise();  // Use promise-based pool

// **Function to Read & Clean Excel Data**
const cleanArrayData = (filePath) => {
    try {
        const workbook = XLSX.readFile(filePath);
        if (workbook.SheetNames[0] == "Holidays") {
            const sheetName = workbook.SheetNames[0];
            let jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
            // **Clean Data (Trim, Normalize Spaces)**
            jsonData = jsonData
                .map(row => row.map(cell => (typeof cell === "string" ? cell.trim().replace(/\s+/g, " ") : cell)))
                .filter(row => row.length > 0 && row[0] !== undefined); // Remove empty rows
            return jsonData;
        }
        else {
            console.log("Nmae of sheet should be Holidays not", workbook.SheetNames[0]);
        }
    } catch (error) {
        console.error("Error cleaning data:", error.message);
        return [];
    }
};

// **Function to Insert Data into MySQL**
const monthNames = {
    JANUARY: 0, FEBRUARY: 1, MARCH: 2, APRIL: 3, MAY: 4, JUNE: 5,
    JULY: 6, AUGUST: 7, SEPTEMBER: 8, OCTOBER: 9, NOVEMBER: 10, DECEMBER: 11
};

const insertData = async (data, yrr) => {
    try {
        for (const element of data) {
            if (element[4] > 1) {
                if (element[2].length <= 16) {          // If both dates are in the same month with onetime month
                    let split_dates = element[2].split(/[-–—~/|→…]/).map(part => part.trim())
                    let [startDay, enddate, Month] = [split_dates[0], ...split_dates[1].split(" ")]
                    for (let i = Number(startDay); i < Number(enddate) + 1; i++) {
                        console.log(element[1], i, monthNames[Month.toUpperCase()], element[5], (startDay.padStart(2, "0") + " " + Month.slice(0, 3).toUpperCase() + " - " + enddate.padStart(2, "0") + " " + Month.slice(0, 3).toUpperCase()))
                        await pool.query(`INSERT INTO Holidays (festival, date, month, year, datewithmonth) VALUES (?, ?, ?, ?, ?)`, [element[1], i, (monthNames[Month.toUpperCase()]) + 1, element[5], (startDay.padStart(2, "0") + " " + Month.slice(0, 3).toUpperCase() + " - " + enddate.padStart(2, "0") + " " + Month.slice(0, 3).toUpperCase())]);
                    }
                }
                else if (element[2].length > 16) {                       //30 October – 2 November
                    let dateRange = element[2].split(/[-–—~/|→…]/).map(part => part.trim());
                    let [startDay, startMonth] = dateRange[0].split(" ");
                    let [endDay, endMonth] = dateRange[1].split(" ");
                    // console.log(startDay,startMonth,endDay,endMonth)
                    const getDaysInMonths = (year) => {
                        return [
                            31,
                            (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28, // Feb
                            31, 30, 31, 30, 31, 31, 30, 31, 30, 31
                        ];
                    };
                    let startMonthIndex = monthNames[startMonth.toUpperCase()];
                    let endMonthIndex = monthNames[endMonth.toUpperCase()];
                    // Loop through the date range spanning multiple months
                    if (startMonthIndex === endMonthIndex) {
                        // If both dates are in the same month
                        for (let i = Number(startDay); i <= Number(endDay); i++) {
                            console.log(element[1], Number(i), (monthNames[endMonth.toUpperCase()]) + 1, element[5], (startDay.padStart(2, "0") + " " + startMonth.slice(0, 3).toUpperCase() + " - " + endDay.padStart(2, "0") + " " + startMonth.slice(0, 3).toUpperCase()))
                            await pool.query(`INSERT INTO Holidays (festival, date, month, year, datewithmonth) VALUES (?, ?, ?, ?, ?)`, [element[1], Number(i), (monthNames[endMonth.toUpperCase()]) + 1, element[5], (startDay.padStart(2, "0") + " " + startMonth.slice(0, 3).toUpperCase() + " - " + endDay.padStart(2, "0") + " " + startMonth.slice(0, 3).toUpperCase())]);
                        }
                    } else {            // If both dates are in the different month
                        for (let i = Number(startDay); i <= getDaysInMonths(yrr)[startMonthIndex]; i++) {
                            console.log(element[1], Number(i), (monthNames[startMonth.toUpperCase()]) + 1, element[5], [[startDay.padStart(2, "0") + " " + (startMonth.slice(0, 3)).toUpperCase()], [endDay.padStart(2, "0") + " " + (startMonth.slice(0, 3)).toUpperCase()]].join(" - "))
                            await pool.query(`INSERT INTO Holidays (festival, date, month, year, datewithmonth) VALUES (?, ?, ?, ?, ?)`, [element[1], Number(i), (monthNames[startMonth.toUpperCase()]) + 1, element[5], [[startDay.padStart(2, "0") + " " + (startMonth.slice(0, 3)).toUpperCase()], [endDay.padStart(2, "0") + " " + (endMonth.slice(0, 3)).toUpperCase()]].join(" - ")]);
                        }
                        for (let i = 1; i <= Number(endDay); i++) {
                            console.log(element[1], Number(i), (monthNames[endMonth.toUpperCase()]) + 1, element[5], [[startDay.padStart(2, "0") + " " + (startMonth.slice(0, 3)).toUpperCase()], [endDay.padStart(2, "0") + " " + (startMonth.slice(0, 3)).toUpperCase()]].join(" - "))
                            await pool.query(`INSERT INTO Holidays (festival, date, month, year, datewithmonth) VALUES (?, ?, ?, ?, ?)`, [element[1], Number(i), (monthNames[endMonth.toUpperCase()]) + 1, element[5], [[startDay.padStart(2, "0") + " " + (startMonth.slice(0, 3)).toUpperCase()], [endDay.padStart(2, "0") + " " + (endMonth.slice(0, 3)).toUpperCase()]].join(" - ")]);
                        }
                    }
                }
            }
            else {          // If only date and month
                let [date, month] = element[2].split(" ");
                console.log(element[1], Number(date), monthNames[month.toUpperCase()], element[5], date.padStart(2, "0"), month.slice(0, 3).toUpperCase())
                await pool.query(`INSERT INTO Holidays (festival, date, month, year, datewithmonth) VALUES (?, ?, ?, ?, ?)`, [element[1], Number(date), (monthNames[month.toUpperCase()]) + 1, element[5], date.padStart(2, "0") + " " + month.slice(0, 3).toUpperCase()]);
                // monthNames[Month.toUpperCase()]
            }
        };
        //         for (const row of data) {
        //             console.log(row)
        //             const [SlNo, Festival, Date, Year, Day, datewithmonth] = row;
        // // 
        //             // **Check if row is valid before inserting**
        //             if (!SlNo || !Festival || !Date || !Day || !Year || !datewithmonth) {
        //                 console.warn("⚠️ Skipping invalid row:", row);
        //                 continue;
        //             }
        // // 
        //             const query = `INSERT INTO calender VALUES (?, ?, ?, ?, ?, ?)`;
        //             await pool.query(query, [SlNo, Festival, Date, Year, Day, datewithmonth]);
        //             await pool.query(`INSERT INTO holidays VALUES (?, ?, ?)`, [SlNo, Festival,STR_TO_DATE((Date+Year), '%d %M %Y')]) ;
        //             console.log("Inserted:", row);
        //         }
    } catch (error) {
        console.error("❌ Error inserting data:", error.message);
    } finally {
        pool.end(); // Close pool after inserting
    }
};
// **Read, Clean, and Insert Data**
(async () => {
    const cleanedArray = cleanArrayData("../src/5434imguf_list-of-holidays-2025 (1).xlsx");
    // console.log("📌 Cleaned Data:", cleanedArray);
    await insertData(cleanedArray);
})();
