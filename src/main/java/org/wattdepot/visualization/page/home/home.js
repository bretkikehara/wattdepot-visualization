/**
 * Creates the Processing canvas for the home page.
 * 
 * @author Bret K. Ikehara
 */
YUI().use('node', 'wattdepot-sensor', function(Y) {
  var processing;
  (function() {
    var sketchProc, canvas;
    /**
     * Sketches the processing app.
     */
    sketchProc = function(P) {
      var sensor, sendTimer, sendTimerMax;

      /**
       * Sets up the processing canvas.
       */
      P.setup = function() {
        P.size(500, 500);

        // create the sensor
        sensor = new Y.WattDepot.Sensor({
          processing : P
        });

        // emulate sending data on a time interval.
        sendTimerMax = 50;
        sendTimer = sendTimerMax;
      };

      /**
       * Handles drawing the Processing canvas.
       */
      P.draw = function() {
        P.background(255);

        // mocks data being sent at an interval.
        if (sendTimer > 0 && !sensor.isAnimate()) {
          sendTimer -= 1;
        }
        else if (sendTimer == 0) {
          sensor.animate();
          sendTimer = sendTimerMax;
        }

        // draws all items
        sensor.draw();

        // updates all items.
        sensor.update();
      };
    };

    // adds the canvas tag.
    canvas = Y.Node.create('<canvas/>');
    canvas.appendTo('div#bd');

    // initiates the processing object.
    processing = new Processing(canvas.getDOMNode(), sketchProc);
  }());
});
