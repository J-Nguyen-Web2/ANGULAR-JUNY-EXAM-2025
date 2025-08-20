import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ErrorService } from "../services/error.service";
import { catchError, throwError } from "rxjs";


export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const errorService = inject(ErrorService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if(error.error instanceof ErrorEvent) {
                errorMessage = error.error.message
            } else {
                errorMessage = error.error?.message || error.message
            }

            errorService.setError(errorMessage);
            return throwError(() => error)
        })
    )
}