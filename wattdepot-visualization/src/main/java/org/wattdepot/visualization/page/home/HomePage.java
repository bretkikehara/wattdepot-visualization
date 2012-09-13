package org.wattdepot.visualization.page.home;

import org.apache.wicket.markup.html.basic.Label;
import org.wattdepot.visualization.page.BasePage;

/**
 * Creates the home page.
 * 
 * @author Bret K. Ikehara
 */
public final class HomePage extends BasePage {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = -5869069458989539920L;

  @Override
  protected void onBeforeRender() {
    super.onBeforeRender();

    Label hd = new Label("hd", "Header");
    add(hd);

    Label bd = new Label("ft", "footer");
    add(bd);
  }
}