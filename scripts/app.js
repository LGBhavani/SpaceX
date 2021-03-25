// api url
const api_url =
    "https://api.spaceXdata.com/v3/launches?limit=100";
var lYear = '';
var btn_text = '';
var launched = "false";
var landed = "false";
var launch_years_array = [];

// Defining async function
async function getapi(url) {
    let url_mod = url;
    if (launched === "true") {
        url_mod += "&launch_success=true";
    }
    if (landed === "true") {
        url_mod += "&land_success=true";
    }
    if (btn_text !== null) {
        url_mod += "&launch_year=" + btn_text;
    }

    // Storing response
    const response = await fetch(url_mod);

    // Storing data in form of JSON
    var data = await response.json();
    show(data);
}

// Calling that async function
getapi(api_url);


function launchYear(clicked_object) {
    lYear = document.getElementById(clicked_object);
    btn_text = lYear.textContent || lYear.innerText;
    getapi(api_url);
}

function launchSuccess() {
    launched = "true";
    getapi(api_url);
}
function launchFailure() {
    if (launched === "true") {
        launched = "";
    } else {
        launched = "false";
    }
    getapi(api_url);
}
function landingSuccess() {
    landed = "true";
    getapi(api_url);
}

function landingFail() {
    landed = "false";
    getapi(api_url);
}

// Function to show SpaceX data
function show(data) {
    let missions = '';
    let launch_year = [];

    for (let r of data) {
        launch_year.push(r.launch_year);
        missions += `<div class= "container">
        <div class = "image_div"><img class= "image" src="${r.links.mission_patch}" alt=${r.mission_name}></div>
        <div><p style="color:blue;"><b>${r.mission_name} #${r.flight_number}</b> </p></div>
        <div><p><b>Mission Ids:</b> </p></div>
        <div><p><b>Launch Year:</b> ${r.launch_year}</p></div>
        <div><p><b>Successful Launch:</b> ${r.launch_success}</p></div>
        <div><p><b>Successful Landing:</b> </p></div>
        </div>`;
    }
    if (launch_years_array.length == 0) {
        launch_years_array = [...new Set(launch_year)];

    }

    let x = `<div class="hero_section">
     ${missions}
</div>`

    let even_index_years = '';
    let odd_index_years = '';
    let i = 0;
    for (let year of launch_years_array) {
        if (i%2 == 0) {
            even_index_years += `
   <div class="left_column"> <button id="myButton${year}" onclick = "launchYear(this.id)" class= "unique">${year}</button> </div>
  `     } else {
            odd_index_years += `
   <div class="right_column"> <button id="myButton${year}" onclick = "launchYear(this.id)" class= "unique">${year}</button> </div>
  `
        }
        i++;
    }
    let left_column = `<div class="left_column"> ${even_index_years} </div>`
    let right_column = `<div class="right_column"> ${odd_index_years} </div>`
    let columns = `<div class="columns"> ${left_column} ${right_column}</div>` 


    document.getElementById("launch_years").innerHTML = columns;
    document.getElementById("launch_data").innerHTML = x;


}