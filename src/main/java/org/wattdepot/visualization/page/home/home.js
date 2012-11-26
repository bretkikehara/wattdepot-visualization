YUI()
    .use(
        'node',
        'io',
        'json-parse',
        'wattdepotsensor',
        'wattdepot-transmission',
        'wattdepotserver',
        function(Y) {
          var P, server, W, G, sketchProc, canvas, serverData, map, view, width, height, getPointFromLatLong, updateCanvasPosition;

          // short cut.
          W = Y.WattDepot;
          G = google.maps;

          /**
           * Gets a xy point from longitude latitude.
           * 
           * @param latLong
           *          google.maps.LatLng
           */
          getPointFromLatLong = function(latLong) {
            return view.getProjection().fromLatLngToContainerPixel(latLong);
          };

          /**
           * Updates the canvas position so the drawing doesn't cut off on drag.
           */
          updateCanvasPosition = function() {
            // TODO find a better way to update the position.
            // ensure the canvas is always positioned at the top left of the
            // map.
            var viewN = canvas.get('parentNode').get('parentNode').get('parentNode');
            canvas.setStyle('left', (parseInt(viewN.getStyle('left'), 10) * -1) + 'px');
            canvas.setStyle('top', (parseInt(viewN.getStyle('top'), 10) * -1) + 'px');

            // handle all the long/lat update to xy conversion here.
            var key, sensor, reg;

            if (!!server) {
              // update the sensor coordinates
              for (key in server.getSensors()) {
                sensor = server.getSensors()[key];
                sensor.updateXY(getPointFromLatLong);
              }

              // updates the server coordinates
              server.updateXY(getPointFromLatLong);
            }
          };

          width = 1000;
          height = 1000;

          // initialize the map
          mapN = Y.one('#maps');
          mapN.setStyle('height', height);
          mapN.setStyle('width', width);
          map = new G.Map(mapN.getDOMNode(), {
            center : new G.LatLng(21.30058, -157.81618),
            zoom : 15,
            mapTypeId : G.MapTypeId.ROADMAP
          });

          // create the processing layer.
          view = new G.OverlayView();
          view.setMap(map);
          view.draw = function() {
            // nothing here.
          };
          google.maps.event.addListener(map, 'drag', function() {
            updateCanvasPosition();
          });
          google.maps.event.addListener(map, 'zoom_changed', function() {
            updateCanvasPosition();
          });
          google.maps.event.addListener(map, 'dragend', function() {
            // update the sensors.
            view.draw();
          });
          google.maps.event.addListener(map, 'tilesloaded', function() {
            // add the processing canvas overlay after the maps have loaded.
            view.getPanes().overlayLayer.appendChild(canvas.getDOMNode());

            updateCanvasPosition();
          });

          /**
           * Sketches the processing app.
           */
          sketchProc = function(P) {
            var bg, timer, timerDef;

            /**
             * Set up the processing object.
             */
            P.setup = function() {
              P.size(width, height);

              // PImage background;
              bg = P.loadImage("/images/UHmap.png");

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
              P.background(255, 0);

              // draws all items
              server.draw();

              // retrieves the newest WattDepot data.
              if (timer < 0) {
                // updates all items.
                Y.io('data/server', {
                  on : {
                    success : function(id, o) {
                      // parse response, then pass to update as an object.
                      serverData = Y.JSON.parse(o.responseText);
                    }
                  }
                });
                timer = timerDef;
              }

              // updates the server
              server.update(serverData);
              serverData = null;
              timer -= 1;
            };
          };

          // adds the canvas tag.
          canvas = Y.one('canvas');
          canvas.setStyle('position', 'absolute');
          canvas.setStyle('border', '1px solid red');

          // get the server data before starting animation.
          Y.io('/data/server', {
            on : {
              success : function(id, o) {
                serverData = Y.JSON.parse(o.responseText);
                P = new Processing(canvas.getDOMNode(), sketchProc);
              }
            }
          });
        });
