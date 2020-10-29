import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { IPonto } from "../../interfaces/beach";

@Injectable()
export class BeachesProvider {
  private API_URL = "http://balneabiliapp.makecodes.dev/latest.json";

  constructor(public http: Http, private storage: Storage) {}

  async getCacheData() {
    const now = +new Date();

    const cachedBeaches = await this.storage.get("beaches");
    if (!cachedBeaches || !cachedBeaches.updated) {
      return [];
    }

    // Cache de 1 dia
    const expiredTime = cachedBeaches.updated + 24 * 60 * 60 * 1000;
    if (now > expiredTime) {
      return [];
    }

    return cachedBeaches.items;
  }

  async getAll(): Promise<any> {
    let data = await this.getCacheData();
    if (data.length > 0) {
      return new Promise((resolve) => {
        resolve(data);
      });
    }

    return new Promise((resolve, reject) => {
      let url = this.API_URL;
      this.http.get(url).subscribe(
        (result: any) => {
          const items: Array<IPonto> = result.json();
          const storageData = {
            updated: +new Date(),
            items,
          };
          this.storage.set("beaches", storageData);
          resolve(items);
        },
        (error) => {
          reject(error.json());
        }
      );
    });
  }
}
