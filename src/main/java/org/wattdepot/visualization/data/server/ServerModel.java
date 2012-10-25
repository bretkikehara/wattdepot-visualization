package org.wattdepot.visualization.data.server;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import org.wattdepot.visualization.data.sensor.SensorModel;

/**
 * Defines the server data.
 * 
 * @author Bret K. Ikehara
 * 
 */
public class ServerModel implements Serializable {

  /**
   * Default ID.
   */
  private static final long serialVersionUID = 8166398686892135188L;

  private int x, y;
  private final Map<String, SensorModel> sensors = new HashMap<String, SensorModel>();

  /**
   * Defines the server data.
   */
  public ServerModel() {
    this.x = 0;
    this.y = 0;
  }

  /**
   * Gets this x.
   * 
   * @return int
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
   * @return
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
   * Gets these sensors.
   * 
   * @return {@link Map}&lt;{@link String}, {@link SensorModel}&gt;
   */
  public Map<String, SensorModel> getSensors() {
    return sensors;
  }
}
