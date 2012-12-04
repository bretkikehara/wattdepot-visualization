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

  private static final PackageResourceReference CSS_HOME = new PackageResourceReference(
      HomePage.class, "HomePage.css");

  private Label hd, bd;

  /**
   * Default Constructor.
   */
  public HomePage() {
    hd = new Label("hd", "");

    bd = new Label("ft", "");
  }

  @Override
  protected void onBeforeRender() {
    super.onBeforeRender();

    add(hd);

    add(bd);
  }

  @Override
  public void renderHead(IHeaderResponse response) {
    super.renderHead(response);
    response.renderCSSReference(CSS_HOME);
    response.renderJavaScriptReference(JS_HOME);
  }
}