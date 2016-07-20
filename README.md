# weather-master
A cross platform weather application built using PhoneGap


![Alt text](/screenshot1.JPG?raw=true "Screenshot #1: Warm Weather")
![Alt text](/screenshot2.JPG?raw=true "Screenshot #2: Cold Weather")
![Alt text](/screenshot3.JPG?raw=true "Screenshot #3: Night Time")


## Third party libraries and Plugins
* Chart.js
* jQuery-mmenu
* Cordova LocalNotification Plugin

## Technologies
* HTML5
* CSS
* Javascript
* Node.js
* Phonegap
* MySQL

========
##Retrieving and Displaying Data
Live weather data is displayed on the main screen as soon as the app is opened. This data is pulled from a weather resource, a live weather station located in Galway, and added to a table named History in a MySQL database. 

When the application is opened on a user's phone, it automatically calls a function to get the current weather data: 
```
<body onLoad="getWeatherData()">
```
From this, the getWeatherData() function is called, which sends an XMLHttpRequest to a Node.js server that runs a script which pulls the live weather details from the History table and returns them in the form of JSON objects.
```javascript
function getWeatherData(){
request = new XMLHttpRequest();
request.onreadystatechange = statechange;
request.open("GET", "http://140.203.204.104:8706/liveData",true);
request.send(null);
setTimeout("getWeatherData()", 10000);
}
```
The XMLHttpRequest sent to the server (address highlighted in yellow), runs a script called liveData. The liveData script connects to the existing MySQL database and runs a query on it that selects all data from the History table order by upDateMinute, a field within the table that stores the update time. The SQL query also contains a limit of one field, so that data pulled from the query will be the most reason weather data added to the table, which is the current condition.
```javascript
var mysql = require('mysql');
var express = require('express');
var app = express();
var connection = mysql.createConnection({
host:'danu6.it.nuigalway.ie',
database:'mydb1408',
user:'mydb1408lm',
password:'xi5kej'
});
app.get('/liveData', function(req,res){
connection.query('SELECT * FROM History ORDER BY upDateMinute
DESC LIMIT 1 ', function(err, rows,fields){
if (err) throw err;
res.send(rows[0]);
});
});
app.listen(8706,function(){
console.log('listening');
});
```
After querying the data, the script the returns the entire row to the client-side's getWeatherData() function.

From there, a function called statechange() is called. This JavaScript function handles the data returned from the server-side script and dynamically updates the display of data. The statechange() function stores the response text as a JSON object, so that it can store each individual object as a variable.
```javascript
function statechange(){
if (request.readyState == 4 && request.status == 200){
weatherData = request.responseText;
jsObject = JSON.parse(weatherData);
```
JSON objects are accessed by using the name given to them in the database.
```javascript
temp = jsObject["Temp"];
rain=jsObject["rainFall"];
pressure=jsObject["Barometer"];
bPressure=jsObject["Barometer"];
windSpeed=jsObject["windSpeed"];
windDirection=jsObject["WindDirection"];
relHumidity=jsObject["Humidity"];
gust = jsObject["gust"];
solar=jsObject["totalSolar"];
var sr=jsObject["todaySR"];
var ss=jsObject["todaySS"];
```
The statechange() function then updates uses the Document Object Model to update the display with the new variables.
```javascript
document.getElementById('txtTemp').innerHTML = temp;
document.getElementById('txtRain').innerHTML=rain;
document.getElementById('txtPressure').innerHTML=pressure;
document.getElementById('txtWindSpeed').innerHTML=windSpeed;
document.getElementById('txtWindDirection').innerHTML=windDirection
document.getElementById('txtRelHumidity') .innerHTML=relHumidity;
document.getElementById('txtGust').innerHTML=gust;
document.getElementById('txtSol').innerHTML=solar;
document.getElementById('txtTime').innerHTML=time;
```
==========================
##Device Notifications
Weather alerts are sent to users who choose to receive them by sending a local notification straight to
the phone when a particular weather circumstance exists. Because this app is a hybrid
application using PhoneGap, it does not have a built in accessibility to all native features of mobile
devices, including sending local notifications.

PhoneGap supports a wide range of third-party plugins that enable the build to access native
features. To implement weather alerts using local notifications, a Cordova LocalNotification Plugin
first had to be added to the project. This plugin is supported on all platforms, including iOS, Android, and Windows 8.

This is done by adding the following code to the project's config.xml file:
```
<gap:plugin name="de.appplant.cordova.plugin.local-notification" version="0.7.0"/>
```

Apps built using PhoneGap are set up by using a config.xml file, which allows developers to easily
specify metadata about their application. Such metadata includes a name and description of the app, its
preferences such as its orientation scrolling abilities, icons and splash screens, and plugins.

Upon  installation of the plugin, a JavaScript file is added to the project, and must be included
the main HTML page (index.html).
```
<script src="local-notification.js"></script>
```

The plugin creates the an object window.plugin.notification.local with the following methods to add ,
cancel, and handle notifications. Within this project, the methods to add notifications have been placed
inside JavaScript functions so they can be called appropriately when needed.
```javascript
<script>
function addEvent()
{
window.plugin.notification.local.add({ message: 'Temp is less than
'+localStorage.tempVar+' degrees!' });
}
function addWind()
{
window.plugin.notification.local.add({ message: 'Wind Speed is greater than
'+localStorage.windVar+' mph!' });
}
function addRain()
{
window.plugin.notification.local.add({ message: 'Rain fall is greater
than '+localStorage.rainVar+' !' });
}
function addBPressure()
{
window.plugin.notification.local.add({ message: 'Barometric Pressure
has changed by'+localStorage.bPressVar + “mBar!”});
}
</script>
```

