export class CarouselItem {
  id: number;
  backgroundLink: string;
  body: string;
  author: string;

  constructor(backgroundLink: string, body: string, author: string) {
    this.backgroundLink = backgroundLink;
    this.body = body;
    this.author = author;
  }
}
