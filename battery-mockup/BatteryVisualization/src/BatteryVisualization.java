import processing.core.*;
import java.awt.Color;

public class BatteryVisualization extends PApplet {
	
	public void setup() { 
		size(640, 360);
		background(0);
		noLoop();
	}
	
	public void draw() {
		
		//max battery capacity in kWh
		float batteryCapacity = 24;
		//current battery level in kWh
		float currentBattery = 17;
		//percent of battery left
		float percentBattery = currentBattery/batteryCapacity;
		//number of days between intervals
		int interval = 1;
		//color of battery
		int batteryColor;
	
		//create colors
		int green = color(0, 255, 0);
		int yellow = color(255, 255, 0);
		int red = color(255, 0, 0);
	
		//center text
		stroke(255);
		textAlign(CENTER);
		//display current stats
		text(percentBattery*100 + "% Remaining", (float) (width*0.5), (float) (height*0.15));
		text("Remaining: " + currentBattery + " kWh", (float) (width*0.5), (float) (height*0.75));
		text("Max Capacity: " + batteryCapacity + " kWh", (float) (width*0.5), (float) (height*0.8));
	
		//change color of battery based on percent left
		if(percentBattery < .15) {
		  batteryColor = red;
		}
		else if(percentBattery < .4) {
		  batteryColor = yellow;
		}
		else {
		  batteryColor = green;
		}
	
		//draw battery
		noStroke();
		fill(batteryColor);
		rect((float) (width*0.4), (float) (height*0.20), (float) (width*0.2), (float) (height*0.45));
	
		//white out used percentage
		fill(255);
		rect((float) (width*0.4), (float) (height*0.20), (float) (width*0.2), (float) (height*0.45*(1-percentBattery)));
	
		//create top of battery
		fill(0);
		rect((float) (width*0.4), (float) (height*0.20), (float) (width*0.05), (float) (height*0.05));
		rect((float) (width*0.55), (float) (height*0.20), (float) (width*0.05), (float) (height*0.05));
		
	}

}
