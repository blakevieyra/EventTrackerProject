import { Songs } from "./songs";

export class Artist {

  id: number;
  name: string;
  songs: Songs[] = [];

  constructor(
    id: number = 0,
    name: string = '',
    songs: Songs[] = []
  ) {
    this.id = id;
    this.name = name;
    this.songs = songs;
  }

}
