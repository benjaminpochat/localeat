import { Injectable } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';

@Injectable({
  providedIn: 'root'
})
export class SlaughterService {

  constructor() { }

  public getSlaughters(): Slaughter[] {
    return [];
  }

  public createSlaughter(slaughter: Slaughter){
    console.log('Slaughter saved.');
  }
}
