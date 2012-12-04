package org.wattdepot.visualization;

import java.util.Map;
import org.apache.wicket.Session;
import org.apache.wicket.request.ClientInfo;
import org.apache.wicket.request.Request;
import org.wattdepot.visualization.data.sensor.SensorModel;
import org.wattdepot.visualization.data.server.ServerModel;

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

  private ServerModel serverModel;

  /**
   * Defines the visualization app's session.
   * 
   * @param request {@link Request}
   */
  public VisualizationSession(Request request) {
    super(request);
    serverModel = new ServerModel();
    serverModel.setLatitude(21.297541420671582);
    serverModel.setLongitude(-157.81622171401978);
    Map<String, SensorModel> map = serverModel.getSensors();

    SensorModel sensorModel = new SensorModel();
    sensorModel.setLatitude(21.297851);
    sensorModel.setLongitude(-157.820835);
    sensorModel.setPulse(Math.random() * 100 > 50);
    sensorModel.setEnergy((float) Math.random() * 1000);
    map.put("1", sensorModel);

    sensorModel = new SensorModel();
    sensorModel.setLatitude(21.30058);
    sensorModel.setLongitude(-157.81618);
    sensorModel.setPulse(Math.random() * 100 > 50);
    sensorModel.setEnergy((float) Math.random() * 1000);
    map.put("2", sensorModel);

    sensorModel = new SensorModel();
    sensorModel.setLatitude(21.29639);
    sensorModel.setLongitude(-157.81734);
    sensorModel.setPulse(true);
    sensorModel.setEnergy((float) Math.random() * 1000);
    map.put("3", sensorModel);

    sensorModel = new SensorModel();
    sensorModel.setLatitude(21.30031);
    sensorModel.setLongitude(-157.81719);
    sensorModel.setPulse(true);
    sensorModel.setEnergy((float) Math.random() * 1000);
    map.put("4", sensorModel);

    sensorModel = new SensorModel();
    sensorModel.setLatitude(21.29915);
    sensorModel.setLongitude(-157.81725);
    sensorModel.setPulse(true);
    sensorModel.setEnergy((float) Math.random() * 1000);
    map.put("5", sensorModel);

    sensorModel = new SensorModel();
    sensorModel.setLatitude(21.29820);
    sensorModel.setLongitude(-157.81862);
    sensorModel.setPulse(true);
    sensorModel.setEnergy((float) Math.random() * 1000);
    map.put("6", sensorModel);

    sensorModel = new SensorModel();
    sensorModel.setLatitude(21.29850);
    sensorModel.setLongitude(-157.82033);
    sensorModel.setPulse(true);
    sensorModel.setEnergy((float) Math.random() * 1000);
    map.put("7", sensorModel);

    sensorModel = new SensorModel();
    sensorModel.setLatitude(21.29496);
    sensorModel.setLongitude(-157.81849);
    sensorModel.setPulse(true);
    sensorModel.setEnergy((float) Math.random() * 1000);
    map.put("8", sensorModel);

    sensorModel = new SensorModel();
    sensorModel.setLatitude(21.29428);
    sensorModel.setLongitude(-157.81887);
    sensorModel.setPulse(true);
    sensorModel.setEnergy((float) Math.random() * 1000);
    map.put("9", sensorModel);

    sensorModel = new SensorModel();
    sensorModel.setLatitude(21.29569);
    sensorModel.setLongitude(-157.81399);
    sensorModel.setPulse(true);
    sensorModel.setEnergy((float) Math.random() * 1000);
    map.put("10", sensorModel);
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
   * Gets the server model.
   * 
   * @return {@link ServerModel}
   */
  public ServerModel getServerModel() {
    return serverModel;
  }
}