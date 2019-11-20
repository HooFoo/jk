import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/styles";
import inject from "../../../helpers/inject";

import BuildingRepository from "../../../repositories/building-repository";

class MapYandexWrapper extends Component {
  static propTypes = {
    classes: PropTypes.object,
    buildingsRepository: PropTypes.func.isRequired,

    onAddressSelect: PropTypes.func.isRequired
  };

  state = {
    hasLocation: false,
    latlng: {
      lat: 59.95,
      lng: 30.31,
    },
    buildings: [],
    newChatPlacemark: null,
    newChatAttributes: null,
  };

  map;

  existingChatPlacemark(building) {
    const { onAddressSelect } = this.props;
    const { ymaps } = window;

    const placemark = new ymaps.Placemark(building.location(), {
      balloonContentBody: `<p>${building.address}</p> `
    }, {
      preset: 'islands#blueHomeIcon',
      draggable: false
    });
    placemark.events.add('click', () => {onAddressSelect(building.address, building.uid)});
    return placemark;
  }

  componentDidMount() {
    if (this.map) {
      return;
    }

    this.setupMap();
  }

  setupMap() {
    const { ymaps } = window;
    const mapParams = {
      center: [59.95, 30.31],
      zoom: 6,
      controls: []
    };

    ymaps.ready(() => {
      this.map = new ymaps.Map('map', mapParams);
      this.setCenterLocation();
      this.setupSearchControl();
      this.addBoundsChangeEvent();
      this.map.events.add('click', (e) => { this.setChatPlacemark(e.get('coords')); });
    })
  }

  addBoundsChangeEvent() {
    const { buildingsRepository } = this.props;
    this.map.events.add('boundschange', (e) => {
      const bounds = e.originalEvent.newBounds;

      const boundary = {
        sw_lat: bounds[0][0],
        sw_lng: bounds[0][1],
        ne_lat: bounds[1][0],
        ne_lng: bounds[1][1],
      };

      buildingsRepository.index(boundary).then((buildings) => {
        this.setState({ buildings });

        buildings.map((building)=>{
          const placemark = this.existingChatPlacemark(building);
          this.map.geoObjects.add(placemark);
        })
      })
    } );
  }

  setupSearchControl() {
    const { ymaps } = window;

    const searchControl = new ymaps.control.SearchControl({
      options: {
        float: 'right',
        kind: 'house',
        floatIndex: 100,
        fitMaxWidth: true,
        noPopup: true,
        noPlacemark: true,
        size: 'auto',
      }
    });

    searchControl.events.add('resultselect', function (e) {
      this.onResultSelect(e, searchControl);
    }, this);

    this.map.controls.add(searchControl);
  }

  setCenterLocation() {
    const { ymaps } = window;

    ymaps.geolocation.get({
      mapStateAutoApply: true,
      autoReverseGeocode: true
    })
      .then((result) => {
        this.map.geoObjects.add(result.geoObjects);
        this.map.setCenter(result.geoObjects.position);
      });
  }

  onResultSelect(event, searchControl) {
    const index = searchControl.getSelectedIndex();
    const results = searchControl.getResultsArray();

    if (results.length) {
      const selectedLocation =  results[index];
      this.setChatPlacemark(selectedLocation.geometry.getCoordinates());
    }
  }


  setChatPlacemark = (coords) => {
    let { newChatPlacemark } = this.state;

    if (newChatPlacemark) {
      newChatPlacemark.geometry.setCoordinates(coords);
      this.getAddress(coords);
      return;
    }

    newChatPlacemark = this.createPlacemark(coords);
    this.map.geoObjects.add(newChatPlacemark);

    // Слушаем событие окончания перетаскивания на метке.
    newChatPlacemark.events.add('dragend', () => {
      this.getAddress(newChatPlacemark.geometry.getCoordinates());
    });
    this.setState({ newChatPlacemark });
    this.getAddress(coords);
  };

  createPlacemark(coords) {
    const { ymaps } = window;

    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...'
    }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true
    });
  }

  // Определяем адрес по координатам (обратное геокодирование).
  getAddress(coords) {
    const { ymaps } = window;
    const { newChatPlacemark }  = this.state;
    const { onAddressSelect } = this.props;

    let { newChatAttributes } = this.state;

    newChatPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords, {
      kind: "house"
    }).then((res) => {
      var firstGeoObject = res.geoObjects.get(0);

      if (!firstGeoObject) {
        newChatPlacemark.properties.set({
          iconCaption: "Адрес не найден.",
          balloonContent: "Адрес не найден. Выберите другую точку"
        });
        newChatAttributes = null;
        this.setState({ newChatAttributes });
        return;
      }

      const address = firstGeoObject.getAddressLine();

      onAddressSelect(address);

      const coordinates = firstGeoObject.geometry.getCoordinates();

      newChatPlacemark.geometry.setCoordinates(coordinates);
      newChatPlacemark.properties
        .set({
          iconCaption: address,
          balloonContentBody: `<p>${address}</p> `
        });

      newChatPlacemark.balloon.open();
      this.map.setCenter(coordinates);
    });
  }


  render() {
    const { classes } = this.props;

    return (
      <div id="map" className={classes.mapContainer} />
    );
  }
}

const useStyles = () => ({
  mapContainer: {
    height: "50vh",
    width: '100%',
    margin: '0 auto'
  },
});


const dependencies = {
  buildingsRepository: BuildingRepository
};

export default withStyles(useStyles)(inject(dependencies, MapYandexWrapper));
