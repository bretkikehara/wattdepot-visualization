package org.wattdepot.visualization;

import org.apache.wicket.Session;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.request.Request;
import org.apache.wicket.request.Response;
import org.wattdepot.visualization.page.BasePage;
import org.wattdepot.visualization.page.home.HomePage;
import org.wattdepot.visualization.page.home.HomePageData;

/**
 * Defines the Visualzation Wicket web application.
 * 
 * @author Bret K. Ikehara
 */
public class VisualizationApplication extends WebApplication {

  @Override
  public Session newSession(Request request, Response response) {
    return new VisualizationSession(request);
  }

  @Override
  protected void init() {
    super.init();
    mountPage("/homeData", HomePageData.class);
  }
  
  /**
   * @see org.apache.wicket.Application#getHomePage()
   * 
   * @return {@link Class}&lt;? extends {@link BasePage}>
   */
  @Override
  public Class<? extends BasePage> getHomePage() {
    return HomePage.class;
  }
}