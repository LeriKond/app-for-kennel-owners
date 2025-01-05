import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PuppyDetailsService {
    constructor(private http: HttpClient) {}

    getHeightData(id?: number): Observable<any> {
        return this.http.get<any>('assets/demo/data/height.json').pipe(
            map((res) => res.data) // Преобразуем результат
        );
    }

    getWeightData(id?: number): Observable<any> {
        return this.http.get<any>('assets/demo/data/weight.json').pipe(
            map((res) => res.data)
        );
    }

    getVaccinityData(id?: number): Observable<any> {
        return this.http.get<any>('assets/demo/data/vaccinations.json').pipe(
            map((res) => res.data)
        );
    }

    getTreatmentData(id?: number): Observable<any> {
        return this.http.get<any>('assets/demo/data/treatments.json').pipe(
            map((res) => res.data)
        );
    }
}
