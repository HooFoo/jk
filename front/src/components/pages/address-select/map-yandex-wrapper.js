import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/styles";
import { Subject } from "rxjs";

class MapYandexWrapper extends Component {
  static propTypes = {
    classes: PropTypes.object,
    httpService: PropTypes.object.isRequired,
    buildingsRepository: PropTypes.func.isRequired
  }

  state = {
    hasLocation: false,
    latlng: {
      lat: 59.95,
      lng: 30.31,
    },
    chatLocations: [],
    newChatPlacemark: null,
    newChatAttributes: null,
  }

  map;
  mapSubject = new Subject();

  constructor(props) {
    super(props);
    const { chatLocations } = this.state;
    const { httpService } = this.props;
    const { ymaps } = window;

    this.mapSubject.subscribe(() => {
      httpService.getChatLocations().then(x => {
        for (let i = 0; i < x.data.items.length; i++) {
          const chat = x.data.items[i];

          const placemark = new ymaps.Placemark([chat.latitude, chat.longitude], {
            iconCaption: chat.address,
            balloonContentHeader: 'Существующий чат',
            balloonContentBody: `<p>${chat.address}</p> ` +
              '<button>Перейти в чат</button>',
          }, {
            preset: 'islands#redDotIcon',
            draggable: false
          });


          this.map.geoObjects.add(placemark);
          chatLocations.push({
            placemark,
            chatDetails: chat
          });
        }
      });
    });
  }

  componentDidMount() {
    if (this.map) {
      return;
    }

    const mapParams = {
      center: [59.95, 30.31],
      zoom: 14,
      controls: []
    }
    const { ymaps } = window;
    const { buildingsRepository } = this.props;

    ymaps.ready(() => {
      this.map = new ymaps.Map('map', mapParams);

      this.map.events.add('click', (e) => { this.setChatPlacemark(e.get('coords')); });

      this.map.events.add('boundschange', (e) => {
        const bounds = e.originalEvent.newBounds;

        const boundary = {
          sw_lat: bounds[0][0],
          sw_lng: bounds[0][1],
          ne_lat: bounds[1][0],
          ne_lng: bounds[1][1],
        }

        buildingsRepository.index(boundary).then((buildings) => {
          console.log(buildings)
        })
      } );

      const searchControl = new ymaps.control.SearchControl({
        options: {
          float: 'right',
          floatIndex: 100,
          fitMaxWidth: true,
          noPopup: true,
          noPlacemark: true,
          searchControlMaxWidth: [30, 72, 500],
        }
      });

      searchControl.events.add('resultselect', function (e) {
        this.onResultSelect(e, searchControl);
      }, this);

      this.map.controls.add(searchControl);

      ymaps.geolocation.get({
        mapStateAutoApply: true,
        autoReverseGeocode: true
      })
        .then((result) => {
          this.map.geoObjects.add(result.geoObjects);
          this.map.setCenter(result.geoObjects.position);
          this.map.setZoom(zoom);
        });

      this.mapSubject.next(this.map);
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
  }

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
    const { chatLocations }  = this.state;
    let { newChatPlacemark, newChatAttributes } = this.state;

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
      const coordinates = firstGeoObject.geometry.getCoordinates();

      const existedChat = chatLocations.find(x => x.chatDetails.address == address);

      if (existedChat) {
        existedChat.placemark.balloon.open();
        this.map.geoObjects.remove(newChatPlacemark);
        newChatPlacemark = null;
        this.setState({ newChatPlacemark });
      } else {
        newChatPlacemark.geometry.setCoordinates(coordinates);
        newChatPlacemark.properties
          .set({
            iconCaption: address,
            balloonContentHeader: 'Создать чат',
            balloonContentBody: `<p>${address}</p> ` +
              '<button>Создать в чат</button>',
          });

        newChatPlacemark.balloon.open();
      }
      //this.map.setCenter(coordinates);
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
    "height": "calc(100vh - 64px)",
    "width": '100%',
    "margin": '0 auto',
  },
});

export default withStyles(useStyles)(MapYandexWrapper);
