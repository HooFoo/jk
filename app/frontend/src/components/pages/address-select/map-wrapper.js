import React, { createRef, Component } from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { withStyles } from "@material-ui/styles";
import PropTypes from 'prop-types';

import withServices from "../../../services/service-injection";

class MapWrapper extends Component {
  static propTypes = {
    classes: PropTypes.string,
    httpService: PropTypes.object.isRequired,
  }

  state = {
    hasLocation: false,
    latlng: {
      lat: 59.95,
      lng: 30.31,
    },
    chatLocations: [],
  }

  mapRef = createRef()

  constructor(props){
    super(props);
    const { httpService } = this.props;

    httpService.getChatLocations().then(x => {
      this.setState(state => {
        state.chatLocations = x.data.items;
        return state;
      });
    });
  }

  handleClick = () => {
    const { hasLocation } = this.state;
    const map = this.mapRef.current

    if (map != null && !hasLocation) {
      map.leafletElement.locate();
    }
  }

  handleLocationFound = () => {
    const { hasLocation } = this.state;

    if (!hasLocation) {
      this.setState(state => {
        state.hasLocation = true;
        return state;
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { latlng, chatLocations } = this.state;

    return (
      <Map
        center={latlng}
        zoom={13}
        className={classes.leafletContainer}
        ref={this.mapRef}
        onClick={this.handleClick}
        onLocationfound={this.handleLocationFound}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          chatLocations.map(x =>
            <Marker key={x.latitude + x.longitude} position={[x.latitude, x.longitude]}>
              <Popup>
                <span>
                      A pretty CSS3 popup. <br /> Easily customizable.
                </span>
              </Popup>
            </Marker>
          )
        }
      </Map>
    );
  }
}

const useStyles = () => ({
  leafletContainer: {
    "height": "calc(100vh - 64px)",
    "width": '100%',
    "margin": '0 auto',
  },
});

export default withServices(withStyles(useStyles)(MapWrapper));
