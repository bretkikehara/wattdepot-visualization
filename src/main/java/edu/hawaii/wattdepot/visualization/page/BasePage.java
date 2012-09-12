package edu.hawaii.wattdepot.visualization.page;

import org.apache.wicket.markup.html.IHeaderResponse;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.request.resource.PackageResourceReference;

/**
 * Defines the base page.
 * 
 * @author Bret K. Ikehara
 */
public abstract class BasePage extends WebPage {

  private static final PackageResourceReference JS_YUI = new PackageResourceReference(
      BasePage.class, "yui/3.6.0/build/yui/yui-min.js");

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = -8457083279783024998L;

  @Override
  public void renderHead(IHeaderResponse response) {
    response.renderJavaScriptReference(JS_YUI);
  }
}