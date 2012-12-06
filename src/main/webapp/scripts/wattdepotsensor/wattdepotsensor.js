/**
 * Creates the WattDepot sensor animation module.
 * 
 * @author Bret K. Ikehara
 */
YUI().add('wattdepotsensor', function(Y) {
  Y.namespace("WattDepot");

  var Sensor, W, copyArr, offlineH, onlineH, pulseH, sendH, colorH, speed, getDistance, sendScale;
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
  sendScale = 5;

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
    fadeH(P, o);
  };

  /**
   * Handles sending the sensor.
   * 
   * @param o
   *          Sensor object.
   */
  sendH = function(o) {
    var step, compH, len;

    len = o.point.len;
    if (o.isSend) {
      step = {
        x : Math.abs(o.x - o.server.x) / len,
        y : Math.abs(o.y - o.server.y) / len
      };

      if (o.x > o.server.x) {
        o.point.x = o.point.x - step.x;
        if (o.y > o.server.y) {
          o.point.y = o.point.y - step.y;
        }
        else {
          o.point.y = o.point.y + step.y;
        }
      }
      else {
        o.point.x = o.point.x + step.x;
        if (o.y > o.server.y) {
          o.point.y = o.point.y - step.y;
        }
        else {
          o.point.y = o.point.y + step.y;
        }
      }
    }

    if (getDistance(o.x, o.y, o.point.x, o.point.y) / sendScale >= len) {
      o.isSend = false;
    }
  };

  /**
   * Calculates the distance between two points.
   */
  getDistance = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  /**
   * Handles the color.
   * 
   * @param o
   *          Sensor object.
   */
  colorH = function(o) {
    var e = o.energy, c = 0;
    if (e > 700) {
      e = 700;
    }

    // get color where green is
    c = parseInt(75 - (e / (700 / 75)), 10);
    if (c < 0) {
      c = 0;
    }
    o.colorDef = [ c, 255, 255, 255 ];
    o.color = copyArr(o.colorDef);
  };

  fadeH = function(o) {
    if (o.color[2] > 50) {
      o.color[2] -= 2;
    }
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
      fade : 2,
      latitude : 0,
      longitude : 0,
      isPulse : false,
      isOnline : true,
      isAnim : true,
      isSend : false
    };
    updateO(cnf);

    // property that shouldn't be overridden
    o.radiusDef = o.radius;
    o.server = cnf.server;
    o.point = {
      x : 0,
      y : 0,
      count : 0
    };
    colorH(o);

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
        P.fill(100, fill);
        P.line(o.x, o.y, o.server.x, o.server.y);
        if (o.isSend) {
          sendH(o);
          P.ellipse(o.point.x, o.point.y, 4, 4);
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
            colorH(o);
          }
          if (!!obj.pulse && obj.pulse) {
            o.energy = obj.energy;
            colorH(o);
            o.isOnline = true;
            o.isPulse = true;
            o.isAnim = true;
            o.isSend = true;
            o.point.x = o.x;
            o.point.y = o.y;
            o.point.count = 0;
          }
        }

        // Two states: pulse or online.
        // Set o.isAnim to false if the animation show freeze at a state.
        if (o.isAnim) {
          if (o.isOnline) {
            if (o.isPulse) {
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
       * Gets the max radius.
       */
      getMaxRadius : function() {
        return o.radiusMax;
      },
      /**
       * Sets this radius.
       * 
       * @param val
       *          Radius
       */
      setRadius : function(val) {
        o.radiusDef = parseInt(val, 10);
        o.radius = o.radiusDef;
        o.radiusMax = o.radiusDef + 20;
      },
      scaleLine : function() {
        // update the length of the line
        o.point.len = getDistance(o.x, o.y, o.server.x, o.server.y) / sendScale;
      },
      getInfo : function() {
        return 'Energy: ' + o.energy + 'kW';
      }
    };
  };

  // Define object in global space.
  W.Sensor = Sensor;
}, '1.0.1', {
  requires : [ 'processing' ]
});