import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/views/home/home.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { SaleComponent } from './components/views/sale/sale.component';
import { InventoryComponent } from './components/views/inventory/inventory.component';
import { AccountComponent } from './components/views/account/account.component';

export const routes: Routes = [
     {path: "login", component: LoginComponent},
     {path: "drawer", component: DrawerComponent,
          children: [
               {
                    path: "home", 
                    component: HomeComponent
               },
               {
                    path: "sale",
                    component: SaleComponent
               },
               {
                    path: "inventory",
                    component: InventoryComponent
               },
               {
                    path: "account",
                    component: AccountComponent
               }
          ]
     },
     {path: "", redirectTo: "login", pathMatch: "full"},
     {path: "not-found", component: NotFoundComponent},
     {path: "**", redirectTo: "not-found", pathMatch: "full"}
];
