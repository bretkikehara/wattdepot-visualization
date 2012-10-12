YUI().use('node', 'wattdepotsensor', 'wattdepot-transmission', 'wattdepotserver', function(Y) {
  var processing, W;

  // short cut.
  W = Y.WattDepot;

  (function() {
    var sketchProc, canvas;
    /**
     * Sketches the processing app.
     */
    sketchProc = function(P) {
      var server, sendTimer, sendTimerMax, transmission, bg;

      /**
       * Set up the processing object.
       */
      P.setup = function() {
        P.size(600, 400);

        // PImage background;
        bg = P.loadImage("/images/UHmap.png");

        var c, cHndlr, r;
        c = [ 0, 0, 255, 0 ];
        cHndlr =  function(P, o) {
          o.color[2] -= 2;
        };
        r = 10;
        
        // creates the server
        server = new W.Server(P, {
          x : 330,
          y : 255,
          sensors : [ {
            radius : r,
            color : c,
            colorHandler : cHndlr,
            x : 95,
            y : 55
          }, {
            radius : r,
            color : c,
            colorHandler : cHndlr,
            x : 415,
            y : 55
          }, {
            radius : r,
            color : c,
            colorHandler : cHndlr,
            x : 415,
            y : 375
          } ]
        });

        // create the transmission
        transmission1 = new Y.WattDepot.Transmission(95, 55, server.getX(), server.getY());
        transmission2 = new Y.WattDepot.Transmission(415, 55, server.getX(), server.getY());
        transmission3 = new Y.WattDepot.Transmission(375, 335, server.getX(), server.getY());
        transmission1.init(P);
        transmission2.init(P);
        transmission3.init(P);

        // emulate sending data on a time interval.
        sendTimerMax = 50;
        sendTimer = sendTimerMax;
      };

      /**
       * Draws the processing objects.
       */
      P.draw = function() {
        P.background(255);
        P.image(bg, 0, 0);

        if (sendTimer > 0) {
          sendTimer -= 1;
        }
        else if (sendTimer == 0) {
          transmission1.sendTransmission();
          transmission2.sendTransmission();
          transmission3.sendTransmission();
          sendTimer = sendTimerMax;
        }

        // draws all items
        transmission1.draw();
        transmission2.draw();
        transmission3.draw();
        server.draw();

        // updates all items.
        transmission1.transmissionAnim();
        transmission2.transmissionAnim();
        transmission3.transmissionAnim();
        server.draw();
      };
    };

    // adds the canvas tag.
    canvas = Y.Node.create('<canvas/>');
    canvas.appendTo('div#bd');

    processing = new Processing(canvas.getDOMNode(), sketchProc);
  }());
});
