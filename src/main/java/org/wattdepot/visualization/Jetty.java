package org.wattdepot.visualization;

import org.apache.wicket.protocol.http.WicketFilter;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.webapp.WebAppContext;

/**
 * Enables WattDepot Web Applications to run inside the Jetty container.
 * 
 * @author Edward Meyer, Kendyll Doi, Bao Huy Ung, Bret K. Ikehara
 * @version 2.0
 */
public class Jetty {

  /** The context root. */
  private static String contextPath = "";

  /** The class corresponding to this web application. */
  private static String applicationClass = "org.wattdepot.visualization.VisualizationApplication";

  /**
   * Starts up Jetty and points it at Wicket. This method does not return until Jetty is shut down.
   * Jetty will check every five seconds for keyboard input from the console, and if it gets some,
   * it will shut down.
   * 
   * @param args If the user specifies a different restURI, dataURI, and/or port number. Any invalid
   * arguments are ignored. If no arguments are overwritten, defaults to public server.
   * @throws Exception If there are any problems.
   */
  public static void main(String[] args) throws Exception {
    FilterHolder holder = new FilterHolder(WicketFilter.class);
    holder.setInitParameter(WicketFilter.FILTER_MAPPING_PARAM, "/*");
    holder.setInitParameter("applicationClassName", applicationClass);

    WebAppContext context = new WebAppContext("", "/" + contextPath);
    context.addFilter(holder, "/*", WebAppContext.SESSIONS);
    context.setResourceBase("./src/main/webapp");

    int port;
    try {
      port = Integer.valueOf(System.getenv("PORT"), 10);
    }
    catch (Exception e) {
      port = 8081;
    }

    Server server = new Server(port);
    server.setHandler(context);
    try {
      server.start();
      System.out.printf("%nApplication at http://localhost:%s/%s. Press Return to exit.%n", port,
          contextPath);
      while (System.in.available() == 0) {
        Thread.sleep(5000);
      }
      server.stop();
      server.join();
    }
    catch (Exception e) {
      e.printStackTrace();
      System.exit(1);
    }
  }
}