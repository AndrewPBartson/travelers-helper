# Travelers Helper

**Travelers Helper** is a web application for planning long-distance multi-day road trips. The user enters the starting point, destination, and number of miles to drive each day.  The app creates a route for the trip and figures out a place for the user to stop at the end of each day's travel. For each stopping place, the app finds a nearby hotel or other accommodations. When the user clicks on the map icon for a stopping place, an information window pops up with a photo of the hotel or other accommodations.

This application begins by retrieving a standard route from Google Maps based on starting point and destination as entered by the user. After that, the response from Google Maps is decoded and a rough estimate is made of where the stopping places should be. Then there is another call to Google Maps API, followed by another round of calculations that produce a better estimate for the stopping places. This sequence is repeated four times to produce a satisfactory result that is returned to the browser. The application uses a separate API, the Google Places API, to gather information about hotel accommodations including photos.
***

[Link to deployed version](https://travelers-helper.herokuapp.com/)
***

![Example of user input along with the route produced based on that input](./imgs_readme/route.png?raw=true "Example of user input along with the route produced based on that input")
***
![When the user clicks on a map icon, a window pops up showing a lodging option for that location](./imgs_readme/route_w_hotels.png?raw=true "When the user clicks on a map icon, a window pops up showing a lodging option for that location")
***
## Download and Install the Project

* "git clone https://github.com/AndrewPBartson/travelers-helper.git"
* "npm install"
***
## The Back End

- The back end is built with Node and Express.

- To launch the back end server

    - "npm run start-backend"

    - This starts the server which then listens for incoming requests on port 8001, that is, localhost:8001. The back end also sends HTTP requests to Google Directions API and Google Places API.
***
## The Front End

- The user interface is built with React and Google Maps. 

- To launch the front end application 

    - "npm run start-frontend"

    - This will set up the client-side code and launch the single page application in a browser window. If the browser doesn't open automatically, type localhost:3000 into the address bar of your browser. The front end components are configured to send HTTP requests to localhost:8001 where the back end server is listening and responding.

***

Please visit [the deployed version of the project](https://travelers-helper.herokuapp.com/)
***