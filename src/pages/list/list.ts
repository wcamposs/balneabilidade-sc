import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { IPonto } from "./../../interfaces/beach";
import { BeachesProvider } from "./../../providers/beaches/beaches";

@Component({
  selector: "page-list",
  templateUrl: "list.html",
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<IPonto>;
  cities: any;
  showCancelButton: boolean = false;
  beachItems: Array<IPonto> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private beachesProvider: BeachesProvider
  ) {
    this.selectedItem = navParams.get("item");
    this.items = [];
    this.cities = [];
    this.beachesProvider.getAll().then((beaches: Array<IPonto>) => {
      const citiesTmp = {};

      beaches.map((beach: IPonto) => {
        if (!Object.keys(citiesTmp).includes(beach.MUNICIPIO)) {
          citiesTmp[beach.MUNICIPIO] = [];
        }
        citiesTmp[beach.MUNICIPIO].push(beach);
        this.items.push(beach);
      });

      // Sorting cities
      Object.keys(citiesTmp)
        .sort()
        .map((cityName) => {
          this.cities.push({
            name: cityName,
            count: citiesTmp[cityName].length,
            measurePoints: citiesTmp[cityName],
          });
        });
    });
  }
}
