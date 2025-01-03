import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Puppy } from "../components/modals/add-puppy/add-puppy.component";

@Injectable({
  providedIn: 'root'
})
export class PuppiesService {

  constructor(private http: HttpClient) { }

    getPuppiesByLitter(litter?: number) {
        return this.http.get<any>('assets/demo/data/puppies.json')
            .toPromise()
            .then(res => res.data as Puppy[])
            .then(data => data);
    }

    getPuppy(id: number) {
        return this.http.get<any>('assets/demo/data/puppy.json')
            .toPromise()
            .then(res => res.data as Puppy[])
            .then(data => data);
    }
}
