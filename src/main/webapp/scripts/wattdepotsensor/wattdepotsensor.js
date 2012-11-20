/**
 * Creates the WattDepot sensor animation module.
 * 
 * @author Bret K. Ikehara
 */
YUI().add('wattdepotsensor', function(Y) {
  Y.namespace("WattDepot");

  var Sensor, W, P, copyArr, offlineH, onlineH, pulseH, speed;
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
    // animate sensor pulse
    if (o.radius > o.radiusMax) {
      o.isAnim = false;
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
      isAnim : true
    };
    updateO(cnf);
    
    // property that shouldn't be overridden
    o.radiusDef = o.radius;
    o.colorDef = copyArr(o.color);
    o.server = cnf.server;

    // create the transmission line.
    trans = new W.Transmission(o.x, o.y, o.server.x, o.server.y);
    trans.init(P);
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
        
        // TODO fix the transmission line.
        //trans.draw();

        c = P.color(o.color[0], o.color[1], o.color[2]);
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
            o.radius = o.radiusDef;
            o.isPulse = false;
            o.isOnline = obj.online;
            o.isAnim = true;
          }
          if (!!obj.pulse && obj.pulse) {
            o.color = copyArr(obj.color);
            o.colorDef = copyArr(obj.color);
            o.radiusDef = obj.radius;
            o.radius = obj.radius;
            o.isOnline = true;
            o.isPulse = obj.pulse;
            o.isAnim = o.isPulse;
          }
        }

        // Two states: pulse or online.
        // Set o.isAnim to false if the animation show freeze at a state.
        if (o.isAnim) {
          if (o.isOnline) {
            if (o.isPulse) {
              pulseH(o);
              trans.sendTransmission();
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
        trans.updateXY(o.x, o.y);
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
      }
    };
  };

  // Define object in global space.
  W.Sensor = Sensor;
}, '1.0.1', {
  requires : [ 'processing' ]
});