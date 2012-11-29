/**
 * Creates the WattDepot sensor animation module.
 * 
 * @author Bret K. Ikehara
 */
YUI().add('wattdepotsensor', function(Y) {
  Y.namespace("WattDepot");

  var Sensor, W, copyArr, offlineH, onlineH, pulseH, sendH, speed;
  W = Y.WattDepot;

  /**
   * Copies an array.
   * 
   * @param to
   *          Array
   * @param from
   *          Array
   */
  copyArr = function(from) {
    var to = [];
    var key;
    for (key = 0; key < from.length; key += 1) {
      to[key] = from[key];
    }
    return to;
  };

  // online/offline color value.
  speed = 2;
  /**
   * Sets the sensor offline.
   * 
   * @param o
   *          Sensor object.
   */
  offlineH = function(o) {
    var key, val = true;
    // stop pulsing
    o.isPulse = false;

    // update the color
    o.color[2] -= speed;
    for (key in o.color) {
      if (o.color[key] <= 0) {
        o.color[key] = 0;
      }
      else {
        val = false;
      }
    }

    // turn off animation when offline.
    if (val) {
      o.isAnim = false;
    }
  };

  /**
   * Sets the sensor online.
   * 
   * @param o
   *          Sensor object.
   */
  onlineH = function(o) {
    var key, val = true;

    // update the color
    o.color[2] += speed;
    for (key in o.color) {
      if (o.color[key] >= o.colorDef[key]) {
        o.color[key] = o.colorDef[key];
      }
      else {
        val = false;
      }
    }

    if (val) {
      o.isAnim = false;
    }
  };

  /**
   * Handles the pulse.
   * 
   * @param o
   *          Sensor object.
   */
  pulseH = function(o) {
    if (o.radius > o.radiusMax) {
      o.isAnim = false;
      o.radius = o.radiusDef;
    }
    else {
      o.radius += o.fade;
    }

    // updates the color.
    if (!!o.colorHandler) {
      o.colorHandler(P, o);
    }
  };

  /**
   * Handles sending the sensor.
   * 
   * @param o
   *          Sensor object.
   */
  sendH = function(o) {
    // TODO fix send.
  };

  /**
   * Defines the WattDepot circle.
   * 
   * @param processing
   *          Processing object.
   * @param cnf
   *          (Optional) Config object.
   */
  var Sensor = function(processing, cnf) {
    // define the private fields.
    var o, trans;

    /**
     * Updates the object values.
     * 
     * @param cnf
     *          Object
     */
    updateO = function(cnf) {
      var key;
      // override the default values.
      if (!!cnf) {
        for (key in o) {
          if (!!cnf[key] && typeof o[key] == typeof cnf[key]) {
            o[key] = cnf[key];
            // Y.log(key + '=' + o[key]);
          }
        }
      }
    };

    // processing object.
    P = processing;

    // creates the object.
    o = {
      radius : 55,
      radiusMax : 100,
      energy : 0,
      color : [ 0, 0, 0, 0 ],
      colorHandler : function() {
        o.color[2] -= 2;
      },
      fade : 2,
      latitude : 0,
      longitude : 0,
      x : 2,
      y : 2,
      isPulse : false,
      isOnline : true,
      isAnim : true,
      isSend : true
    };
    updateO(cnf);

    // property that shouldn't be overridden
    o.radiusDef = o.radius;
    o.colorDef = copyArr(o.color);
    o.server = cnf.server;
    o.point = {
      x : 0,
      y : 0
    };

    return {
      /**
       * Gets this x value.
       * 
       * @returns int
       */
      getX : function() {
        return o.x;
      },
      /**
       * Gets this y value.
       * 
       * @returns int
       */
      getY : function() {
        return o.y;
      },
      /**
       * Draws the sensor.
       */
      draw : function() {
        var c, alpha, fill;

        c = P.color(o.color[0], o.color[1], o.color[2]);

        // draw the line
        P.stroke(100, 100);
        P.line(o.x, o.y, o.server.x, o.server.y);
        if (o.isSend) {
          P.point(o.point.x, o.point.y);
        }

        // draw the sensor.
        if (o.isOnline) {
          fill = o.radiusMax - o.radius;
          P.stroke(c, fill);
          P.fill(c, fill);
          P.ellipse(o.x, o.y, o.radius, o.radius);

          alpha = 255;
          P.stroke(c, alpha);
          P.fill(c, alpha);
          P.ellipse(o.x, o.y, o.radiusDef, o.radiusDef);
        }
        else {
          P.stroke(c, 255);
          P.fill(c, 255);
          P.ellipse(o.x, o.y, o.radius, o.radius);
        }
      },
      /**
       * Updates the sensor.
       * 
       * @param obj
       *          Object
       */
      update : function(obj) {
        // update the sensor settings.
        if (!!obj) {
          if (typeof obj.online == 'boolean' && obj.online != o.isOnline) {
            o.isPulse = false;
            o.isOnline = obj.online;
            o.isAnim = true;
          }
          if (!!obj.pulse && obj.pulse) {
            o.color = copyArr(obj.color);
            o.colorDef = copyArr(obj.color);
            o.energy = obj.energy;
            o.isOnline = true;
            o.isPulse = true;
            o.isAnim = true;
            o.isSend = true;
            o.point.x = o.x;
            o.point.y = o.y;
          }
        }

        // Two states: pulse or online.
        // Set o.isAnim to false if the animation show freeze at a state.
        if (o.isAnim) {
          if (o.isOnline) {
            if (o.isPulse) {
              Y.log('handle pulse');
              pulseH(o);
              sendH(o);
            }
            else {
              onlineH(o);
            }
          }
          else {
            offlineH(o);
          }
        }
      },
      /**
       * Updates the latitude and longitude.
       * 
       * @param handler
       *          Function
       */
      updateXY : function(handler) {
        var point = handler(new google.maps.LatLng(o.latitude, o.longitude));
        o.x = point.x;
        o.y = point.y;
      },
      /**
       * Gets whether this is pulsing.
       * 
       * @return boolean
       */
      isPulse : function() {
        return o.isPulse;
      },
      /**
       * Sets this sensor online.
       * 
       * @param val
       *          boolean
       */
      setOnline : function(val) {
        if (typeof val == 'boolean') {
          o.isOnline = val;
        }
      },
      /**
       * Check whether this sensors is online.
       * 
       * @return boolean
       */
      isOnline : function() {
        return o.isOnline;
      },
      /**
       * Sets the transmission line.
       * 
       * @param line
       *          Transmission
       */
      setTransmission : function(line) {
        o.transmission = line;
      },
      /**
       * Energy defined in watts.
       * 
       * @return Number
       */
      getEnergy : function() {
        // TODO update to the energy attribute.
        return o.energy;
      },
      /**
       * Gets the current radius.
       */
      getRadius : function() {
        return o.radiusDef;
      },
      /**
       * Sets this radius.
       * 
       * @param val
       *          Radius
       */
      setRadius : function(val) {
        if (Y.Lang.isNumber(val)) {
          o.radiusDef = val;
          o.radius = o.radiusDef;
          o.raduisMax = o.radiusDef + 20;
        }
      }
    };
  };

  // Define object in global space.
  W.Sensor = Sensor;
}, '1.0.1', {
  requires : [ 'processing' ]
});