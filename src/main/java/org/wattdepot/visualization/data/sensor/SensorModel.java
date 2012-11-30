package org.wattdepot.visualization.data.sensor;

import org.wattdepot.visualization.data.AbstractObject;

/**
 * Defines the sensor data.
 * 
 * @author Bret K. Ikehara
 */
public class SensorModel extends AbstractObject {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = 6632789215916215668L;
  private float energy;
  private boolean online, pulse;

  /**
   * Default constructor.
   */
  public SensorModel() {
    this.online = true;
    this.pulse = false;
    this.energy = 0f;
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
   * @param online boolean
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

  /**
   * Sets this energy.
   * 
   * @param val float
   */
  public void setEnergy(float val) {
    this.energy = val;
  }

  /**
   * Gets this energy.
   * 
   * @return float
   */
  public float getEnergy() {
    return this.energy;
  }
}