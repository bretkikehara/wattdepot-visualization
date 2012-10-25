package org.wattdepot.visualization.page.home;

import java.io.Serializable;

/**
 * Enables the drop down to handle a choice.
 * 
 * @author Bret K. Ikehara
 */
class HomePageChoice implements Serializable {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = -3896542444188346533L;
  private Integer value;
  private String key;

  /**
   * Default constructor.
   * 
   * @param key {@link String}
   * @param value int
   */
  public HomePageChoice(String key, Integer value) {
    this.setKey(key);
    this.setValue(value);
  }

  /**
   * Gets this key.
   * 
   * @return {@link String}
   */
  public String getKey() {
    return key;
  }

  /**
   * Sets this key.
   * 
   * @param key {@link String}
   */
  public void setKey(String key) {
    this.key = key;
  }

  /**
   * Gets this value.
   * 
   * @return {@link Integer}
   */
  public Integer getValue() {
    return value;
  }

  /**
   * Sets this value.
   * 
   * @param value {@link Integer}
   */
  public void setValue(Integer value) {
    this.value = value;
  }
}