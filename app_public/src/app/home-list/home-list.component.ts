import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdDataService } from '../prod-data.service';

export class Product {
  _id: string = '';
  name: string = '';
  imgSrc: string = '';
  smalDesc: string = '';
  prodVar: [{ price: number }] = [{
    price: 0
  }];
  rating: number = 0;
  tags: string[] = [];
  company: {name: string} = {
    name: ''
  };
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent {
  products: Product[] = [];

  constructor(private router: Router, private prodDataService: ProdDataService) { }

  redirectToProduct(productId: string) {
    // Navigate to the product detail page with the product id as a route parameter
    this.router.navigate(['/product', productId]);
  }
  private getProducts(): void {
    this.prodDataService
      .getProducts()
      .then(foundProducts => this.products = foundProducts);
  }

  ngOnInit() {
    this.getProducts();
  }
}


/*{
  _id: '6509369321b8ef98d5bf04a2',
    name: 'Dog Food',
      imgSrc: 'https://storage.googleapis.com/petneedstore_resources/images/pedigree.jpeg',
        smalDesc: 'Pedigree high quality dog food',
          price: 260,
            rating: 3,
              tags: ['Dog', 'Food', 'Medium'],
                company: 'Pedigree'
}, {
  _id: "65093cc221b8ef98d5bf04a6",
    name: "Kennel",
      smalDesc: "Small kennel for animal transport",
        price: 8000,
          rating: 4,
            tags: ["Any Animal", "Shelter", "Small"],
              company: "PetMate",
                imgSrc: "https://storage.googleapis.com/petneedstore_resources/images/kennel.jpeg"
}*/
