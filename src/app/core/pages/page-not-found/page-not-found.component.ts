import { Component, OnInit } from '@angular/core';
import Parallax from 'parallax-js';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})


export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let scene = document.getElementById('scene');
    let parallaxInstance = new Parallax(scene, {
      relativeInput: true
    });
    parallaxInstance.friction(0.2, 0.2);
  }

}
