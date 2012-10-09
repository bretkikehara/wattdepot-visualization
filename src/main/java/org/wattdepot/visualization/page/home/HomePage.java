package org.wattdepot.visualization.page.home;

import org.apache.wicket.markup.html.IHeaderResponse;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.request.resource.PackageResourceReference;
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

  private static final PackageResourceReference JS_HOME = new PackageResourceReference(
      HomePage.class, "home.js");

  private static final PackageResourceReference JS_TRANSMISSION = new PackageResourceReference(
      HomePage.class, "transmission.js");

  @Override
  protected void onBeforeRender() {
    super.onBeforeRender();

    Label hd = new Label("hd", "");
    add(hd);

    Label bd = new Label("ft", "");
    add(bd);

  }

  @Override
  public void renderHead(IHeaderResponse response) {
    super.renderHead(response);

    response.renderJavaScriptReference(JS_TRANSMISSION);
    response.renderJavaScriptReference(JS_HOME);
  }
}