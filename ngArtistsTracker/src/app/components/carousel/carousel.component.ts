import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@Component({
  standalone: true,
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  imports: [CommonModule, CarouselModule],
})
export class CarouselComponent {
  myInterval = 5000;
  activeSlideIndex = 0;
  slides: { image: string; text?: string }[] = [
    {
      image: 'https://i.scdn.co/image/ab6761610000e5eb859e4c14fa59296c8649e0e4',
    },
    {
      image: 'https://i.scdn.co/image/ab6761610000e5eba0c87c8f329b436eac8b9784',
    },
    {
      image: 'https://i.scdn.co/image/ab6761610000e5eb3bcef85e105dfc42399ef0ba',
    },
    {
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb',
    },
    {
      image: 'https://i.scdn.co/image/ab6761610000e5ebd8b9980db67272cb4d2c3daf',
    },
    {
      image: 'https://i.scdn.co/image/ab6761610000e5eb122d1145d880736383742ebc',
    },
    {
      image: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9',
    },
    {
      image: 'https://i.scdn.co/image/ab6761610000e5eb69ca98dd3083f1082d740e44',
    },
    {
      image: 'https://i.scdn.co/image/ab6761610000e5eb4be60ee03d2210503baedfa2',
    },
    {
      image: 'https://i.scdn.co/image/ab6761610000e5eb68f6e5892075d7f22615bd17',
    },
  ];
}
