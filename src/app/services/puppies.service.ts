import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Puppy } from "../components/modals/add-puppy/add-puppy.component";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PuppiesService {

  constructor(private http: HttpClient) { }

    getPuppiesByLitter(litter?: number): Observable<Puppy[]> {
        return this.http.get<any>('assets/demo/data/puppies.json').pipe(
            map((res) => res.data as Puppy[]) // Преобразуем данные в массив Puppy
        );
    }

    getPuppy(id: number) {
        return this.http.get<any>('assets/demo/data/puppy.json').pipe(
            map((res) => res.data as Puppy[]) // Преобразуем данные в массив Puppy
        );
    }
}
