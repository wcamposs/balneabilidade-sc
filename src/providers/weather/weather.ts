import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import md5 from "md5";

import { ICurrentWeather } from "../../interfaces/weather";
import { ICoordinates } from "../../interfaces/general";

/**
 * A classe WeatherProvider é responsável por obter dados
 * de condição climática em um determinado local
 */
@Injectable()
export class WeatherProvider {
  apiToken: string = "d0b6194cb52e57588ff8094ec4ab9062";
  lang: string = "pt_br";
  units: string = "metric";
  apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  constructor(public http: Http, private storage: Storage) {}

  /**
   * getKey é responsável por gerar uma chave única com hash md5 para que
   * seja fácil encontrar o registro no LocalStorage, o nosso cache local
   *
   * @param params objet
   */
  getKey(params: object) {
    const keys = Object.keys(params);
    const values = keys.map((k) => params[k]);
    const valueToHash = values.join("");
    return md5(valueToHash);
  }

  async getCacheData(storageKey: string) {
    const now = +new Date();

    const cachedData = await this.storage.get(storageKey);
    if (!cachedData || !cachedData.updated) {
      return null;
    }

    // Cache de 30 minutos, não precisamos de menos que isso
    const expiredTime = cachedData.updated + 30 * 60 * 1000;
    if (now > expiredTime) {
      return null;
    }

    return cachedData.condition;
  }

  /**
   * Retorna uma promise contendo a consulta pela condição do clima em um
   * ponto geográfico informado
   *
   * @param coordinates iCoordinates
   */
  async getByLatLng(coordinates: ICoordinates): Promise<any> {
    const storageKey: string = this.getKey(coordinates);
    let data = await this.getCacheData(storageKey);
    if (data !== null) {
      return new Promise((resolve) => {
        resolve(data);
      });
    }

    // Montando os parâmetros GET para não ficar uma linha única longa, difícil de ler
    const params: string = [
      `lat=${coordinates.lat}`,
      `lon=${coordinates.lng}`,
      `units=${this.units}`,
      `lang=${this.lang}`,
      `appid=${this.apiToken}`,
    ].join("&");

    let url: string = `${this.apiUrl}?${params}`;

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (result: any) => {
          const condition: ICurrentWeather = result.json();
          const storageData = {
            updated: +new Date(),
            condition,
          };

          this.storage.set(storageKey, storageData);
          resolve(condition);
        },
        (error) => {
          reject(error.json());
        }
      );
    });
  }
}

/**
 * Helper que ajuda a hora da última atualização de dados é dia
 *
 * @param currentWeather boolean
 */
export function isDay(currentWeather: ICurrentWeather): boolean {
  if (
    currentWeather.dt >= currentWeather.sys.sunrise &&
    currentWeather.dt < currentWeather.sys.sunset
  ) {
    return true;
  }
  return false;
}
