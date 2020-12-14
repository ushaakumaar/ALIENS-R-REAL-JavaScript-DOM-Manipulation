// from data.js
var tableData = data;

/***************************************************
SELECT ALL REQUIRED HTML ELEMENTS
****************************************************/

// select the table body
var tableBody = d3.select("tbody");

// Select the dropdown elements
var shapeDropDown = d3.select("#shape-select");
var countryDropDown = d3.select("#country-select");
var stateDropDown = d3.select("#state-select");
var cityDropDown = d3.select("#city-select");

// Select the input elements
var inputDate = d3.select("#datetime");
var inputCity = d3.select("#city");
var inputState = d3.select("#state");

// Select the buttons
var button = d3.select("#filter-btn");
var clearButton = d3.select("#clear-filter-btn");

// Select the form
var form = d3.select("form");

/***************************************************
USER DEFINED FUNCTIONS
****************************************************/

// function to load table data
function loadTableData(ufoSightingsArray) {
    if (ufoSightingsArray.length === 0) {
        var row = tableBody.append("tr");
        var cell = row.append("td");
        cell.attr("colspan", "7");
        cell.text("No UFO Sightings match the provided search criteria!!");
    } else {
        ufoSightingsArray.forEach((ufoSighting) => {
            var row = tableBody.append("tr");
            Object.entries(ufoSighting).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        })
    }
};

// function to complete the event handler function for the filter button
// filter data based on the search criteria provided by user
function filterData() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value property of the input elements
    var inputDateValue = inputDate.property("value");
    var inputCountryValue = countryDropDown.property("value");
    var inputStateValue = stateDropDown.property("value");
    var inputCityValue = cityDropDown.property("value");
    var inputShapeValue = shapeDropDown.property("value");

    // filter the table data based on the specified filter criteria 
    var filteredData = tableData;
    if (inputDateValue != "") {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.datetime === inputDateValue);
        console.log("Filtered by Date");
    }
    if (inputCityValue != "" && filteredData.length > 0) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.city === inputCityValue);
        console.log("Filtered by City");
    }
    if (inputStateValue != "" && filteredData.length > 0) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.state === inputStateValue);
        console.log("Filtered by State");
    }
    if (inputCountryValue != "" && filteredData.length > 0) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.country === inputCountryValue);
        console.log("Filtered by Country");
    }
    if (inputShapeValue != "" && filteredData.length > 0) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.shape === inputShapeValue);
        console.log("Filtered by Shape");
    }

    // remove all rows from the table body
    tableBody.html("");

    // load the table body with filtered data
    loadTableData(filteredData);
};

// function to validate the date
function isValidDate(d) {
    return !isNaN((new Date(d)).getTime());
}

/***************************************************
LOAD TABLE DATA - ON PAGE LOAD
****************************************************/
// Load table data on page load
loadTableData(tableData);

/***************************************************
LOAD SHAPE & COUNTRY DROP DOWN - ON PAGE LOAD
****************************************************/
// Create a array of unique shapes from the table data
var shapes = tableData.map(function(ufoSightings) {
    return ufoSightings.shape;
});
console.log(shapes);
var unique_shapes = d3.set(shapes).values();
console.log(unique_shapes);

// Load the Shape dropdown list
unique_shapes.forEach(shape => {
    var cell = shapeDropDown.append("option");
    cell.property("value", shape).text(shape);
});

// Create a array of unique countries from the table data
var countries = tableData.map(function(ufoSightings) {
    return ufoSightings.country;
});
console.log(countries);
var unique_countries = d3.set(countries).values();
console.log(unique_countries);

// Load the Country dropdown list
unique_countries.forEach(country => {
    var cell = countryDropDown.append("option");
    cell.property("value", country).text(country);
});

/***************************************************
EVENT HANDLERS
****************************************************/

// Filter Button event handlers 
button.on("click", filterData);
form.on("submit", filterData);

// Clear Button event handler
clearButton.on("click", function() {
    inputDate.property('value', "");
    countryDropDown.property('value', "");
    stateDropDown.property('value', "");
    cityDropDown.property('value', "");
    shapeDropDown.property('value', "");
    // Disable State & City dropdowns
    stateDropDown.attr("disabled", "disabled").style("background", "gray");
    cityDropDown.attr("disabled", "disabled").style("background", "gray");
    loadTableData(tableData);
});

// Date Event Handler - Validate the date
inputDate.on("change", function() {
    var dateEntered = this.value;
    if (!isValidDate(dateEntered)) {
        console.log("Date Invalid");
        var dateErrorPTag = d3.select(".date-error");
        dateErrorPTag.text(`${dateEntered} - Invalid Date!`);
        inputDate.property('value', "");
        inputDate.node().focus();
    } else {
        var dateErrorPTag = d3.select(".date-error");
        dateErrorPTag.text(``);
    }
});