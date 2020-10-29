import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "ionic-angular";
import * as L from "leaflet";

import { BeachesProvider } from "./../../providers/beaches/beaches";
import { IPonto } from "../../interfaces/beach";
import { ICurrentWeather } from "../../interfaces/weather";
import { WeatherProvider, isDay } from "../../providers/weather/weather";
import { conditionMetaInfo } from "./weather-constants";

function renderPopupContent(beach: IPonto, condition: ICurrentWeather) {
  const conditions = beach.ANALISES.map((analysis) => {
    return `
      <div class="popup-beach-conditions-row">
        <div class="popup-beach-conditions-col">${analysis.DATA}</div>
        <div class="popup-beach-conditions-col">${analysis.CONDICAO}</div>
      </div>
    `;
  }).join("");

  const metaInfo = conditionMetaInfo[condition.weather[0].id];
  const conditionIcon = isDay(condition)
    ? metaInfo.iconDay
    : metaInfo.iconNight;
  const content = `
    <div class="popup-beach">
      <h1>${beach.BALNEARIO}<br><small>${beach.PONTO_NOME} - ${beach.MUNICIPIO}</small></h1>
      <h2>Condições</h2>
      <div class="popup-beach-conditions">
        ${conditions}
      </div>
      <h2>Clima</h2>
      <div class="popup-beach-weather">
        <div class="popup-beach-weather-col">
          <h3>${metaInfo.main}</h3>
          <i class="wi ${conditionIcon}"></i>
          <div class="description">${metaInfo.description}</div>
        </div>
        <div class="popup-beach-weather-col weather">
          <h3 class="temperature">${condition.main.temp}°C</h3>
          <div class="row">
            <div class="col-l">Mínima:</div>
            <div class="col-r">${condition.main.temp_min}°C</div>
          </div>
          <div class="row">
          <div class="col-l">Máxima:</div>
          <div class="col-r">${condition.main.temp_max}°C</div>
          </div>
          <div class="row">
            <div class="col-l">Umidade:</div>
            <div class="col-r">${condition.main.humidity}%</div>
          </div>
        </div>
        <div class="popup-beach-weather-col">
          <h3>Vento</h3>
          <i class="wi wi-wind towards-${condition.wind.deg}-deg"></i>
          <div class="description">${condition.wind.speed} Km/h</div>
        </div>
      </div>
    </div>
  `;
  return content;
}

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  @ViewChild("map") mapContainer: ElementRef;
  map: any;
  beachItems: Array<IPonto> = [];

  constructor(
    public navCtrl: NavController,
    private beachesProvider: BeachesProvider,
    private weatherProvider: WeatherProvider
  ) {}

  ionViewDidEnter() {
    this.beachesProvider.getAll().then((data) => {
      this.loadMap(data);
    });
  }

  async onMarkerShow(e, weatherProvider) {
    const popup = e.target.getPopup();
    const { beach } = e.target.options;

    const condition: ICurrentWeather = await weatherProvider.getByLatLng(
      e.latlng
    );
    popup.setContent(renderPopupContent(beach, condition)).update();
  }

  loadMap(beaches: Array<IPonto>) {
    this.map = L.map("map").setView([-27.674486, -48.487696], 7);

    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attributions: "www.tphangout.com",
      minZoom: 3,
      maxZoom: 18,
    }).addTo(this.map);

    if (beaches.length === 0) {
      return;
    }

    beaches.map((beach: IPonto) => {
      if (!beach.LATITUDE && !beach.LONGITUDE) {
        return;
      }

      const lat = parseFloat(beach.LATITUDE);
      const lng = parseFloat(beach.LONGITUDE);
      const beachLocation = L.latLng(lat, lng);
      let icon: L.icon;

      if (beach.ANALISES[0].CONDICAO === "PRÓPRIO") {
        icon = L.icon({
          iconUrl: "../../assets/img/blue-flag.png",
        });
      } else if (beach.ANALISES[0].CONDICAO === "IMPRÓPRIO") {
        icon = L.icon({
          iconUrl: "../../assets/img/red-flag.png",
        });
      }

      const beachMarker = L.marker(beachLocation, { icon, beach }).on(
        "click",
        (e) => {
          return this.onMarkerShow(e, this.weatherProvider);
        }
      );

      beachMarker.bindPopup("Loading data...", {
        minWidth: 300,
        maxWidth: 480,
      });
      this.map.addLayer(beachMarker);
    });
  }
}
