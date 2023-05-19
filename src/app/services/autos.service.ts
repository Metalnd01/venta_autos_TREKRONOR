import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { autos } from '../models/autos.model';

@Injectable({
  providedIn: 'root'
})
export class AutosService {

  private apiServerUrl = "https://backend-portfolio-wkm.fly.dev";

  constructor(private http: HttpClient) { }

  public getAutos(): Observable<autos[]> {
    return this.http.get<autos[]>(`${this.apiServerUrl}/autos/all`);
  }

  public addAutos(autos: autos): Observable<autos>{
    return this.http.post<autos>(`${this.apiServerUrl}/autos/add`, autos);
  }

  public updateAutos(autos: autos): Observable<autos>{
    return this.http.put<autos>(`${this.apiServerUrl}/autos/update`, autos);
  }

  public deleteAutos(IdAuto: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/autos/delete/${IdAuto}`);
  }
}
