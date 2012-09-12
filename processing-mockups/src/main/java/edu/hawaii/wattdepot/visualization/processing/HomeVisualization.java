package edu.hawaii.wattdepot.visualization.processing;

import java.awt.Color;
import processing.core.PApplet;

public class HomeVisualization extends PApplet {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = -1867486309443871259L;

  private Appliance[] appliances = { new Appliance("app 1", new Circle(400, 420, 120)),
      new Appliance("app 2", new Circle(100, 100, 70)),
      new Appliance("app 3", new Circle(360, 140, 50)),
      new Appliance("app 4", new Circle(70, 370, 10)) };

  public void setup() {
    size(500, 500);
  }

  public void draw() {
    // draw the lines
    for (int i = 0; i < appliances.length; i += 1) {
      appliances[i].draw(250, 250);
    }

    // draw the home.
    fill(255, 255, 255);
    rect(210, 190, 80, 80, 5);
    triangle(200, 200, 300, 200, 250, 150);
  }

  public class Appliance {
    String name;
    Circle circle;

    public Appliance(String name, Circle c) {
      this.name = name;
      this.circle = c;
    }

    // draw line to these points
    void draw(float x, float y) {
      fill(255, 255, 255);
      line(x, y, circle.x, circle.y);

      // draw circle based on amount of electricity used with color.
      float hue = (110 - circle.r % 360) / 360;
      Color color = Color.getHSBColor(hue, 1f, 1f);
      fill(color.getRed(), color.getGreen(), color.getBlue());
      ellipse(circle.x, circle.y, circle.r, circle.r);

      fill(0, 102, 153);
      text(name, circle.x - circle.r + 10, circle.y);
    }
  }

  public class Circle {
    float x, y, r;

    public Circle(float x, float y, float r) {
      this.x = x;
      this.y = y;
      this.r = r;
    }
  }
}
