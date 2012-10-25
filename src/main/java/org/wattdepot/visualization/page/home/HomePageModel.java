package org.wattdepot.visualization.page.home;

import java.io.Serializable;

/**
 * Defines the Home Page data.
 * 
 * @author Bret K. Ikehara
 * 
 */
public class HomePageModel implements Serializable {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = 264552226967576992L;
  private boolean sensor1Switch, sensor2Switch;
  private Integer sensor3Color;

  /**
   * Default Construtor.
   */
  public HomePageModel() {
    sensor1Switch = false;
    sensor2Switch = false;
    sensor3Color = 90;
  }

  /**
   * Checks whether this switch in on.
   * 
   * @return boolean
   */
  public boolean isSensor1Switch() {
    return sensor1Switch;
  }

  /**
   * Sets this switches state.
   * 
   * @param sensor1Switch boolean
   */
  public void setSensor1Switch(boolean sensor1Switch) {
    this.sensor1Switch = sensor1Switch;
  }
  

  /**
   * Checks whether this switch in on.
   * 
   * @return boolean
   */
  public boolean isSensor2Switch() {
    return sensor2Switch;
  }

  /**
   * Sets this switches state.
   * 
   * @param sensor2Switch boolean
   */
  public void setSensor2Switch(boolean sensor2Switch) {
    this.sensor2Switch = sensor2Switch;
  }

  /**
   * Gets this color.
   * 
   * @return {@link Integer}
   */
  public Integer getSensor3Color() {
    return sensor3Color;
  }

  /**
   * Sets this sensor's color.
   * 
   * @param sensor3Color {@link Integer}
   */
  public void setSensor3Color(Integer sensor3Color) {
    if (sensor3Color != null) {
      this.sensor3Color = sensor3Color;
    }
  }
}