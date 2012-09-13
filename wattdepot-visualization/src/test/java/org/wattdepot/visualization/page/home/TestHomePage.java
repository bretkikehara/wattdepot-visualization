package org.wattdepot.visualization.page.home;

import org.junit.Test;
import org.wattdepot.visualization.AbstractPageTestHelper;
import org.wattdepot.visualization.page.home.HomePage;

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