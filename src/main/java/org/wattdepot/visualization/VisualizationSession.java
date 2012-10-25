 package org.wattdepot.visualization;

import org.apache.wicket.Session;
import org.apache.wicket.request.ClientInfo;
import org.apache.wicket.request.Request;
import org.wattdepot.visualization.page.home.HomePageModel;

/**
 * Defines the custom session for our visualization application.
 * 
 * @author Bret K. Ikehara
 */
public class VisualizationSession extends Session {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = -758160945813555627L;

  private HomePageModel homePageData;
  
  /**
   * Defines the visualization app's session.
   * 
   * @param request {@link Request}
   */
  public VisualizationSession(Request request) {
    super(request);
    homePageData = new HomePageModel();
  }

  @Override
  public void cleanupFeedbackMessages() {
    // TODO Auto-generated method stub    
  }

  @Override
  public ClientInfo getClientInfo() {
    // TODO Auto-generated method stub
    return null;
  }
  
  /**
   * Gets the home page data model.
   * 
   * @return {@link HomePageModel}
   */
  public HomePageModel getHomePageData() {
    return homePageData;
  }
}