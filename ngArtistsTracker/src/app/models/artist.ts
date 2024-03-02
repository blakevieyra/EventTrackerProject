export class Artist {

  id: number;
  name: string;
  // songs: Song[] = [];

  constructor(
    id: number = 0,
    name: string = ''
  ) {
    this.id = id;
    this.name = name;
  }

}
