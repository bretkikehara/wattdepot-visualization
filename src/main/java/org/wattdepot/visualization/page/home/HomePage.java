package org.wattdepot.visualization.page.home;

import java.util.Arrays;
import java.util.List;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.AjaxFormComponentUpdatingBehavior;
import org.apache.wicket.markup.html.IHeaderResponse;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.CheckBox;
import org.apache.wicket.markup.html.form.ChoiceRenderer;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.resource.PackageResourceReference;
import org.wattdepot.visualization.page.BasePage;

/**
 * Creates the home page.
 * 
 * @author Bret K. Ikehara
 */
public final class HomePage extends BasePage {

  /**
   * Serial ID.
   */
  private static final long serialVersionUID = -5869069458989539920L;

  private static final PackageResourceReference JS_HOME = new PackageResourceReference(
      HomePage.class, "home.js");

  private static final PackageResourceReference JS_TRANSMISSION = new PackageResourceReference(
      HomePage.class, "transmission.js");

  private HomePageModel data;

  private Label hd, bd;
  private Form<HomePageModel> form;
  private CheckBox sensor1, sensor2;
  private DropDownChoice<HomePageChoice> select;

  /**
   * Define th change behavior for the update.
   * 
   * @author Bret K. Ikehara
   */
  static class ChangeBehavior extends AjaxFormComponentUpdatingBehavior {

    private Form<HomePageModel> form;

    /**
     * Default Constructor.
     */
    public ChangeBehavior(Form<HomePageModel> form) {
      super("onchange");
      this.form = form;
    }

    /**
     * Serial ID.
     */
    private static final long serialVersionUID = -7240939017685146857L;

    @Override
    protected void onUpdate(AjaxRequestTarget target) {
      target.add(form);
    }
  };

  /**
   * Default Constructor.
   */
  public HomePage() {
    data = getAppSession().getHomePageData();
    hd = new Label("hd", "");

    bd = new Label("ft", "");

    form = new Form<HomePageModel>("form", new CompoundPropertyModel<HomePageModel>(data));
    form.setOutputMarkupId(true);
    sensor1 = new CheckBox("sensor1Switch");
    sensor2 = new CheckBox("sensor2Switch");

    final List<HomePageChoice> list =
        Arrays.asList(new HomePageChoice[] { new HomePageChoice("Little Usage", 90),
            new HomePageChoice("Medium Usage", 50), new HomePageChoice("Extreme Usage", 0) });
    ChoiceRenderer<HomePageChoice> choiceRenderer = new ChoiceRenderer<HomePageChoice>("key", "value");
    select = new DropDownChoice<HomePageChoice>("sensor3Color", list, choiceRenderer);
    select.setDefaultModel(new Model<HomePageChoice>(){

      /**
       * Serial ID.
       */
      private static final long serialVersionUID = -7132154934356520356L;
      
      @Override
      public HomePageChoice getObject() {
        HomePageChoice choice = null;
        for (HomePageChoice c : list) {
          if (data.getSensor3Color().equals(c.getValue())) {
            choice = c;
          }
        }
        return choice;
      }
      
      @Override
      public void setObject(HomePageChoice object) {
        data.setSensor3Color(object.getValue());
      }
    });
  }

  @Override
  protected void onBeforeRender() {
    super.onBeforeRender();

    add(hd);

    add(bd);

    add(form);

    // add checkbox.
    form.add(sensor1);
    sensor1.add(new ChangeBehavior(form));

    form.add(sensor2);
    sensor2.add(new ChangeBehavior(form));

    // add select button.
    form.add(select);
    select.add(new ChangeBehavior(form));
  }

  @Override
  public void renderHead(IHeaderResponse response) {
    super.renderHead(response);

    response.renderJavaScriptReference(JS_TRANSMISSION);
    response.renderJavaScriptReference(JS_HOME);
  }
}