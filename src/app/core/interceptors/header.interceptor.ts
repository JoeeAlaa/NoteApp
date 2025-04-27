import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if (localStorage.getItem('noteUserToken') !== null) {
    req = req.clone({
      setHeaders:{token:'3b8ny__' + localStorage.getItem('noteUserToken')!}
    });
  }

  return next(req);
};
