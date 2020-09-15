import React from "react";
import { compose, withProps, lifecycle, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import best_options from "../css/map_styles.js";
import icon from "../images/j20.gif"
import CustomMarker from "./CustomMarker"

const MyMapComponent = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" +
      "AIzaSyAd0ZZdBnJftinI-qHnPoP9kq5Mtkey6Ac" +
      "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    
    componentWillReceiveProps(nextProps) {
      const google = window.google;
      if (nextProps.trip_data.response) {
        const way_points = nextProps.trip_data.way_points
        const firstPoint = way_points[0]
        const lastPoint = way_points[way_points.length - 1]
        const origin = new google.maps.LatLng({lat: firstPoint[0], lng: firstPoint[1]})
        const destination = new google.maps.LatLng({lat: lastPoint[0], lng: lastPoint[1]})
        
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          }
        });
      }
    }
  })
)(props => {
  let markers = []
if (props.trip_data) {
  let marker_points = props.trip_data.way_points
  let points = props.trip_data.way_points_set
  let temp_lat, temp_lng
  let info_name, photo_url, rating; 
  let photo_url_prefix = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="
  let rating_prefix = "Rating: "
  markers = marker_points.map(function(marker_pt, i){
    temp_lat = marker_pt[0]
    temp_lng = marker_pt[1]
    photo_url = ''
    info_name = "" 
    rating = null  
    if (points[i].stop.places && points[i].stop.places[0]) {
      info_name = points[i].stop.places[0].name
      if (points[i].stop.places[0].photos
        && points[i].stop.places[0].photos[0]) {
        photo_url = photo_url_prefix 
          + points[i].stop.places[0].photos[0] 
          + '&key=AIzaSyDZSeVvDKJQFTgtYkjzOe368PIDbaq6OQE'
      }
      if (points[i].stop.places[0].rating) {
        rating = rating_prefix + points[i].stop.places[0].rating
      } 
    }
    else {info_name = null} 
    let labels = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return <CustomMarker
      temp_lat={temp_lat}
      temp_lng={temp_lng}
      icon={icon}
      label={labels[i % labels.length]}
      info_name={info_name}
      photo_url={photo_url}
      rating={rating}
      key={i}
      i={i}
    />

  })
}
return <GoogleMap defaultZoom={5} 
  defaultCenter={{ lat: 37.071210, lng: -109.171854 }}
  options= {best_options}
  >
    {markers}
    {props.directions && <DirectionsRenderer 
      directions={props.directions} 
      options={{
        polylineOptions: { strokeColor: "#0000ff", strokeWeight: 5.5 },
        markerOptions: { visible: false, clickable: false }
      }}
      />}
  </GoogleMap>
}
);

export default MyMapComponent;
