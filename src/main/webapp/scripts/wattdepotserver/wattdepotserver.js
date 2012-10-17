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

    var P, o, key, sen, trans, getX, getY, timer;

    P = processing;
    o = {
      x : 0,
      y : 0,
      width : 10,
      height : 10,
      radius : 3,
      scaleHandler : function(energyConsumption) {
        return energyConsmption;
      }
    };

    // override the default values.
    if (!!cfg) {
      for (key in o) {
        if (!!cfg[key] && typeof o[key] == typeof cfg[key]) {
          o[key] = cfg[key];
        }
      }
    }

    /**
     * Gets this x.
     * 
     * @return int
     */
    getX = function() {
      return o.x;
    };

    /**
     * Gets this y.
     * 
     * @return int
     */
    getY = function() {
      return o.y;
    };

    // initialize the sensors.
    o.sensors = {};
    if (!!cfg.sensors) {
      for (key in cfg.sensors) {
        sen = new W.Sensor(P, cfg.sensors[key]);
        trans = new W.Transmission(sen.getX(), sen.getY(), o.x, o.y);
        trans.init(P);
        o.sensors[key] = {
          sensor : sen,
          transmission : trans
        };
      }
    }

    // defines the public functions
    return {
      /**
       * Draws the server by the order of lowest to highest layer.
       */
      draw : function() {
        var key;

        // draw the transmission lines
        for (key in o.sensors) {
          o.sensors[key].transmission.draw();
        }

        // draw the sensors.
        for (key in o.sensors) {
          o.sensors[key].sensor.draw();
        }

        // draw the server in the center.
        var x, y;
        x = o.x - o.width / 2;
        y = o.y - o.height / 2;
        P.rect(x, y, o.height, o.width, o.radius);
      },
      /**
       * Updates the server animations.
       * 
       * @param obj
       *          WattDepot Sensor information.
       */
      update : function(obj) {
        //Y.log(obj);
        var key, updateO;

        // ignore all sensors that were not defined during setup.
        for (key in o.sensors) {
          updateO = (!obj || !obj.sensors || !obj.sensors[key]) ? null : obj.sensors[key];
          // update the sensor.
          o.sensors[key].sensor.update(updateO);
          // send animation when the sensor is animated.
          if (o.sensors[key].sensor.isAnimate()) {
            o.sensors[key].transmission.transmissionAnim();
          }
        }
      },
    };
  };

  // Define object in global space.
  Y.WattDepot.Server = Server;
}, '1.0.0', {
  requires : [ 'processing', 'wattdepotsensor', 'wattdepot-transmission' ]
});