export class PostItem {

  id: number;
  image_link: string;
  topic: string;
  title: string;
  body: string;
  author: string;
  date: string;
  main_topic: boolean;

  constructor(image_link, title, body, author, main_topic) {
    this.image_link = image_link;
    this.title = title;
    this.body = body;
    this.author = author;
    this.main_topic = main_topic;
  }
}
