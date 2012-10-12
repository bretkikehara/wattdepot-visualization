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
            x : 375,
            y : 335
          } ]
        });

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
          server.animate();
          sendTimer = sendTimerMax;
        }

        // draws all items
        server.draw();

        // updates all items.
        server.update();
      };
    };

    // adds the canvas tag.
    canvas = Y.Node.create('<canvas/>');
    canvas.appendTo('div#bd');

    processing = new Processing(canvas.getDOMNode(), sketchProc);
  }());
});
