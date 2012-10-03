/**
 * Creates the WattDepot sensor animation module.
 * 
 * @author Bret K. Ikehara
 */
YUI().add('wattdepot-sensor', function(Y) {
  Y.namespace("WattDepot");
  
  var Sensor, P;

  /**
   * Defines the WattDepot circle.
   */
  var Sensor = function(cnf) {
    // define the private fields.
    var o, P, key;

    // processing object.
    P = cnf.processing;

    // creates the object.
    o = {
      'radiusDef' : {
        value : 55,
        writeOnce : true
      }
      'radiusMax' : {
        value : 100,
        writeOnce : true
      },
      'colorHandler' : {
        value : 255,
        writeOnce : true
      }
      'colorDef' : {
        value : {0, 0, 0, 0}
      },
      'color' : {
        value : {0,0,0,0}
      },
      'colorHandler' : {
        value : function() {},
        writeOnce : true
      },
      'fade' : {
        value : 2
      },
      'x' : {
        value : 2
      },
      'y' : {
        value : 2
      },
      isAnim : {
        value : false
      }
    };
    o.radiusVal = o.radiusDef;
    o.color.val = o.color.def;
    
    // sets the default attributes
    this.addAttrs(attrs, o);
  };
  

  /**
   * Draws the sensor.
   */
  Sensor.prototype.draw = function() {
    var c, fill;

    c = P.color(o.color.val, 0, 0);
    fill = o.radiusMax - o.radiusVal;
    P.stroke(c, fill);
    P.fill(c, fill);
    P.ellipse(o.pos.x, o.pos.y, o.radiusVal, o.radiusVal);

    alpha = 255;
    P.stroke(c, alpha);
    P.fill(c, alpha);
    P.ellipse(o.pos.x, o.pos.y, o.radiusDef, o.radiusDef);
  };

  /**
   * Updates the sensor.
   */
  Sensor.prototype.update = function() {
    var endFade = false, endBlink = false;

    // animate when data was sent.
    if (o.isAnim) {
      endBlink = (o.color.val < o.color.min);
      endFade = (o.radiusVal > o.radiusMax);
      if (!endFade) {
        o.radiusVal += o.fade.o;
      }

      if (!endBlink) {
        o.color.val -= o.fade.i;
      }

      // end animation when both are done.
      if (endFade && endBlink) {
        o.isAnim = false;
      }
    }
  };

  /**
   * Sends the data.
   */
  Sensor.prototype.animate = function() {
    o.isAnim = true;
    o.radiusVal = o.radiusDef;
    o.color.val = o.color.def;
  };
  
  // add the attributes module's functions
  Y.augment(Sensor, Y.Attribute);

  // Define object in global space.
  Y.WattDepot.Sensor = Sensor;
}, '1.0.0', {
  requires : [ 'node-base', 'attribute' ]
});