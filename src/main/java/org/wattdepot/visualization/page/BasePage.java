package org.wattdepot.visualization.page;

import org.apache.wicket.markup.html.IHeaderResponse;
import org.apache.wicket.markup.html.WebPage;

/**
 * Defines the base page.
 * 
 * @author Bret K. Ikehara
 */
public abstract class BasePage extends WebPage {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = -8457083279783024998L;

  @Override
  public void renderHead(IHeaderResponse response) {
    response.renderJavaScriptReference("./yui/3.6.0/build/yui/yui-min.js");
    response.renderJavaScriptReference("./scripts/yui3config.js");
  }
}