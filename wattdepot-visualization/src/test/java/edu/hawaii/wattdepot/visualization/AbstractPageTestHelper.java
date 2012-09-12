package edu.hawaii.wattdepot.visualization;

import org.apache.wicket.util.tester.WicketTester;
import org.junit.Before;

/**
 * Defines the abstract test helper.
 * 
 * @author Bret K. Ikehara
 */
public class AbstractPageTestHelper {

  protected WicketTester tester;
  protected VisualizationApplication app;

  /**
   * Sets up the webapp test.
   */
  @Before
  public void setUp() {
    app = new VisualizationApplication();
    tester = new WicketTester(app);
  }
}
