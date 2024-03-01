document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM content fully loaded and parsed");
    greeting();
})

function greeting() {
    let greet_message = ``;
    const now = new Date();
    const hours = now.getHours();

    let time_of_day = "";

    if(-1 < hours && hours < 12) {
        time_of_day = "Morning";
    } else if (11 < hours && hours < 17) {
        time_of_day = "Afternoon";
    } else if (16 < hours && hours < 24) {
        time_of_day = "Evening";
    }

    console.log(hours)

    greet_message = `Good ${time_of_day}, I'm Brandon.`;

    document.getElementById('time').innerHTML = greet_message;
}