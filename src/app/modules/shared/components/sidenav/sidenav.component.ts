import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  nombreUsuario: any;

  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Categorías", route: "categoria", icon: "category"},
    {name: "Productos", route: "producto", icon: "production_quantity_limits"}
  ]

  constructor(media: MediaMatcher, private keycloakService: KeycloakService) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
  }

  ngOnInit(): void {
    this.nombreUsuario = this.keycloakService.getUsername();
  }

  cerrarSesion(){
    this.keycloakService.logout();
  }

}
