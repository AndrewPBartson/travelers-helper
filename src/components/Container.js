import React from "react";
import '../css/main.css';
import TripForm from "./TripForm";
import MyMapComponent from "./MyMapComponent";

class Container extends React.PureComponent {
  state = {
    isMarkerShown: true,
    routesData: []
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  saveRoute = (data) => {
    this.setState({trip_data: data})
  }

  setDirections = (data) => {
    this.setState({directions: data})
  }

  render() {
    return (
      <div  className="container1">
        <TripForm 
          saveRoute={this.saveRoute}
          trip_data={this.state.trip_data}
        />
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          trip_data={this.state.trip_data}
          setDirections={this.setDirections}
        />

      </div>
    );
  }
}

export default Container
