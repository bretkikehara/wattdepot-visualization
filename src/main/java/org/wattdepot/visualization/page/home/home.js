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
        c = [ 0, 0, 255, 0 ];
        cHndlr = function(P, o) {
          o.color[2] -= 2;
        };
        r = 10;

        // creates the server
        server = new W.Server(P, {
          x : 330,
          y : 255,
          sensors : {
            '1' : {
              radius : r,
              color : c,
              colorHandler : cHndlr,
              x : 95,
              y : 55
            },
            '2' : {

              radius : r,
              color : c,
              colorHandler : cHndlr,
              x : 415,
              y : 55
            },
            '3' : {
              radius : r,
              color : c,
              colorHandler : cHndlr,
              x : 375,
              y : 335
            }
          }
        });

        timer = 0;
        timerDef = 100;
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
                online : (Math.random() > 0.50)
              },
              '2' : {
                isAnim : (Math.random() > 0.50)
              },
              '3' : {
                isAnim : (Math.random() > 0.50)
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
    canvas = Y.Node.create('<canvas/>');
    canvas.appendTo('div#bd');

    processing = new Processing(canvas.getDOMNode(), sketchProc);
  }());
});