Once the window.plugin.notification.local.add method is executed, a local notification will be sent to
the user's device even if the app is not running in the foreground. Thus allowing users to receive
notifications on current weather conditions at all times.

==========================
##Posting Dynamically Generated Tweets
Twitter offers a small widget that can be embedded inside a webpage and used to generate a pre-defined 'Tweet'.

The Tweet Button was included in this application by adding a JavaScript and an HTML anchor to the page.
```
<a id="link1" href="http://twitter.com/share" class="twitter-share-button"
data-text="The current temp in Galway is " data-via="Weather_NUIG">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)
[0];if(d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=
"https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}
(document,"script","twitter-wjs");</script>
```

Unfortunately, using Twitters pre-defined script to add properties to the tweet does not allow for the content of a tweet to by dynamically generated via the webpage. This is because as soon as the page is loaded, the Twitter Widget generates the tweet. 

In this case, when the tweet button is pressed, it cannot update the text to reflect the current weather conditions.
In order to fix this problem and allow dynamic content to be added to the tweet, the Javascript function that sets the text of a tweet needs to be modified to the following: 
```javascript
<script type="text/javascript">
tweetTemp=getTemp();//var maxscore=temp; //temp = jsObject["Temp"];
var elem = document.getElementById("link1");
elem.setAttribute("data-text", elem.getAttribute("data-text") +
tweetTemp);
</script>
```
This piece of Javascript gets the tweet button element, “link1”, and concatenates the current temperature to the existing data text. The only way to retrieve the live temperature was to call a function that explicitly retrieved the temperature.
```javascript
function getTemp(){
var tweetTemp=localStorage.currentTemp;
return tweetTemp;
}
```
========
##Generating Graphs
Average weather can be found on the Trends screen, which can be navigated to via the menu. The average data, like live data, is pulled from a table in the MySql database and accessed using a script running on the server. More specifically, the data is pulled from the HourAvg table, which contains the hourly averages that have been calculated for all weather conditions in the past 24 hours.
When a weather trend is selected to be graphed, a JavaScript function is called which sends an XMLHttpRequest to another script running on the Node.js server.
```javascript
function getHourAvg(){
request = new XMLHttpRequest();
request.onreadystatechange = change;
request.open("GET”,"http://140.203.204.104:8706/hourAve.txt",
true);
request.send(null);
}
```
The request is then sent from the client-side's JavaScript function to the server, which is listening for requests, and runs the script defined in the functions request method, which is hourAve.txt. The hourAve.txt script queries the HourAvg table in the database for all hourly averages in the past 24 hours.
```javascript
app.get('/hourAve.txt', function(req,res){
connection.query('SELECT * FROM HourAvg ORDER BY Time ASC LIMIT 24 ',
function(err, rows,fields){
if (err) throw err;
res.send(rows[0]);
});
});
```
The server-side script then sends all of the rows back to the getHourAvg() function as a JSON object. getHourAvg() then calls another function to handle the state change of the returned data. This separate function loops through the responding JSON object 24 times and stores all of the data elements in an array (as seen below in green). The data that is stored in this array will be used as points on the graph when it is drawn on the HTML5 canvas.

It is important to note that this is where the user's graph selection comes into user. Because the hourAve.txt script returns all rows, the client-side code must specify which JSON object it wants to user. This object type must correspond to the user's selection of which graph they want to use. 

E.g. If a user chooses to view a graph of the average barometric pressure over the past 24 hours, the function will parse the JSON object for its barometric pressure object (as seen below in yellow).
```javascript
function change(){
if (request.readyState == 4 && request.status == 200){
hourAve = request.responseText;
jsObject=JSON.parse(hourAve);
for(var i=0;i<23;i++){
dataPoints[i]=jsObject[i].PressureAve;
}
drawCanvas();
}
}
```
From here, the change() function calls drawCanvas() which uses an open source Chart.js library included in the page to assist in animating the graph.

In HTML5, the <canvas> tag is used to draw graphics via scripting. However, the <canvas> element has no drawing capabilities of its own, as it is only a container graphics. An actual script, such as Chart.js, must be used to draw the image.

To create a chart, we need to place a canvas tag in the HTML body where the chart should appear:
```javascript
<canvas id="canvas" width="500px" height="210px"
style="position:absolute;"></canvas>
```
Then, the Chart class that is included in the open source library needs to be instantiated. This is done in the JavaScript function titled drawCanvas(). drawCanvas() does this by creating a new instance of Chart and passing in the location of where we
want to draw the chart in a 2d context.

To do this, a 2d context of where the chart should be drawn needs to passed as a parameter to the Chartobject.
```javascript
<script>
function drawCanvas(){
var lineChartData = {
//this generates the x axis of the chart
labels : daylabels,
//the data for line charts is broken up into an array of datasets
//each dataset has a colour for the fill, the line,and the points
datasets : [
{
fillColor : "rgba(151,187,205,0.5)",
strokeColor : "rgba(151,187,205,1)",
pointColor : "rgba(151,187,205,1)",
pointStrokeColor : "#fff",
data: dataPoints
}
]
}
//Create an instance of the chart to type, in this case a Line chart, then
//pass in the data for that chart type
var myLine = new
Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
}
</script>
```
The lineChartData, that was established in the drawCanvas function, is then used within the Chart.js library to place all 24 data points received from the HourAvg table on a line graph.

![Alt text](/screenshot3.JPG?raw=true "Screenshot #5: Graph")
