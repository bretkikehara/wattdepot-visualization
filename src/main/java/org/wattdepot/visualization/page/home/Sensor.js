YUI().add('wattdepot-sensor', function(Y) {
  Y.namespace("WattDepot");
  /**
   * Creates the WattDepot sensor.
   */
  var Sensor = function() {

    // define the functions
    var init, drawFunc, updateFunc, sendFunc, isAnimingFunc;
    // define the fields.
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
     * Initiates this sensor.
     * 
     * @param processing
     *          Processing Object.
     */
    init = function(processing) {
      P = processing;
    };

    /**
     * Draws the sensor.
     */
    drawFunc = function() {
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
    };

    /**
     * Updates the sensor.
     */
    updateFunc = function() {
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
    };

    /**
     * Sends the data.
     */
    sendFunc = function() {
      circle.isAnim = true;
      circle.radius.val = circle.radius.def;
      circle.color.val = circle.color.def;
    };

    /**
     * Gets whether the sensor is being animated.
     */
    isAnimateFunc = function() {
      return circle.isAnim;
    };

    /**
     * List of all public methods.
     */
    return {
      init : init,
      draw : drawFunc,
      update : updateFunc,
      isAnimate : isAnimateFunc,
      send : sendFunc
    };
  };

  Y.WattDepot.Sensor = Sensor;
}, '1.0.0', {
  requires : [ 'node-base' ]
});