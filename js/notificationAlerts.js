// localNotifications JavaScript Document

	//notification variables
		var rainVar;

		function changeWind(val){
			windVar=val;
		}
		

		function toggleWind(button) {
  			if (button.value == "OFF") {
    			button.value = "ON";
				var val=document.getElementById("ntfWind").value;
				
				//CHECK USER INPUT
				if(document.getElementById("ntfWind").value.length==0){
					//ASK IF USER WOULD LIKE TO ADD THEIR OWN INPUT OR USE DEFAULT VALUE
					if (confirm("You have not entered a value. Would you like to use the default alert?")){
						alert("You have chosen the defualt alert, don't worry it's still just as awesome!");
						//SET DEFAULT VALUE FOR NOTIFICATION
						localStorage.windVar=20;
						localStorage.windBttn="ON";
					}
					else {alert("Enter a number to set your own alert!");
					button.value="OFF";}
				}
				else if(document.getElementById("ntfWind").value.length>0){
					localStorage.windBttn="ON";
					localStorage.windVar=document.getElementById("ntfWind").value;
					alert("wind alert is set to "+val);
				}
  			} else {
    			button.value = "OFF";
				localStorage.windBttn="OFF";
  			}
		}
		
		function toggleRain(button) {
  			if (button.value == "OFF") {
    			button.value = "ON";
				rainVar=document.getElementById("ntfRain").value;
				
				//CHECK USER INPUT
				if(document.getElementById("ntfRain").value.length==0){
					//ASK IF USER WOULD LIKE TO ADD THEIR OWN INPUT OR USE DEFAULT VALUE
					if (confirm("You have not entered a value. Would you like to use the default alert?")){
						alert("You have chosen the defualt alert, don't worry it's still just as awesome!");
						//SET DEFAULT VALUE FOR NOTIFICATION
						localStorage.rainVar=20;
						localStorage.rainBttn="ON";
					}
					else {alert("Enter a number to set your own alert!");
					button.value="OFF";}
				}
				else if(document.getElementById("ntfRain").value.length>0){
					localStorage.rainBttn="ON";
					localStorage.rainVar=document.getElementById("ntfRain").value;
					alert("rain alert is set to "+rainVar);
				}		
  			} else {
    			button.value = "OFF";
				localStorage.rainBttn="OFF";
  			}
		}
		
		function toggleTemp(button) {
  			if (button.value == "OFF") {
    			button.value = "ON";
				rainVar=document.getElementById("ntfTemp").value;
				
				//CHECK USER INPUT
				if(document.getElementById("ntfTemp").value.length==0){
					//ASK IF USER WOULD LIKE TO ADD THEIR OWN INPUT OR USE DEFAULT VALUE
					if (confirm("You have not entered a value for temperature. Would you like to use the default alert?")){
						alert("You have chosen the defualt alert, don't worry it's still just as awesome!");
						//SET DEFAULT VALUE FOR NOTIFICATION
						localStorage.tempVar=20;
						localStorage.tempBttn="ON";
					}
					else {alert("Enter a number to set your own alert!");
					button.value="OFF";}
				}
				else if(document.getElementById("ntfTemp").value.length>0){
					localStorage.tempBttn="ON";
					localStorage.tempVar=document.getElementById("ntfTemp").value;
					alert("Temp alert is set to "+tempVar);
				}		
  			} else {
    			button.value = "OFF";
				localStorage.tempBttn="OFF";
  			}
		}
		
		function toggleDTemp(button) {
  			if (button.value == "OFF") {
    			button.value = "ON";
				tempVar=document.getElementById("ntfDTemp").value;
				
				//CHECK USER INPUT
				if(document.getElementById("ntfDTemp").value.length==0){
					//ASK IF USER WOULD LIKE TO ADD THEIR OWN INPUT OR USE DEFAULT VALUE
					if (confirm("You have not entered a value for temperature. Would you like to use the default alert?")){
						alert("You have chosen the defualt alert, don't worry it's still just as awesome!");
						//SET DEFAULT VALUE FOR NOTIFICATION
						localStorage.tempDVar=5;
						localStorage.tempDBttn="ON";
					}
					else {alert("Enter a number to set your own alert!");
					button.value="OFF";}
				}
				else if(document.getElementById("ntfDTemp").value.length>0){
					localStorage.tempDBttn="ON";
					localStorage.tempDVar=document.getElementById("ntfDTemp").value;
					alert("Temp alert is set to "+tempDVar);
				}		
  			} else {
    			button.value = "OFF";
				localStorage.tempDBttn="OFF";
  			}
		}
		
		function toggleBpress(button) {
  			if (button.value == "OFF") {
    			button.value = "ON";
				rainVar=document.getElementById("ntfBpress").value;
				
				//CHECK USER INPUT
				if(document.getElementById("ntfBpress").value.length==0){
					//ASK IF USER WOULD LIKE TO ADD THEIR OWN INPUT OR USE DEFAULT VALUE
					if (confirm("You have not entered a value for barometric pressure. Would you like to use the default alert?")){
						alert("You have chosen the defualt alert, don't worry it's still just as awesome!");
						//SET DEFAULT VALUE FOR NOTIFICATION
						localStorage.bPressVar=20;
						localStorage.bPressBttn="ON";
					}
					else {alert("Enter a number to set your own alert!");
					button.value="OFF";}
				}
				else if(document.getElementById("ntfBpress").value.length>0){
					localStorage.bPressBttn="ON";
					localStorage.bPressVar=document.getElementById("ntfBpress").value;
					localStorage.bPressDrop=document.getElementById("ntfBpressDrop").value;
					alert("Rise in Barometric Pressure alert is set to a rise in pressure by "+bPressDrop+"mBar over "+ bPressVar+" hours.");
				}		
  			} else {
    			button.value = "OFF";
				localStorage.bPressBttn="OFF";
  			}
		}
		
		function toggleDBpress(button) {
  			if (button.value == "OFF") {
    			button.value = "ON";
				rainVar=document.getElementById("ntfDBpress").value;
				
				//CHECK USER INPUT
				if(document.getElementById("ntfDBpress").value.length==0){
					//ASK IF USER WOULD LIKE TO ADD THEIR OWN INPUT OR USE DEFAULT VALUE
					if (confirm("You have not entered a value for barometric pressure. Would you like to use the default alert?")){
						alert("You have chosen the defualt alert, don't worry it's still just as awesome!");
						//SET DEFAULT VALUE FOR NOTIFICATION
						localStorage.dbPressVar=20;
						localStorage.dbPressBttn="ON";
					}
					else {alert("Enter a number to set your own alert!");
					button.value="OFF";}
				}
				else if(document.getElementById("ntfDBpress").value.length>0){
					localStorage.dbPressBttn="ON";
					localStorage.dbPressVar=document.getElementById("ntfDBpress").value;
					localStorage.dbPressDrop=document.getElementById("ntfDBpressDrop").value;
					alert("Drop in Barometric Pressure alert is set to a drop in pressure by "+dbPressDrop+"mBar over "+ dbPressVar+" hours.");
				}		
  			} else {
    			button.value = "OFF";
				localStorage.dbPressBttn="OFF";
  			}
		}
		
		
	
