import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductoElement } from 'src/app/modules/producto/producto/producto.component';
import { ProductoService } from 'src/app/modules/shared/services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chartBar:any;
  chartDoughnut:any;

  constructor(private  productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.productoService.getProductos()
        .subscribe( (data:any) => {
          console.log("respuesta productos: ", data);
          this.procesarProductosResponse(data);
        }, (error: any) => {
          console.log("error: ", error);
        })
  }

  procesarProductosResponse(resp: any){

    const nombreProducto: String [] = [];
    const cantidad: number [] = [];


        if( resp.metadata[0].codigo == "200") {
          let listProducto = resp.productoResponse.productos;

          listProducto.forEach((element: ProductoElement) => {
         
          nombreProducto.push(element.nombre);
          cantidad.push(element.cantidad);
       });

       this.chartBar = new Chart('canvas-bar', {
         type: 'bar',
         data: {
           labels: nombreProducto,
           datasets: [
             { label: 'Productos', data: cantidad}
           ]
         }
       });

       this.chartDoughnut = new Chart('canvas-doughnut', {
        type: 'doughnut',
        data: {
          labels: nombreProducto,
          datasets: [
            { label: 'Productos', data: cantidad}
          ]
        }
       });
      }
      
  }
}
