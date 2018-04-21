function loadMenus (loc, d) {
	if (d) { 
		var date = new Date(d[0],d[1], d[2]);
		day = d[2];
		monthnum = Number(d[1]);
		year = d[0];
	} else {
		// Default date is today
		date = new Date();
		day = date.getDate(); 
		monthnum = date.getMonth() + 1;
		year = date.getFullYear();
	}
	if (loc == null) { // Default Location
	   loc = "Carm"; 
	}
	selectedDate = monthName(monthnum - 1) + " " + day + ", " + year;
	console.log("selectedDate: " + selectedDate);

	request = new XMLHttpRequest();
	link = "https://tuftsdiningdata.herokuapp.com/menus/" + loc + "/" + String(day) + "/" + String(monthnum) + "/" + String(year)
	console.log("link " + link);
	request.open("GET", link, true);
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			locationDiv = document.getElementById("location");
			locationString = "<h1> Menus for " + loc + " on: " + selectedDate + "</h1>";
			locationDiv.innerHTML = locationString;
			breakfastDiv = document.getElementById("breakfast");
			lunchDiv = document.getElementById("lunch");
			dinnerDiv = document.getElementById("dinner");
			theString = request.responseText;
			messages = JSON.parse(theString);

			breakfastString = "";
			try {
				if (loc == "Carm" || loc == "Dewick") {
						for (count = 0; count < (Object.keys (messages.data.Breakfast)).length; count++) {
							breakfastString += "<h3>" + ((Object.keys (messages.data.Breakfast))[count]) + "</h3>";
							for (counter = 0; counter < (Object.values (messages.data.Breakfast))[count].length; counter++) {
								breakfastString += "<p>" + (Object.values (messages.data.Breakfast))[count][counter] + "</p>";
							}
						}
					if (breakfastString == "") {
						breakfastString += "No breakfast at " + loc + " today.";
					}
					breakfastDiv.innerHTML = breakfastString;

					lunchString = "";
					for (count = 0; count < (Object.keys (messages.data.Lunch)).length; count++) {
						lunchString += "<h3>" + ((Object.keys (messages.data.Lunch))[count]) + "</h3>"
						for (counter = 0; counter < (Object.values (messages.data.Lunch))[count].length; counter++) {
							lunchString += "<p>" + (Object.values (messages.data.Lunch))[count][counter] + "</p>";
						}
					}
					lunchDiv.innerHTML = lunchString;

					dinnerString = "";
					for (count = 0; count < (Object.keys (messages.data.Dinner)).length; count++) {
						dinnerString += "<h3>" + ((Object.keys (messages.data.Dinner))[count]) + "</h3>"
						for (counter = 0; counter < (Object.values (messages.data.Dinner))[count].length; counter++) {
							dinnerString += "<p>" + (Object.values (messages.data.Dinner))[count][counter] + "</p>";
						}
					}
					dinnerDiv.innerHTML = dinnerString;
				} else {
					dailyString = ""; 
					var dailySelect = (Object.getOwnPropertyNames(messages.data))[0];
					for (count = 0; count < (Object.keys (messages.data[dailySelect])).length; count++) {
							dailyString += "<h3>" + ((Object.keys (messages.data[dailySelect]))[count]) + "</h3>";
							for (counter = 0; counter < (Object.values (messages.data[dailySelect]))[count].length; counter++) {
								dailyString += "<p>" + (Object.values (messages.data[dailySelect]))[count][counter] + "</p>";
							}
						}
					breakfastDiv.innerHTML = dailyString;
					lunchDiv.innerHTML = "Daily selections can be found under Breakfast tab";
					dinnerDiv.innerHTML = "Daily selections can be found under Breakfast tab";
				}
			} catch (error) {
				errorString = "No menu data available for this meal, date, and location search. Sorry! Try a new search or check the Tufts Dining website for more information.";
				if (breakfastString == "") {
					breakfastDiv.innerHTML = errorString;
					if (lunchString == "") {
						lunchDiv.innerHTML = errorString;
						if (dinnerString = "") {
							dinnerDiv.innerHTML = errorString;
						}
					}
				}
			}
			
		}
	};
	request.send();
}

function changeLocation() {
	var LocationsList = document.getElementById("LocationsList");
	var selectedLoc = LocationsList.options[LocationsList.selectedIndex].text;
	var Calendar = (document.querySelector('input[type="date"]')).value;

	if (Calendar) {
		loadMenus(selectedLoc, Calendar.split("-"));
	}
	else {
	    loadMenus(selectedLoc, null);
	}
}


function monthName(num) {
	var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[num];
}

function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}
function clicked() {
	if (document.getElementById("fb").style.visibility != "hidden") {
		document.getElementById("fb").style.visibility = "hidden";
	} else {
		document.getElementById("fb").style.visibility = "visible";
	}
}
// LATE NIGHT????
			//console.log("JSON: " + (Object.values (messages.data.Breakfast))[0]);

			// console.log("theString: " + theString);
			// console.log("messages: " + messages)
			// console.log("... : " + messages.data.Lunch.PIZZA)
			//console.log("messages entries: " + Object.entries(messages));
			// d1 = theString.data;
			// console.log("d1: " + d1);
			// var data = Object.entries(messages)[1];
			// console.log("data: " + data);
			// console.log("messages: " + Object.entries(messages)[1]);
			// var dinner = Object.values(Object.values(data)[1]);
			// console.log("dinner: " + dinner);
			// console.log("messages: " + Object.entries((Object.entries(messages)[1])[1]));
			// outputString = "";
			// for (count = 0; count < messages[data].length; count++) {
			// 	outputString += "<p>" + messages[data][count] + "</p>"
			// }
			//outputString = messages[data];
			//outputDiv.innerHTML = outputString;

					// if ((date.getDay() == 6 && loc == "Carm") || (date.getDay() == 0 && loc == "Dewick")) {
					// 	breakfastString += "No breakfast at " + loc + " today.";
					// } else {
			// outputDiv.innerHTML = json;
			//console.log("selectedLoc: " + selectedLoc);
	//var Calendar = document.getElementById("Calendar");
// var dateArray = Calendar.split("-");
	//var selectedDate = new Date(dateArray[0],dateArray[1], dateArray[2]);

	// loadMenus(selectedLoc, dateArray);