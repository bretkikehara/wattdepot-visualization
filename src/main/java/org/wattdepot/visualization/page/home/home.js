YUI().use('node', 'wattdepot-sensor', 'wattdepot-transmission', function(Y) {
  var processing;
  (function() {
    var sketchProc, canvas;
    /**
     * Sketches the processing app.
     */
    sketchProc = function(P) {
      
      var sensor, sendTimer, sendTimerMax, transmission;
      
      P.setup = function() {
        P.size(600, 400);
        
        //PImage background;
        //background = P.loadImage("UHmap.png");
        //image(background, 0, 0);
        
        // create the sensor
        sensor  = new Y.WattDepot.Sensor();
        sensor.init(P);
        
        // create the transmission
        transmission = new Y.WattDepot.Transmission(400, 400, 100, 100);
        transmission.init(P);
        
        // emulate sending data on a time interval.
        sendTimerMax = 50;
        sendTimer = sendTimerMax;
      };
      
      P.draw = function() {
        P.background(255);
        
        if (sendTimer > 0 && !sensor.isAnimate()) {
          sendTimer -= 1;
        }
        else if (sendTimer == 0) {
          sensor.send();
          sendTimer = sendTimerMax;
        }
        
        // draws all items
        sensor.draw();
        
        // updates all items.
        sensor.update();
        
        // draws the edge
        transmission.draw();
        transmission.sendTransmission();
        transmission.transmissionAnim();
        
      };
    };

    // adds the canvas tag.
    canvas = Y.Node.create('<canvas/>');
    canvas.appendTo('div#bd');

    processing = new Processing(canvas.getDOMNode(), sketchProc);
  }());
});
