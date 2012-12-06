YUI().use(
    'node',
    'io',
    'json-parse',
    'wattdepotsensor',
    'wattdepotserver',
    'overlay',
    function(Y) {
      'use strict';
      var server = null, canvas, map, mapN, overlay, scaleH, positionH, tt, timeoutH;

      // defines the nodes.
      canvas = Y.one('canvas');
      mapN = Y.one('#maps');
      mapN.setStyle('height', 600);
      mapN.setStyle('width', 600);

      tt = new Y.Overlay({
        srcNode : '#wattdepot-tt',
        width : 200,
        visible : false,
        render : true,
        zIndex : 1000
      });

      tt.get('contentBox').addClass('wattdepot-tt');

      /**
       * Updates the canvas position so the drawing doesn't cut off on drag.
       */
      positionH = function(map) {
        var key, sensor, updateH;

        // ensures that the drawing canvas is correctly positioned over the
        // map.
        canvas.setX(mapN.getX());
        canvas.setY(mapN.getY());

        // handle all the long/lat update to xy conversion here.
        if (!!server) {
          updateH = function(val) {
            return overlay.getProjection().fromLatLngToContainerPixel(val);
          };

          // update the sensor coordinates
          for (key in server.getSensors()) {
            sensor = server.getSensors()[key];
            sensor.updateXY(updateH);
          }

          // updates the server coordinates
          server.updateXY(updateH);
        }
      };

      /**
       * Handles sensor scaling.
       * 
       * @param map
       *          {Object} Google Map Object.
       */
      scaleH = function(map) {
        var z, sensor, maxE = 0, r, s, minScale, maxScale, key;
        z = map.getZoom() - 15;

        if (!!server) {
          for (key in server.getSensors()) {
            sensor = server.getSensors()[key];
            // TODO update when integrating real energy data.
            if (sensor.getEnergy() > maxE) {
              maxE = sensor.getEnergy();
            }
          }

          // ((energy / (maxEnergy / maxScale)) + 1) * zoom
          // increase denominator for larger scaling.
          minScale = 1;
          maxScale = 7;
          s = (maxE / maxScale);
          for (key in server.getSensors()) {
            sensor = server.getSensors()[key];
            // increase
            r = (sensor.getEnergy() / s);
            if (r < minScale) {
              r = minScale;
            }
            sensor.setRadius(r * z);

            // scales the line
            sensor.scaleLine();
          }

        }
      };

      // initialize the map
      map = new google.maps.Map(mapN.getDOMNode(), {
        center : new google.maps.LatLng(21.297541420671582, -157.81622171401978),
        zoom : 16,
        maxZoom : 19,
        minZoom : 16,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      });

      // create the processing layer.
      overlay = new google.maps.OverlayView();
      overlay.setMap(map);
      overlay.draw = function() {
        // need to define an empty function.
      };
      google.maps.event.addListener(map, 'drag', function() {
        positionH();
      });
      google.maps.event.addListener(map, 'zoom_changed', function() {
        positionH();
        scaleH(map);
      });
      google.maps.event.addListener(map, 'tilesloaded', function() {
        // add the processing canvas overlay after the maps have loaded.
        canvas.appendTo(overlay.getPanes().overlayLayer);

        positionH();
        scaleH(map);
      });

      google.maps.event.addListener(map, 'mousemove', function(e) {
        var key, sensor, x, y, hover = false;

        x = e.pixel.x + 15;
        y = e.pixel.y + 15;
        for (key in server.getSensors()) {
          sensor = server.getSensors()[key];
          if (Math.pow(x - sensor.getX(), 2) + Math.pow(y - sensor.getY(), 2) <= Math.pow(sensor
              .getMaxRadius(), 2)) {
            tt.set('bodyContent', sensor.getInfo());
            tt.set('x', x);
            tt.set('y', y);
            tt.show();
            if (!!timeoutH) {
              clearTimeout(timeoutH);
            }
            timeoutH = setTimeout(function() {
              timeoutH = null;
              tt.hide();
            }, 3000);
            hover = true;
            break;
          }
        }
      });

      /**
       * Sketches the processing app.
       */
      new Processing(canvas.getDOMNode(), function(P) {
        var timer, timerDef, error, serverData;

        /**
         * Set up the processing object.
         */
        P.setup = function() {
          P.size(parseInt(mapN.getStyle('width'), 10), parseInt(mapN.getStyle('height'), 10));

          // creates the server
          Y.io('/data/server', {
            on : {
              success : function(id, o) {
                serverData = Y.JSON.parse(o.responseText);
                server = new Y.WattDepot.Server(P, serverData);
                serverData = null;
              }
            }
          });

          // sets update interval
          timer = 0;
          timerDef = 50;

          // set the hue/saturation/brightness color mode.
          P.colorMode(P.HSB);

          error = 0;
        };

        /**
         * Draws the processing objects.
         */
        P.draw = function() {
          P.background(255, 0);

          if (!!server) {
            // draws all items
            server.draw();

            // retrieves the newest WattDepot data.
            if (timer < 0 && error < 3) {
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
            if (!!serverData) {
              scaleH(map);
            }
            serverData = null;
            timer -= 1;
          }
        };
      });
    });
