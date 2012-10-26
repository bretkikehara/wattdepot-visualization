YUI().use('node', 'io', 'json-parse', 'wattdepotsensor', 'wattdepot-transmission',
    'wattdepotserver', function(Y) {
      var processing, W, serverData;

      // short cut.
      W = Y.WattDepot;

      (function() {
        var sketchProc, canvas;
        /**
         * Sketches the processing app.
         */
        sketchProc = function(P) {
          var server, bg, timer, timerDef;

          /**
           * Set up the processing object.
           */
          P.setup = function() {
            P.size(600, 400);

            // PImage background;
            bg = P.loadImage("/images/UHmap.png");

            var c, cHndlr, r;
            c = [ 0, 255, 255, 0 ];
            r = 10;

            // creates the server
            server = new W.Server(P, serverData);
            serverData = null;

            // sets update interval
            timer = 0;
            timerDef = 100;

            // set the hue/saturation/brightness color mode.
            P.colorMode(P.HSB);
          };

          /**
           * Draws the processing objects.
           */
          P.draw = function() {
            P.background(255);
            P.image(bg, 0, 0);

            // draws all items
            server.draw();

            // updates the server
            server.update();

            // retrieves the newest WattDepot data.
            if (timer < 0) {
              // updates all items.
              Y.io('data/server', {
                on : {
                  success : function(id, o) {
                    // parse response, then pass to update as an object.
                    serverData = Y.JSON.parse(o.responseText);
                    server.update(serverData);
                    serverData = null;
                  }
                }
              });

              timer = timerDef;
            }
            timer -= 1;
          };
        };

        // adds the canvas tag.
        canvas = Y.one('canvas');

        // get the server data before starting animation.
        Y.io('/data/server', {
          on : {
            success : function(id, o) {
              serverData = Y.JSON.parse(o.responseText);
              processing = new Processing(canvas.getDOMNode(), sketchProc);
            }
          }
        });
      }());
    });
