import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-image-galery',
  templateUrl: './image-galery.component.html',
  styleUrls: ['./image-galery.component.css']
})
export class ImageGaleryComponent implements OnInit {

  images: Image[];

  constructor() { }

  ngOnInit(): void {
  }

}
