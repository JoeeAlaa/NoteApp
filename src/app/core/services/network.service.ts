import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  isOnline!:WritableSignal<boolean>
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _ToastrService = inject(ToastrService);

  constructor() {
    this.isOnline = signal(true);

    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.isOnline.set(navigator.onLine);

      window.addEventListener('online', () => {
        this.isOnline.set(true)
        this._ToastrService.success('you are online now','FreshCart') 
      });
      window.addEventListener('offline', () => {
        this.isOnline.set(false)
        this._ToastrService.error('you are offline','FreshCart')

      });
    }
  }
}
