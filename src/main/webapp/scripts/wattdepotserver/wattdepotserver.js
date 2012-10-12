/**
 * Defines the server object.
 * 
 * @author Bret K. Ikehara
 */
YUI().add('wattdepotserver', function(Y) {
  Y.namespace("WattDepot");

  var W = Y.WattDepot;
  
  /**
   * Defines the server.
   * 
   * @param processing
   *          Processing Object.
   * @param cfg
   *          (optional) Configuration.
   * 
   */
  var Server = function(processing, cfg) {

    var P, o, dServer, dSensors, dTrans, iSensor;
    P = processing;
    o = {
      x : 0,
      y : 0,
      width : 10,
      height : 10,
      radius : 3
    };

    // override the default values.
    if (!!cfg) {
      for (key in o) {
        if (!!cfg[key] && typeof o[key] == typeof cfg[key]) {
          o[key] = cfg[key];
        }
      }
    }

    // initialize the sensors.
    (function() {
      var key;
      o.sensors = [];
      if (!!cfg.sensors) {
        for (key in cfg.sensors) {
          o.sensors[key] = new W.Sensor(P, cfg.sensors[key]);
        }
      }
    }());

    /**
     * Draws the server.
     */
    dServer = function() {
      // draw the server in the center.
      var x, y;
      x = o.x - o.width / 2;
      y = o.y - o.height / 2;

      P.rect(x, y, o.height, o.width, o.radius);
    };

    /**
     * Draws the sensors.
     */
    dSensors = function() {
      var key, sen;
      for (key in o.sensors) {
        sen = o.sensors[key];
        sen.draw();
      }
    };

    /**
     * Draws the tranmission lines.
     */
    dTrans = function() {
      // TODO add the transmission lines.
    };

    // defines the public functions
    return {
      getX : function() {
        return o.x;
      },
      getY : function() {
        return o.y;
      },
      /**
       * Draws the server.
       */
      draw : function() {
        dTrans();
        dSensors();
        dServer();
      },
      /**
       * Updates the server animations.
       */
      update : function() {
        // TODO fix update.
      }
    };
  };

  // Define object in global space.
  Y.WattDepot.Server = Server;
}, '1.0.0', {
  requires : [ 'processing' ]
});