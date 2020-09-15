import React from "react";
import { Marker, InfoWindow } from "react-google-maps";

class CustomMarker extends React.Component {
  state = {
    isOpen: false
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { temp_lat, temp_lng, icon, label, info_name, photo_url, rating, i } = this.props
    return <Marker
      position={{ lat: temp_lat, lng: temp_lng }} 
      onClick={this.toggleOpen}
      label={label}
      icon={icon}
      key={i}>
        {this.state.isOpen && info_name &&
          <InfoWindow 
            onCloseClick={this.toggleOpen}>
            <div>
              <div className="photo_title">{info_name}</div>
              <img src={photo_url} alt="" />
              <div>{rating}</div>
            </div>
          </InfoWindow>
        }
    </Marker>
  }
}

export default CustomMarker;