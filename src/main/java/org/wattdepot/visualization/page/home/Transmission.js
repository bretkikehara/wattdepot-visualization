// Creates the transmission line animations between sensors and servers
// @author Anthony Xu, Bret K. Ikehara

YUI().add('wattdepot-transmission', function(Y) {
  Y.namespace("WattDepot");

  // Defines WattDepot transmission
  var Transmission = function(senLat, senLong, serLat, serLong, processing, cnf) {

    // define private fields
    var edge, P;

    // creates the line
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

    // processing
    P = processing;

    // Defines the public functions
    return {
      // Gets the server latitude.
      // @param s
      // Integer value.
      getServerLat : function() {
        return edge.serverLat.val;
      },

      // Gets the server longitude.
      // @param s
      // Integer value.
      getServerLong : function() {
        return edge.serverLong.val;
      },

      // Gets the sensor latitude.
      // @param s
      // Integer value.
      getSensorLat : function() {
        return edge.sensorLat.val;
      },

      // Gets the sensor longitude.
      // @param s
      // Integer value.
      getSensorLong : function() {
        return edge.sensorLong.val;
      },

      // Sets the server latitude.
      // @param s
      // Integer value.
      setServerLat : function(s) {
        edge.serverLat.val = s;
      },

      // Sets the server longitude.
      // @param s
      // Integer value.
      setServerLong : function(s) {
        edge.serverLong.val = s;
      },

      // Sets the sensor latitude.
      // @param s
      // Integer value.
      setSensorLat : function(s) {
        edge.sensorLat.val = s;
      },

      // Sets the sensor longitude.
      // @param s
      // Integer value.
      setSensorLong : function(s) {
        edge.sensorLong.val = s;
      },

      // Sets the bubble latitude.
      // @param s
      // Integer value.
      setBubbleLat : function(s) {
        edge.bubbleLat.val = s;
      },

      // Sets the sensor longitude.
      // @param s
      // Integer value.
      setBubbleLong : function(s) {
        edge.bubbleLong.val = s;
      },

      // Initiates the transmission.
      // @param processing
      // Processing object.
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
      update : function() {
        P.stroke(255);
        P.strokeWeight(9);
        P.line(edge.serverLat.val, edge.serverLong.val, edge.sensorLat.val, edge.sensorLong.val);
      },
      /**
       * Updates the xy coordinate.
       * 
       * @param x
       *          Sensor x coordinate.
       * @param y
       *          Sensor y coordinate.
       */
      updateXY : function(x, y) {
        edge.sensorLat.val = x;
        edge.serverLong.val = y;
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