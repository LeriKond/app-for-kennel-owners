import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PuppyDetailsService {

  constructor(private http: HttpClient) { }

    getHeightData(id?: number) {
        return this.http.get<any>('assets/demo/data/height.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }

    getWeightData(id?: number) {
        return this.http.get<any>('assets/demo/data/weight.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }

    getVaccinityData(id?: number) {
        return this.http.get<any>('assets/demo/data/vaccinations.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }

    getTreatmentData(id?: number) {
        return this.http.get<any>('assets/demo/data/treatments.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
}
