export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface IWind {
  speed: number;
  deg: number;
}

export interface ICloud {
  all: number;
}

export interface ISys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ICurrentWeather {
  coord?: object;
  weather: Array<IWeather>;
  base?: string;
  main: IMain;
  wind: IWind;
  visibility: number;
  clouds: ICloud;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: string;
}
