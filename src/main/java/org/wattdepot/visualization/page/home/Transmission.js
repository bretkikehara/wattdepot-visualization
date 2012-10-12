// Creates the transmission line animations between sensors and servers
// @author Anthony Xu

YUI().add('wattdepot-transmission', function(Y) {
	Y.namespace("WattDepot");
  
	// Defines WattDepot transmission
	var Transmission = function(senLat, senLong, serLat, serLong) {
    
		// define private fields
		var edge, P; 
		
		//creates the line 
		edge = {
			serverLat : {
				def : 100
			},
			serverLong : {
				def : 100
			},
			sensorLat : {
				def : 400
			},
			sensorLong : {
				def : 400
			},
			bubbleLat : {
				def : 400
			},
			bubbleLong : {
				def : 400
			},
			isAnim : false		
		};
		edge.serverLat.val = serLat;
		edge.serverLong.val = serLong;
		edge.sensorLat.val = senLat;
		edge.sensorLong.val = senLong;
		edge.bubbleLat.val = edge.sensorLat.val;
		edge.bubbleLong.val = edge.sensorLong.val;
		
		// Defines the public functions
		return {
			// Sets the server latitude.
			// @param s
			//	Integer value.
			setServerLat : function(s) {
				edge.serverLat.val = s;
			},
			
			// Sets the server longitude.
			// @param s
			//	Integer value.
			setServerLong : function(s) {
				edge.serverLong.val = s;
			},
			
			// Sets the sensor latitude.
			// @param s
			//	Integer value.
			setSensorLat : function(s) {
				edge.sensorLat.val = s;
			},
			
			// Sets the sensor longitude.
			// @param s
			//	Integer value.
			setSensorLong : function(s) {
				edge.sensorLong.val = s;
			},
			
			// Sets the bubble latitude.
			// @param s
			//	Integer value.
			setBubbleLat : function(s) {
				edge.bubbleLat.val = s;
			},
			
			// Sets the sensor longitude.
			// @param s
			//	Integer value.
			setBubbleLong : function(s) {
				edge.bubbleLong.val = s;
			},
			
			// Initiates the transmission.
			// @param processing
			//	Processing object.
			init : function(processing) {
				P = processing;
			},
			
			// Draws the line.
			draw : function() {				
				P.stroke(0);
				P.strokeWeight(4);
				P.line(edge.serverLat.val, edge.serverLong.val, edge.sensorLat.val, edge.sensorLong.val);				
				if (edge.isAnim) {										
					P.ellipse(edge.bubbleLat.val, edge.bubbleLong.val, 10, 10);
				}
			},
			
			// Animates the transmission
			transmissionAnim : function() {				
				var latDiff, longDiff, resetBubble;
				/**
				if ((edge.sensorLat.val > edge.serverLat.val) && (edge.bubbleLat.val <= edge.serverLat.val)) {
					edge.bubbleLat.val = edge.sensorLat.val;
				}
				if ((edge.sensorLat.val < edge.serverLat.val) && (edge.bubbleLat.val >= edge.serverLat.val)) {
					edge.bubbleLat.val = edge.sensorLat.val;
				}
				if ((edge.sensorLong.val > edge.serverLong.val) && (edge.bubbleLong.val <= edge.serverLong.val)) {
					edge.bubbleLong.val = edge.sensorLong.val;
					P.stroke(255);
					P.strokeWeight(9);
					P.line(edge.serverLat.val, edge.serverLong.val, edge.sensorLat.val, edge.sensorLong.val);
				}
				if ((edge.sensorLong.val < edge.serverLong.val) && (edge.bubbleLong.val >= edge.serverLong.val)) {
					edge.bubbleLong.val = edge.sensorLong.val;
					P.stroke(255);
					P.strokeWeight(9);
					P.line(edge.serverLat.val, edge.serverLong.val, edge.sensorLat.val, edge.sensorLong.val);
				}
				*/
				if ((((edge.sensorLat.val > edge.serverLat.val) 
						&& (edge.bubbleLat.val <= edge.serverLat.val)))
					|| (((edge.sensorLat.val < edge.serverLat.val) 
						&& (edge.bubbleLat.val >= edge.serverLat.val)))
					|| (((edge.sensorLong.val > edge.serverLong.val) 
						&& (edge.bubbleLong.val <= edge.serverLong.val)))
					|| (((edge.sensorLong.val < edge.serverLong.val) 
						&& (edge.bubbleLong.val >= edge.serverLong.val)))) {
					edge.bubbleLat.val = edge.sensorLat.val;
					edge.bubbleLong.val = edge.sensorLong.val;
					P.stroke(255);
					P.strokeWeight(9);
					P.line(edge.serverLat.val, edge.serverLong.val, edge.sensorLat.val, edge.sensorLong.val);
				}	
				
				latDiff = (edge.sensorLat.val - edge.serverLat.val)/120;
				longDiff = (edge.sensorLong.val - edge.serverLong.val)/120;
				edge.bubbleLat.val = edge.bubbleLat.val - latDiff;
				edge.bubbleLong.val = edge.bubbleLong.val - longDiff;		
			},
			
			// Flash animation
			flash : function() {
				
			},
			
			// Sends a transmission
			sendTransmission : function() {
				edge.isAnim = true;
			},
			
			// Returns if the server is sending a transmission.
			isAnim : function() {
				return edge.isAnim;
			}
		};
	};
	
	Y.WattDepot.Transmission = Transmission;
}, '1.0.0', {
  requires : [ 'node-base' ]
});