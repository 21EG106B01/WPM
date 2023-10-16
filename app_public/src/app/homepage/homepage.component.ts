import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  public pageContent = {
    header: {
      title: 'PetNeeds',
      strapline: 'Find the best products for your pets'
    },
    sidebar: 'Looking for grooming products for your pets? PetNeeds helps you find the best qulity products for your pets. Perhaps a brush or food? Let PetNeeds help you find the products you are looking for.'
  }
}
