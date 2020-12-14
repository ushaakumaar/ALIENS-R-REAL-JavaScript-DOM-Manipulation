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