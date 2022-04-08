import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mansory';

  public images = [
    'https://images.pexels.com/photos/65310/pexels-photo-65310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/2449310/pexels-photo-2449310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/11635509/pexels-photo-11635509.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/11495862/pexels-photo-11495862.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/2872641/pexels-photo-2872641.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/7116217/pexels-photo-7116217.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/4282674/pexels-photo-4282674.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/10848006/pexels-photo-10848006.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/137615/pexels-photo-137615.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/494194/pexels-photo-494194.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/494194/pexels-photo-494194.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/7116217/pexels-photo-7116217.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/11635509/pexels-photo-11635509.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/2872641/pexels-photo-2872641.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/804720/pexels-photo-804720.png?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  ];

  constructor() {
    this.images = [...this.images, ...this.images, ...this.images, ...this.images];
  }

  public onImageLoad(imageElement: HTMLImageElement): void {
    const imageHeight: number = imageElement.getBoundingClientRect().height;
    const imageWidth: number = imageElement.getBoundingClientRect().width;

    this._configureGridColumns(imageElement, imageHeight, imageWidth);
  }

  private _configureGridColumns(i: HTMLImageElement, imageHeight: number, imageWidth: number): void {

    const isHorizontal = imageHeight < imageWidth;
    const isVertical = imageHeight > imageWidth;
    const isDoubleWidthThanHeight = imageWidth > imageHeight * 2;
    const isSquare = (imageHeight <= imageWidth + (imageWidth * 0.3)) && (imageHeight >= imageWidth - (imageWidth * 0.4));

    if (isSquare) {

      //this calculation is for define a span value between 1 and 2 on randomical way and with wheight factor 80% small image e 20% bigger 
      const randomValueSpan = this._randomValueSpanWeighted({ 1: 0.8, 2: 0.2 });

      this._setImageColumnConfiguration(i, 'span ' + randomValueSpan, 'span ' + randomValueSpan);
    } else if (isVertical) {
      this._setImageColumnConfiguration(i, 'span 1', 'span 2');
    } else if (isHorizontal) {
      if (isDoubleWidthThanHeight) {
        this._setImageColumnConfiguration(i, 'span 3', 'span 1');
      } else {
        this._setImageColumnConfiguration(i, 'span 2', 'span 1');
      }
    }
  }

  private _setImageColumnConfiguration(i: HTMLImageElement, gridColumnEnd: string, gridRowEnd: string): void {
    i.parentElement.style.gridColumnEnd = gridColumnEnd;
    i.parentElement.style.gridRowEnd = gridRowEnd;
  }

  private _randomValueSpanWeighted(probability: { [factor: number]: number }): number {
    let i;
    let sum = 0;
    const r = Math.random();
    for (i in probability) {
      sum += probability[i];
      if (r <= sum) { return i; }
    }
  }

}
