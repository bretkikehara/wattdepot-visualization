YUI().use('node', 'wattdepotsensor', 'wattdepot-transmission', function(Y) {
  var processing;
  (function() {
    var sketchProc, canvas;
    /**
     * Sketches the processing app.
     */
    sketchProc = function(P) {
      var sensor, sensors, sendTimer, sendTimerMax, transmission, bg;

      P.setup = function() {
        P.size(600, 600);

        // PImage background;
        bg = P.loadImage("/images/UHmap.png");

        // create the sensor
        sensor = new Y.WattDepot.Sensor(P, {
          radius : 10,
          color : [ 0, 255, 0, 0 ],
          colorHandler : function(P, o) {
            o.color[1] -= 2;
          },
          x : 400 * Math.random(),
          y : 400 * Math.random()
        });

        // create the transmission
        transmission = new Y.WattDepot.Transmission(400, 400, 100, 100);
        transmission.init(P);

        // emulate sending data on a time interval.
        sendTimerMax = 50;
        sendTimer = sendTimerMax;
      };

      P.draw = function() {
        P.background(255);
        P.image(bg, 0, 0);

        if (sendTimer > 0 && !sensor.isAnimate()) {
          sendTimer -= 1;
        }
        else if (sendTimer == 0) {
          sensor.animate();
          transmission.sendTransmission();
          sendTimer = sendTimerMax;
        }

        // draws all items
        transmission.draw();
        sensor.draw();

        // updates all items.
        transmission.transmissionAnim();
        sensor.update();
      };
    };

    // adds the canvas tag.
    canvas = Y.Node.create('<canvas/>');
    canvas.appendTo('div#bd');

    processing = new Processing(canvas.getDOMNode(), sketchProc);
  }());
});
