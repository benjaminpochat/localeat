import { SecurityContext } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Farm } from 'src/app/commons/models/farm.model';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  farm: Farm;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  close() {
    this.farm = null;
  }

  getSlideshowUrl(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.farm.slideshowUrl);
  }
}
