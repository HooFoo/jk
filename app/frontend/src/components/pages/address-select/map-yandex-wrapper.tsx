import * as React from "react";
import { withStyles, createStyles } from "@material-ui/styles";

import BuildingRepository from "../../../repositories/building-repository";
import Building from "../../../models/building";
import { WithStyles, Theme } from "@material-ui/core";

import withDependencies from "../../../dependency-injection/with-dependencies";
import { ResolveDependencyProps } from "../../../dependency-injection/resolve-dependency-props";

interface IProps extends WithStyles<typeof styles>, ResolveDependencyProps {
  onAddressSelect: (address: string, uid: string) => void;
}

interface IState {
  hasLocation: boolean,
  latlng: {
    lat: any,
    lng: any,
  },
  buildings: Building[],
  newChatPlacemark: any,
  newChatAttributes: any,
}

class MapYandexWrapper extends React.Component<IProps, IState> {
  private buildingRepository: BuildingRepository;

  constructor(props: IProps) {
    super(props);

    this.buildingRepository = props.resolve(BuildingRepository);

    this.state = {
      hasLocation: false,
      latlng: {
        lat: 59.95,
        lng: 30.31,
      },
      buildings: [],
      newChatPlacemark: null,
      newChatAttributes: null,
    };
  }

  private map: any;

  existingChatPlacemark(building: Building) {
    const { onAddressSelect } = this.props;
    const { ymaps } = window as any;

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
    const { ymaps } = window as any;
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
      this.map.events.add('click', (e: any) => { this.setChatPlacemark(e.get('coords')); });
    })
  }

  addBoundsChangeEvent() {
    this.map.events.add('boundschange', (e: any) => {
      const bounds = e.originalEvent.newBounds;

      const boundary = {
        sw_lat: bounds[0][0],
        sw_lng: bounds[0][1],
        ne_lat: bounds[1][0],
        ne_lng: bounds[1][1],
      };

      this.buildingRepository.index(boundary).then((buildings) => {
        this.setState({ buildings });

        buildings.map((building)=>{
          const placemark = this.existingChatPlacemark(building);
          this.map.geoObjects.add(placemark);
        })
      })
    } );
  }

  setupSearchControl() {
    const { ymaps } = window as any;

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

    searchControl.events.add('resultselect', (e: any) => {
      this.onResultSelect(e, searchControl);
    }, this);

    this.map.controls.add(searchControl);
  }

  setCenterLocation() {
    const { ymaps } = window as any;

    ymaps.geolocation.get({
      mapStateAutoApply: true,
      autoReverseGeocode: true
    })
    .then((result: any) => {
      this.map.geoObjects.add(result.geoObjects);
      this.map.setCenter(result.geoObjects.position);
    });
  }

  onResultSelect(event: any, searchControl: any) {
    const index = searchControl.getSelectedIndex();
    const results = searchControl.getResultsArray();

    if (results.length) {
      const selectedLocation =  results[index];
      this.setChatPlacemark(selectedLocation.geometry.getCoordinates());
    }
  }


  setChatPlacemark(coords: any) {
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

  createPlacemark(coords: any) {
    const { ymaps } = window as any;

    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...'
    }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true
    });
  }

  // Определяем адрес по координатам (обратное геокодирование).
  getAddress(coords: any) {
    const { ymaps } = window as any;
    const { newChatPlacemark }  = this.state;
    const { onAddressSelect } = this.props;

    let { newChatAttributes } = this.state;

    newChatPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords, {
      kind: "house"
    }).then((res: any) => {
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

      onAddressSelect(address, "");

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

const styles = (theme: Theme) => createStyles({
  mapContainer: {
    height: "50vh",
    width: '100%',
    margin: '0 auto'
  },
});

export default withStyles(styles)(withDependencies(MapYandexWrapper));
