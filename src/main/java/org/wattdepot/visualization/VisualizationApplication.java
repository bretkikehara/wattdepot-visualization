package org.wattdepot.visualization;

import org.apache.wicket.protocol.http.WebApplication;
import org.wattdepot.visualization.page.home.HomePage;

/**
 * Application object for your web application. If you want to run this application without
 * deploying, run the Start class.
 * 
 * @see com.mycompany.Start#main(String[])
 */
public class VisualizationApplication extends WebApplication {
  
  /**
   * @see org.apache.wicket.Application#getHomePage()
   */
  @Override
  public Class<HomePage> getHomePage() {
    return HomePage.class;
  }

  /**
   * @see org.apache.wicket.Application#init()
   */
  @Override
  public void init() {
    super.init();

    // add your configuration here
  }
}
