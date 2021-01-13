import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  id: number;
  restaurant: Restaurant;
  url: string;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  isActive: boolean;

  imageurl = 'http://localhost:8080/zonions/imgrestaurant';

  constructor(private route: ActivatedRoute, private router: Router,
              private restaurantService: RestaurantService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.restaurant = new Restaurant();

    this.id = this.route.snapshot.params.id;

    this.restaurantService.getRestaurant(this.id)
      .subscribe(data => {
        console.log(data);
        this.restaurant = data;



        if (this.restaurant.active === true)
      {
        this.isActive = true;
      }
      }, error => console.log(error));

      // this.url=`${this.imageurl}/${this.restaurant.id}`;


  }



  revert(): void{
    this.router.navigate(['/home']);
  }

  // Gets called when the user clicks on retrieve image button to get the image from back end
  getImage(): void {

    // Make a call to Spring Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/zonions/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
