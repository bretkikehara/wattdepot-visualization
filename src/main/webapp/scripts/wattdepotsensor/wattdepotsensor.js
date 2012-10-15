/**
 * Creates the WattDepot sensor animation module.
 * 
 * @author Bret K. Ikehara
 */
YUI().add('wattdepotsensor', function(Y) {
  Y.namespace("WattDepot");

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
    var o, P, key, copyArr;

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

    // override the default values.
    if (!!cnf) {
      for (key in o) {
        if (!!cnf[key] && typeof o[key] == typeof cnf[key]) {
          o[key] = cnf[key];
        }
      }
    }

    // property that shouldn't be overridden
    o.radiusDef = o.radius;
    o.colorDef = copyArr(o.color);

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
        var c, fill;

        if (o.online) {
          c = P.color(o.color[0], o.color[1], o.color[2]);
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
          // TODO draw black circle.
        }
      },
      /**
       * Updates the sensor.
       */
      update : function() {

        // animate when data was sent.
        if (o.online && o.isAnim) {
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
      },
      /**
       * Sends the data.
       */
      animate : function() {
        if (o.online) {
          o.isAnim = true;
          o.radius = o.radiusDef;
          o.color = copyArr(o.colorDef);
        }
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