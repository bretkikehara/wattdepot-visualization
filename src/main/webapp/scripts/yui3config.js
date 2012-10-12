/**
 * Defines all the WattDepot modules.
 */
(function() {
  YUI.GlobalConfig =
      {
        groups : {
          visual : {
            base : './scripts/',
            filter : '',
            modules : {
              'processing' : {
                fullpath : './scripts/processing/processing-1.4.1.min.js'
              },
              'wattdepotsensor' : {
                fullpath : './scripts/wattdepotsensor/wattdepotsensor.js',
                requires : [ 'processing' ]
              },
              'wattdepotserver' : {
                fullpath : './scripts/wattdepotserver/wattdepotserver.js',
                requires : [ 'processing', 'wattdepotsensor', 'wattdepot-transmission' ]
              }
            }
          }
        }
      };
}());