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
        P.size(600, 400);

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
        transmission1 = new Y.WattDepot.Transmission(95, 55, 330, 225);
        transmission2 = new Y.WattDepot.Transmission(415, 55, 330, 225);
        transmission3 = new Y.WattDepot.Transmission(375, 335, 330, 225);
        transmission1.init(P);
        transmission2.init(P);
        transmission3.init(P);
        
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
          transmission1.sendTransmission();
          transmission2.sendTransmission();
          transmission3.sendTransmission();
          sendTimer = sendTimerMax;
        }

        // draws all items
        transmission1.draw();
        transmission2.draw();
        transmission3.draw();
        sensor.draw();

        // updates all items.
        transmission1.transmissionAnim();
        transmission2.transmissionAnim();
        transmission3.transmissionAnim();
        sensor.update();
      };
    };

    // adds the canvas tag.
    canvas = Y.Node.create('<canvas/>');
    canvas.appendTo('div#bd');

    processing = new Processing(canvas.getDOMNode(), sketchProc);
  }());
});
