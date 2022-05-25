import { Component, OnInit } from '@angular/core';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';

SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent {

  constructor() { }

}
