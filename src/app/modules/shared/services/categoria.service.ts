import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  getCategorias(){

    const endpoint = `${base_url}/categorias`;
    return this.http.get(endpoint);
  }

  guardarCategoria(Body: any){
    const endpoint = `${base_url}/categorias`;
    return this.http.post(endpoint, Body);
  }

  actualizarCategoria(Body: any, idCategoria: any){
    const endpoint = `${base_url}/categorias/ ${idCategoria}`;
    return this.http.put(endpoint, Body);
  }
}
