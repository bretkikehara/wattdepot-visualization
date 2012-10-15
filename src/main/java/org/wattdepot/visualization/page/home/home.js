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
      var server, bg, timer, timerDef;

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
        
        timer = 0;
        timerDef = 30; 
      };

      /**
       * Draws the processing objects.
       */
      P.draw = function() {
        P.background(255);
        P.image(bg, 0, 0);

        // draws all items
        server.draw();

        // retrieves the newest WattDepot data.
        if (timer < 0) {
          // updates all items.
          Y.io('page goes here', {
            on : {
              success : function(id, o) {
                // parse response, then pass to update as an object.
                server.update();
              };
            }
          });
          timer = timerDef;
        }
        timer -= 1;
      };
    };

    // adds the canvas tag.
    canvas = Y.Node.create('<canvas/>');
    canvas.appendTo('div#bd');

    processing = new Processing(canvas.getDOMNode(), sketchProc);
  }());
});
