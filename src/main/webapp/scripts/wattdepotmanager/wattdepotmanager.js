/**
 * Creates the sensor manager.
 * 
 * @author Bret K. Ikehara
 */
YUI().add('wattdepotmanager', function(Y) {
  Y.namespace('WattDepot');

  /**
   * Manager object for the sensor, transmission line, and the server.
   */
  var Manager = function() {

    return {
      draw : function() {
        
      },
      update : function() {
        
      }
    };
  };

  Y.WattDepot.Manager = Manager;
}, '1.0.0', {
  requires : [ 'processing', 'wattdepotsensor', 'wattdepot.transmission', 'wattdepotserver' ]
});