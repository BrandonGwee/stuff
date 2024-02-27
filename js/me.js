document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM content fully loaded and parsed");
    greeting();
})

function greeting() {
    let greet_message = ""
    const now = new Date();
    const hours = now.getHours();

    let time_of_day = "";

    switch(hours){
        case (0 < hours || hours < 11): time_of_day = "morning"; break;
        case (12 < hours || hours < 16): time_of_day = "afternoon"; break;
        case (16 < hours || hours < 24): time_of_day = "evening"; break;
    }
    
    console.log(time_of_day)

    greet_message = `Good ${time_of_day}, I'm Brandon.`;

    document.getElementById('time').innerHTML = greet_message;
}