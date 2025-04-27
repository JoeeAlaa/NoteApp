import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withViewTransitions()), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([headerInterceptor,loadingInterceptor,errorInterceptor])),
    provideAnimations(), 
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule,SweetAlert2Module)
  ]
};
