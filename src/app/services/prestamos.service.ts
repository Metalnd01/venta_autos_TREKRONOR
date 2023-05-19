import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { prestamos } from '../models/prestamos.model';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private apiServerUrl = 'https://backend-portfolio-wkm.fly.dev';

  constructor(private http: HttpClient) { }

  public getPrestamos(): Observable<prestamos[]> {
    return this.http.get<prestamos[]>(`${this.apiServerUrl}/prestamos/all`);
  }

  public addPrestamos(prestamos: prestamos): Observable<prestamos> {
    return this.http.post<prestamos>(`${this.apiServerUrl}/prestamos/add`, prestamos);
  }

  public updatePrestamos(prestamos: prestamos): Observable<prestamos> {
    return this.http.put<prestamos>(`${this.apiServerUrl}/prestamos/update`, prestamos);
  }

  public deletePrestamos(IdExp: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/prestamos/delete/${IdExp}`);
  }
}
