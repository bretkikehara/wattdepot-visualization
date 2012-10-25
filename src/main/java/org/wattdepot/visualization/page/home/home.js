YUI().use('node', 'wattdepotsensor', 'wattdepot-transmission', 'wattdepotserver', function(Y) {
  var processing, W;

  // short cut.
  W = Y.WattDepot;

  (function() {
    var sketchProc, canvas, updateObj;
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
        server = new W.Server(P, {
          x : 330,
          y : 255,
          sensors : {
            '1' : {
              radius : r,
              color : [90, 255, 255],
              x : 95,
              y : 55
            },
            '2' : {
              radius : r,
              color : c,
              x : 415,
              y : 55
            },
            '3' : {
              radius : r,
              color : c,
              x : 375,
              y : 335
            }
          }
        });

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
          // Y.io('page goes here', {
          // on : {
          // success : function(id, o) {
          // // parse response, then pass to update as an object.
          // };
          // }
          // });

          // remove once the xml page is done.
          updateObj = {
            sensors : {
              '1' : {
                isOnline : (Math.random() > 0.50)
              },
              '2' : {
                isPulse : (Math.random() > 0.50)
              },
              '3' : {
                isPulse : true,
                color : [Math.random() * 90, 255, 255, 0]
              }
            }
          };
          timer = timerDef;
        }
        timer -= 1;

        // update the server drawing.
        server.update(updateObj);
        updateObj = null;
      };
    };

    // adds the canvas tag.
    canvas = Y.one('canvas');

    processing = new Processing(canvas.getDOMNode(), sketchProc);
  }());
});
