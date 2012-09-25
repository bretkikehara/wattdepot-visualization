/**
 * Creates the WattDepot sensor animation module.
 * 
 * @author Bret K. Ikehara
 */
YUI().add('wattdepot-sensor', function(Y) {
  Y.namespace("WattDepot");
  
  /**
   * Defines the WattDepot sensor.
   */
  var Sensor = function() {
    // define the private fields.
    var circle, P;

    // creates the object.
    circle = {
      radius : {
        def : 55,
        max : 100
      },
      color : {
        def : 255,
        min : 200
      },
      fade : {
        o : 2,
        i : 2
      },
      isAnim : false
    };
    circle.radius.val = circle.radius.def;
    circle.color.val = circle.color.def;

    /**
     * Defines the public functions.
     */
    return {
      /**
       * Sets this radius.
       * 
       * @param r
       *          Integer value.
       */
      setRadius : function(r) {
        circle.radius.def = r;
      },

      /**
       * Sets this max radius.
       * 
       * @param r
       *          Integer value.
       */
      setRadiusMax : function(r) {
        circle.radius.max = r;
      },

      /**
       * Sets this outer fade speed.
       * 
       * @param f
       *          Integer
       */
      setFadeOuter : function(f) {
        circle.fade.o = f;
      },

      /**
       * Sets this outer fade speed.
       * 
       * @param f
       *          Integer
       */
      setFadeInner : function(f) {
        circle.fade.i = f;
      },

      /**
       * Initiates this sensor.
       * 
       * @param processing
       *          Processing Object.
       */
      init : function(processing) {
        P = processing;
      },

      /**
       * Draws the sensor.
       */
      draw : function() {
        var c, fill;

        c = P.color(circle.color.val, 0, 0);
        fill = circle.radius.max - circle.radius.val;
        P.stroke(c, fill);
        P.fill(c, fill);
        P.ellipse(56, 46, circle.radius.val, circle.radius.val);

        alpha = 255;
        P.stroke(c, alpha);
        P.fill(c, alpha);
        P.ellipse(56, 46, circle.radius.def, circle.radius.def);
      },

      /**
       * Updates the sensor.
       */
      update : function() {
        var endFade = false, endBlink = false;

        // animate when data was sent.
        if (circle.isAnim) {
          endBlink = (circle.color.val < circle.color.min);
          endFade = (circle.radius.val > circle.radius.max);
          if (!endFade) {
            circle.radius.val += circle.fade.o;
          }

          if (!endBlink) {
            circle.color.val -= circle.fade.i;
          }

          // end animation when both are done.
          if (endFade && endBlink) {
            circle.isAnim = false;
          }
        }
      },

      /**
       * Sends the data.
       */
      send : function() {
        circle.isAnim = true;
        circle.radius.val = circle.radius.def;
        circle.color.val = circle.color.def;
      },

      /**
       * Gets whether the sensor is being animated.
       */
      isAnimate : function() {
        return circle.isAnim;
      }
    };
  };

  // Define object in global space.
  Y.WattDepot.Sensor = Sensor;
}, '1.0.0', {
  requires : [ 'node-base' ]
});