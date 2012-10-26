package org.wattdepot.visualization.data.sensor;

import java.io.Serializable;

/**
 * Defines the sensor data.
 * 
 * @author Bret K. Ikehara
 */
public class SensorModel implements Serializable {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = 6632789215916215668L;
  private int radius, x, y;
  private int[] color;
  private boolean online, pulse;

  /**
   * Default constructor.
   */
  public SensorModel() {
    this.radius = 0;
    this.x = 0;
    this.y = 0;
    this.color = new int[] { 90, 255, 255, 255 };
    this.online = true;
    this.pulse = false;
  }

  /**
   * Gets this radius.
   * 
   * @return int
   */
  public int getRadius() {
    System.out.println(this.radius);
    return this.radius;
  }

  /**
   * Gets this x.
   * 
   * @return
   */
  public int getX() {
    return x;
  }

  /**
   * Sets this x.
   * 
   * @param x int
   */
  public void setX(int x) {
    this.x = x;
  }

  /**
   * Gets this y.
   * 
   * @return int
   */
  public int getY() {
    return y;
  }

  /**
   * Sets this y.
   * 
   * @param y int
   */
  public void setY(int y) {
    this.y = y;
  }

  /**
   * Gets this color.
   * 
   * @return int[]
   */
  public int[] getColor() {
    return color;
  }

  /**
   * Sets this color.
   * 
   * @param color int[]
   */
  public void setColor(int[] color) {
    if (this.color[0] >= 0 && this.color[0] <= 90) {
      this.color = color;
      this.radius = (90 - this.color[0]) / 10 + 10;
    }
  }

  /**
   * Is this online.
   * 
   * @return boolean
   */
  public boolean isOnline() {
    return online;
  }

  /**
   * Set this online.
   * 
   * @param online
   */
  public void setOnline(boolean online) {
    this.online = online;
  }

  /**
   * Is this pulsing.
   * 
   * @return boolean
   */
  public boolean isPulse() {
    return pulse;
  }

  /**
   * Sets this pulse.
   * 
   * @param pulse boolean
   */
  public void setPulse(boolean pulse) {
    this.pulse = pulse;
    // set the pulse but
    if (this.pulse) {
      this.online = true;
    }
  }
}