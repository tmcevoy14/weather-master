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
