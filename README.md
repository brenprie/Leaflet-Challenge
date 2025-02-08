# Leaflet-Challenge

## Background

The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. 
Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Part 1: Create the Earthquake Visualization
![Screenshot 2025-02-08 at 10 40 08](https://github.com/user-attachments/assets/b0bc7844-2c58-45ea-a560-50fc0e1cf212)

Your first task is to visualize an earthquake dataset. Complete the following steps:
1. Get your dataset. To do so, follow these steps:
  - The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed, https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php and choose a dataset to visualize. The following image is an example screenshot of what appears when you visit this link:
  ![Screenshot 2025-02-08 at 10 40 17](https://github.com/user-attachments/assets/1163eaed-8513-4657-a256-de4ec1dc90a6)

  - When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:
  ![Screenshot 2025-02-08 at 10 42 57](https://github.com/user-attachments/assets/516abef1-fa90-41b5-b77b-61204d14c6b9)

2. Import and visualize the data by doing the following:
  - Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
      - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
      - Hint: The depth of the earth can be found as the third coordinate for each earthquake.
  - Include popups that provide additional information about the earthquake when its associated marker is clicked.
  - Create a legend that will provide context for your map data.
  - Your visualization should look something like the preceding map.

## Part 2: Gather and Plot More Data (Optional)

Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates.
The following image is an example screenshot of what you should produce:
![Screenshot 2025-02-08 at 10 44 36](https://github.com/user-attachments/assets/2b20b84c-05c5-4ccd-9834-44dbf3c7e818)

Perform the following tasks:
  - Plot the tectonic plates dataset on the map in addition to the earthquakes.
  - Add other base maps to choose from.
  - Put each dataset into separate overlays that can be turned on and off independently.
  - Add layer controls to your map.


## Acknowledgements

Dataset created by the United States Geological Survey.
