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
				def : 0
			},
			serverLong : {
				def : 0
			},
			sensorLat : {
				def : 500
			},
			sensorLong : {
				def : 500
			},
			//isAnim : false		
		};
		edge.serverLat.val = edge.serverLat.def;
		edge.serverLong.val = edge.serverLong.def;
		edge.sensorLat.val = edge.sensorLat.def;
		edge.sensorLong.val = edge.sensorLong.def;
  	
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
			
			// Initiates the transmission.
			// @param processing
			//	Processing object.
			init : function(processing) {
				P = processing;
			},
			
			// Draws the line.
			draw : function() {				
				P.stroke(0);
				P.line(edge.serverLat, edge.serverLong, edge.sensorLat, edge.sensorLong);				
			}
		};
	};
	
	Y.WattDepot.Transmission = Transmission;
}, '1.0.0', {
  requires : [ 'node-base' ]
});