package edu.hawaii.wattdepot.visualization.page.home;

import org.junit.Test;
import edu.hawaii.wattdepot.visualization.AbstractPageTestHelper;

/**
 * Provides the tests for the Home page.
 * 
 * @author Bret K. Ikehara
 */
public class TestHomePage extends AbstractPageTestHelper {

  /**
   * Tests the start page.
   */
  @Test
  public void testStartPage() {
    tester.startPage(app.getHomePage());

    tester.assertRenderedPage(HomePage.class);
  }
}