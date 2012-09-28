// Creates the transmission line animations between sensors and servers
// @author Anthony Xu

YUI().add('wattdepot-transmission', function(Y) {
	Y.namespace("WattDepot");
  
	// Defines WattDepot transmission
	var Transmission = function() {
    
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
		edge.serverLat.val = edge.serverLat.def;
		edge.serverLong.val = edge.serverLong.def;
		edge.sensorLat.val = edge.sensorLat.def;
		edge.sensorLong.val = edge.sensorLong.def;
		edge.bubbleLat.val = edge.bubbleLat.def;
		edge.bubbleLong.val = edge.bubbleLong.def;
		
		// Defines the public functions
		return {
			// Sets the server latitude.
			// @param s
			//	Integer value.
			setServerLat : function(s) {
				edge.serverLat.def = s;
			},
			
			// Sets the server longitude.
			// @param s
			//	Integer value.
			setServerLong : function(s) {
				edge.serverLong.def = s;
			},
			
			// Sets the sensor latitude.
			// @param s
			//	Integer value.
			setSensorLat : function(s) {
				edge.sensorLat.def = s;
			},
			
			// Sets the sensor longitude.
			// @param s
			//	Integer value.
			setSensorLong : function(s) {
				edge.sensorLong.def = s;
			},
			
			// Sets the bubble latitude.
			// @param s
			//	Integer value.
			setBubbleLat : function(s) {
				edge.bubbleLat.def = s;
			},
			
			// Sets the sensor longitude.
			// @param s
			//	Integer value.
			setBubbleLong : function(s) {
				edge.bubbleLong.def = s;
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
				P.line(edge.serverLat.val, edge.serverLong.val, edge.sensorLat.val, edge.sensorLong.val);				
			},
			
			// Animates the transmission
			transmissionAnim : function() {				
				var newLat, newLong, latDiff, longDiff, i;
				latDiff = Math.abs(edge.sensorLat-edge.serverLat)/60;
				longDiff = Math.abs(edge.sensorLong-edge.serverLong)/60;
				for (i=0; i<60; i++) {
					if (edge.isAnim) {										
						P.ellipse(edge.bubbleLat.val, edge.bubbleLong.val, 10, 10);
						if (edge.sensorLat > edge.serverLat) {
							setBubbleLat(edge.sensorLat - latDiff);
						}
						else if (edge.sensorLat < edge.serverLat) {
							setBubbleLat(edge.sensorLat + latDiff);
						}
						if (edge.sensorLong > edge.serverLong) {
							setBubbleLong(edge.sensorLong - longDiff);
						}
						else if (edge.sensorLong < edge.serverLong) {
							setBubbleLong(edge.sensorLong + longDiff);
						}
					}
					
				}
							

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