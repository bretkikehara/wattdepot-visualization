package org.wattdepot.visualization.wattdepot;

import org.wattdepot.client.BadXmlException;
import org.wattdepot.client.MiscClientException;
import org.wattdepot.client.NotAuthorizedException;
import org.wattdepot.client.ResourceNotFoundException;
import org.wattdepot.client.WattDepotClient;
import java.util.Date;
import java.util.List;
import javax.xml.datatype.XMLGregorianCalendar;
import org.wattdepot.resource.sensordata.jaxb.SensorData;
import org.wattdepot.resource.source.jaxb.Source;
import org.wattdepot.util.tstamp.Tstamp;

public class connectWattDepot {

	/**
	 * Connects to WattDepot and gets sources.
	 */
	public static void main(String[] args) {
		// connects to local WattDepot server
		WattDepotClient client = new WattDepotClient("http://localhost:8182/wattdepot/");
		if (!client.isHealthy()) {
			System.out.println("WattDepot Server not found.");
		}
		// get all sources
		List<Source> sources = null;
		try {
			sources = client.getSources();
		} catch (NotAuthorizedException e) {
			System.err.println("Not authorized to access source.");
			e.printStackTrace();
		} catch (BadXmlException e) {
			System.err.println("Bad XML.");
			e.printStackTrace();
		} catch (MiscClientException e) {
			System.err.println("Server error.");
			e.printStackTrace();
		}
		SensorData data = null;
		XMLGregorianCalendar timestamp = null;
		// create a timestamp with today's time
		Date today = new Date();
		timestamp = Tstamp.makeTimestamp(today.getTime());
		// get data from all sources
		for (Source source : sources) {		
			try {
				data = client.getSensorData(source.getName(), timestamp);
			} catch (ResourceNotFoundException e) {
				System.err.println("The resource was not found.");
				e.printStackTrace();
			} catch (NotAuthorizedException e) {
				System.err.println("Not authorized to access source.");
				e.printStackTrace();
			} catch (BadXmlException e) {
				System.err.println("Bad XML.");
				e.printStackTrace();
			} catch (MiscClientException e) {
				System.err.println("Server error.");
				e.printStackTrace();
			}
			System.out.println("Source: " + source.getName());
			System.out.println("Timestamp: " + data.getTimestamp());
			System.out.println("Properties: " + data.getProperties());
		}
	}
	
}
