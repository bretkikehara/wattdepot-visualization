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
      var sensors, sendTimer, sendTimerMax;

      /**
       * Sets up the processing canvas.
       */
      P.setup = function() {
        P.size(500, 500);
        var i;
        sensors = [];

        // firefox's quality will sharply degrade after 100 sensors.
        for (i = 0; i < 10; i += 1) {
          sensors.push(new Y.WattDepot.Sensor(P, {
            color : [ 255, 0, 0, 0 ],
            colorHandler : function(P, o) {
              o.color[0] -= 2;
            },
            x : 400 * Math.random(),
            y : 400 * Math.random()
          }));
        }

        // emulate sending data on a time interval.
        sendTimerMax = 50;
        sendTimer = sendTimerMax;
      };

      /**
       * Handles drawing the Processing canvas.
       */
      P.draw = function() {
        var sensor;
        P.background(255);
        // mocks data being sent at an interval.
        if (sendTimer > 0) {
          sendTimer -= 1;
        }
        else if (sendTimer <= 0) {
          for (sensor in sensors) {
            sensors[sensor].animate();
          }
          sendTimer = sendTimerMax;
        }

        // draws all items
        for (sensor in sensors) {
          sensors[sensor].draw();
        }

        // updates all items.
        for (sensor in sensors) {
          sensors[sensor].update();
        }
      };
    };

    // adds the canvas tag.
    canvas = Y.Node.create('<canvas/>');
    canvas.appendTo('div#bd');

    // initiates the processing object.
    processing = new Processing(canvas.getDOMNode(), sketchProc);
  }());
});
