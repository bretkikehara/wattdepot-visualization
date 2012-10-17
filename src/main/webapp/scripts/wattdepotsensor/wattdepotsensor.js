/**
 * Creates the WattDepot sensor animation module.
 * 
 * @author Bret K. Ikehara
 */
YUI().add('wattdepotsensor', function(Y) {
  Y.namespace("WattDepot");

  var Sensor, copyArr, offlineH, onlineH;

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

  /**
   * Generates the offline handler.
   * 
   * @param colorDef
   *          Array of integers.
   */
  offlineH = function(colorDef) {
    var rD, gD, bD, speed;
    speed = 2;
    rD = colorDef[0] / speed;
    gD = colorDef[1] / speed;
    bD = colorDef[2] / speed;
    return function(o) {
      var key, anim = false;
      o.color[0] -= speed;
      o.color[1] -= speed;
      o.color[2] -= speed;
      for (key in o.color) {
        if (o.color[key] <= 0) {
          o.color[key] = 0;
        }
        else {
          anim = true;
        }
      }

      // continue to animate?
      if (!anim) {
        o.isAnim = false;
      }
    };
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
    var o, P;

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
        // do nothing.
      },
      fade : 2,
      x : 2,
      y : 2,
      isAnim : false,
      online : true
    };
    updateO(cnf);

    // property that shouldn't be overridden
    o.radiusDef = o.radius;
    o.colorDef = copyArr(o.color);
    o.offlineHandler = offlineH(o.colorDef);
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
        if (o.online) {
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
          if (!!obj.isAnim && obj.isAnim) {
            this.animate();
          }
          if (typeof obj.online == 'boolean') {
            if (o.online != obj.online) {
              this.animate();
              o.online = obj.online;
            }
          }
        }
        
        //TODO add boolean for the online animation.

        // animate when data was sent.
        if (o.isAnim) {
          if (o.online) {
            // animate sensor pulse
            if (o.radius > o.radiusMax) {
              o.isAnim = false
            }
            else {
              o.radius += o.fade;
            }

            // updates the color.
            if (!!o.colorHandler) {
              o.colorHandler(P, o);
            }
          }
          else {
            // animate the sensor turn offline.
            o.offlineHandler(o);
          }
        }
      },
      /**
       * Sends the data.
       */
      animate : function() {
        o.isAnim = true;
        o.radius = o.radiusDef;
        o.color = copyArr(o.colorDef);
      },
      /**
       * Gets whether this is being animated.
       * 
       * @return boolean
       */
      isAnimate : function() {
        return o.isAnim;
      },
      /**
       * Sets this sensor online.
       * 
       * @param val
       *          boolean
       */
      setOnline : function(val) {
        if (typeof val == 'boolean') {
          o.online = val;
        }
      },
      isOnline : function() {
        return o.online;
      }
    };
  };

  // Define object in global space.
  Y.WattDepot.Sensor = Sensor;
}, '1.0.1', {
  requires : [ 'processing' ]
});