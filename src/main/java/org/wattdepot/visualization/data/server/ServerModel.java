package org.wattdepot.visualization.data.server;

import java.util.HashMap;
import java.util.Map;
import org.wattdepot.visualization.data.AbstractObject;
import org.wattdepot.visualization.data.sensor.SensorModel;

/**
 * Defines the server data.
 * 
 * @author Bret K. Ikehara
 * 
 */
public class ServerModel extends AbstractObject {

  /**
   * Default ID.
   */
  private static final long serialVersionUID = 8166398686892135188L;

  private final Map<String, SensorModel> sensors = new HashMap<String, SensorModel>();

  /**
   * Gets these sensors.
   * 
   * @return {@link Map}&lt;{@link String}, {@link SensorModel}&gt;
   */
  public Map<String, SensorModel> getSensors() {
    return sensors;
  }
}
