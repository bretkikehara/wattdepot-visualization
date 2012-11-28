YUI()
    .use(
        'node',
        'io',
        'json-parse',
        'wattdepotsensor',
        'wattdepot-transmission',
        'wattdepotserver',
        function(Y) {
          var P, server, W, G, sketchProc, canvas, serverData, map, view, width, height, zoomHandler, updateCanvasPosition, error;

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
          updateCanvasPosition = function(map) {
            var key, sensor;

            // ensures that the drawing canvas is correctly positioned over the
            // map.
            canvas.setX(mapN.getX());
            canvas.setY(mapN.getY());

            // handle all the long/lat update to xy conversion here.
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

          /**
           * Handles sensor scaling.
           * 
           * @param map
           *          {Object} Google Map Object.
           */
          zoomHandler = function(map) {
            var z, sensor, maxE = 0, r, s, minScale, maxScale;
            z = map.getZoom() - 15;

            if (!!server) {
              for (key in server.getSensors()) {
                sensor = server.getSensors()[key];
                // TODO update when integrating real energy data.
                if (sensor.getEnergy() && sensor.getEnergy() > maxE) {
                  maxE = sensor.getEnergy();
                }
              }

              // ((energy / (maxEnergy / maxScale)) + 1) * zoom
              // increase denominator for larger scaling.
              minScale = 1;
              maxScale = 7;
              s = (maxE / maxScale);
              for (key in server.getSensors()) {
                // increase
                r = (sensor.getEnergy() / s + minScale) * z;
                Y.log(sensor.getEnergy());
                Y.log(key + ': ' + r);
                sensor = server.getSensors()[key];
                sensor.setRadius(r);
              }
            }
          };

          width = 600;
          height = 600;

          // initialize the map
          mapN = Y.one('#maps');
          mapN.setStyle('height', height);
          mapN.setStyle('width', width);
          map = new G.Map(mapN.getDOMNode(), {
            center : new G.LatLng(21.30058, -157.81618),
            zoom : 17,
            maxZoom : 19,
            minZoom : 16,
            mapTypeId : G.MapTypeId.ROADMAP
          });

          // create the processing layer.
          view = new G.OverlayView();
          view.setMap(map);
          view.draw = function() {
            // need to define an empty function.
          };
          google.maps.event.addListener(map, 'drag', function() {
            updateCanvasPosition();
          });
          google.maps.event.addListener(map, 'zoom_changed', function() {
            updateCanvasPosition();
            zoomHandler(map);
          });
          google.maps.event.addListener(map, 'tilesloaded', function() {
            // add the processing canvas overlay after the maps have loaded.
            view.getPanes().overlayLayer.appendChild(canvas.getDOMNode());

            updateCanvasPosition();
            zoomHandler(map);
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

              error = 0;
            };

            /**
             * Draws the processing objects.
             */
            P.draw = function() {
              P.background(255, 0);

              // draws all items
              server.draw();

              // retrieves the newest WattDepot data.
              if (timer < 0 && error < 4) {
                // updates all items.
                Y.io('data/server', {
                  on : {
                    success : function(id, o) {
                      // parse response, then pass to update as an object.
                      serverData = Y.JSON.parse(o.responseText);
                    },
                    failure : function(id, o) {
                      error += 1;
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
