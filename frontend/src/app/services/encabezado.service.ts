import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { encabezado } from '../models/encabezado.model';


@Injectable({
  providedIn: 'root'
})
export class EncabezadoService {

  private apiServerUrl = "https://backend-portfolio-wkm.fly.dev";
 
  constructor(private http: HttpClient) { }

  public getEncabezado(): Observable<encabezado>{
    return this.http.get<encabezado>(`${this.apiServerUrl}/encabezado/id/1`);
  }

  public updateEncabezado(encabezado: encabezado): Observable<encabezado>{
    return this.http.put<encabezado>(`${this.apiServerUrl}/encabezado/update`, encabezado);
  }
}
