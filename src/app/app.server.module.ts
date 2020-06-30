import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './shell/shell.component';

const routes: Routes = [{ path: 'shell', component: AppShellComponent }];

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppShellComponent],
  declarations: [],
})
export class AppServerModule { }
