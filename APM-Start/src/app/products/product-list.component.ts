import {Component, OnDestroy, OnInit} from "@angular/core";
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls : ["./product-list.component.css"]
})
export class ProductListComponent  implements OnInit, OnDestroy {

  pageTitle = "Product List";
  imageWidth = 50;
  imageMargin = 2;
  showImage = true;
  filterProducts : IProduct[] = [];
  products : IProduct[] = [];

  private  _listFilter = "";
  private sub!: Subscription;

  constructor(private productService : ProductService) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }


  get listFilter() : string {
    return this._listFilter;
  }

  set listFilter(value : string){
    this._listFilter = value;
    this.filterProducts = this.performFilter(value);
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  async ngOnInit(): Promise<void> {
    this.sub = this.productService.getProducts()
      .subscribe((next)=> {
      this.products = next
      this.filterProducts = this.products;
    });
  }

  private performFilter(value: string) : IProduct[] {
    let filterBy = value.toLocaleLowerCase();
    return this.products.filter(x => x.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClick($event: string) {
    this.pageTitle = $event;
  }
}
