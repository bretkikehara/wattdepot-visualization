// Creates the transmission line animations between sensors and servers
// @author Anthony Xu, Bret K. Ikehara

YUI().add('wattdepot-transmission', function(Y) {
  Y.namespace("WattDepot");

  // Defines WattDepot transmission
  var Transmission = function(P, cnf) {

    var o;

    o = {

    };

    o.isDraw = false;

    // processing
    P = processing;

    // Defines the public functions
    return {
      draw : function() {

      },
      update : function(obj) {

        if (!!obj) {

        }

        if (o.isDraw) {

        }
      }
    };
  };

  Y.WattDepot.Transmission = Transmission;
}, '1.0.0', {
  requires : [ 'node-base' ]
});