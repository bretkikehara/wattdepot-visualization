package org.wattdepot.visualization.data.sensor;

import org.apache.wicket.markup.MarkupType;
import org.apache.wicket.markup.html.WebPage;
import org.wattdepot.visualization.VisualizationSession;
import com.google.gson.Gson;

/**
 * Outputs a GSON representation of the model.
 * 
 * @author Bret K. Ikehara
 *
 */
public class SensorData extends WebPage {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = -5916609858540589587L;
  
  @Override
  public MarkupType getMarkupType() {
    return new MarkupType("json", "application/json"); 
  }
  
  @Override
  public void renderPage() {
    
    // write a JSON response instead of an HTML page.
    VisualizationSession session = (VisualizationSession) getSession();
    Gson gson = new Gson();
    String res = gson.toJson(session.getServerModel().getSensors());
    
    getResponse().write(res);
  }
}