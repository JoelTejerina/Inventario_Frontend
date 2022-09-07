import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductos(){

    const endpoint = `${base_url}/productos`;
    return this.http.get(endpoint);
  }

  guardarProducto(Body: any){
    const endpoint = `${base_url}/productos`;
    return this.http.post(endpoint, Body);
  }

  actualizarProducto(Body: any, idProducto: any){
    const endpoint = `${base_url}/productos/ ${idProducto}`;
    return this.http.put(endpoint, Body);
  }

  eliminarProducto(idProducto: any){
    const endpoint = `${base_url}/productos/ ${idProducto}`;
    return this.http.delete(endpoint);
  }

  getBuscarProductoPorNombre(nombre: any){
    const endpoint = `${base_url}/productos/nombre/${nombre}`;
    return this.http.get(endpoint);
  }

  getExportProductos(){

    const endpoint = `${base_url}/productos/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}
