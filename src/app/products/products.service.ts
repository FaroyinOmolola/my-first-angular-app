import { Injectable } from "@angular/core";
import { IProduct } from "./products";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
	providedIn: "root", //how to register a service to the available for use throughout application
})
export class ProductService {
	private productUrl = "api/products/products.json";

	constructor(private http: HttpClient) {}

	getProducts(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>(this.productUrl).pipe(
			tap((data) => console.log("All")),
			catchError(this.handleError)
		);
	}

	private handleError(err: HttpErrorResponse) {
		//in a real world app, we may send the server to some remote logging infrastructure
		//instead of just logging it to the console
		let errorMessage = "";
		if (err.error instanceof ErrorEvent) {
			//A client side or network error occured. Handle it accordingly.
			errorMessage = `An error occured: ${err.error.message}`;
		} else {
			//The backend returned an unsuccessful response code.
			//The response body may contain clues as to what went wrong
			errorMessage = `Srver returned ${err.status}, error message is: ${err.message} `;
		}
		console.log(errorMessage);
		return throwError(errorMessage);
	}
}
