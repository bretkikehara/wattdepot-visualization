package org.wattdepot.visualization.page;

import org.apache.wicket.markup.html.IHeaderResponse;
import org.apache.wicket.markup.html.WebPage;
import org.wattdepot.visualization.VisualizationSession;

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
    
    response.renderCSSReference("./yui/3.6.0/build/cssreset/cssreset-min.css");
    response.renderCSSReference("./yui/3.6.0/build/cssfonts/cssfonts-min.css");
    response.renderCSSReference("./yui/3.6.0/build/cssbase/cssbase-min.css");
    response.renderCSSReference("./yui/3.6.0/build/cssgrids/cssgrids-min.css");
    
    response.renderJavaScriptReference("./yui/3.6.0/build/yui/yui-min.js");
    response.renderJavaScriptReference("./scripts/yui3config.js");
  }
  
  /**
   * Gets this Visualization Session.
   * 
   * @return {@link VisualizationSession}
   */
  public VisualizationSession getAppSession() {
    return (VisualizationSession) getSession();
  }
}