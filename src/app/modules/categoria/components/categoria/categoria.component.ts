import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from 'src/app/modules/shared/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getCategorias();
  }
  displayedColumns: string[] = ['idCategoria', 'nombre', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<CategoriaElement>();

  getCategorias(){

    this.categoriaService.getCategorias()
        .subscribe( (data:any) => {

          console.log("respuesta categories: ", data);
          this.processCategoriesResponse(data);

        }, (error: any) => {
          console.log("error: ", error);
        })
  }

  processCategoriesResponse(resp: any){

    const dataCategory: CategoriaElement[] = [];

    if( resp.metadata[0].codigo == "200") {

      let listCategory = resp.categoriaResponse.categorias;

      console.log("array ", listCategory) 
      listCategory.forEach((element: CategoriaElement) => {
        dataCategory.push(element);
      });
    }

    this.dataSource = new MatTableDataSource<CategoriaElement>(dataCategory);   

  }
}

export interface CategoriaElement {
  descripcion: string;
  idCategoria: number;
  nombre: string;
}