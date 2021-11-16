import { Component, OnInit, OnDestroy } from "@angular/core";
import { IProduct } from "./products";
import { ProductService } from "./products.service";
import { Subscription } from "rxjs";

@Component({
	templateUrl: "./products-list.component.html",
	styleUrls: ["./products-list.component.css"],
	//providers: [ProductService] //how to register a service in specific components
})
export class ProductListComponent implements OnInit, OnDestroy {
	constructor(private productService: ProductService) {}

	pageTitle: string = "Product List";
	imageWidth: number = 50;
	imageMargin: number = 2;
	showImage: boolean = false;
	errorMessage: string = "";
	sub!: Subscription;

	private _listFilter: string = "";
	get listFilter(): string {
		return this._listFilter;
	}
	set listFilter(value: string) {
		this._listFilter = value;
		this.filteredProducts = this.products.filter((product: IProduct) =>
			product.productName
				.toLowerCase()
				.includes(this.listFilter.toLowerCase())
		);
	}
	filteredProducts: IProduct[] = [];

	products: IProduct[] = [];

	// this.performFilter(value)
	// performFilter(filterBy: string): IProduct[]{
	// 	filterBy.toLowerCase()
	// 	return this.products.filter((product: IProduct)=> product.productName.toLowerCase().includes(filterBy))
	// }
	toggleImage(): void {
		this.showImage = !this.showImage;
	}

	ngOnInit(): void {
		this.sub = this.productService.getProducts().subscribe({
			next: (products) => {
				this.products = products;
				this.filteredProducts = this.products;
			},
			error: (err) => (this.errorMessage = err),
		});
	}
	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
	onRatingClicked(message: string): void {
		this.pageTitle = "Product List: " + message;
	}
}
