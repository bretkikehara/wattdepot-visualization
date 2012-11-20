package org.wattdepot.visualization.data;

import java.io.Serializable;

/**
 * Creates the base object to create the data for the drawing objects from.
 * 
 * @author Bret K. Ikehara
 */
public class AbstractObject implements Serializable {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = 3001539782686689568L;

  private double latitude = 0, longitude = 0;

  /**
   * Gets this latitude.
   * 
   * @return double
   */
  public double getLatitude() {
    return latitude;
  }

  /**
   * Sets this latitude.
   * 
   * @param d double
   */
  public void setLatitude(double d) {
    this.latitude = d;
  }

  /**
   * Gets this longitude.
   * 
   * @return double
   */
  public double getLongitude() {
    return longitude;
  }

  /**
   * Sets this longitude.
   * 
   * @param longitude double
   */
  public void setLongitude(double longitude) {
    this.longitude = longitude;
  }
}