import { Songs } from "./songs";

export class Artist {

  id: number;
  name: string;
  band: string;
  songs: Songs[] = [];

  constructor(
    id: number = 0,
    name: string = '',
    band: string = '',
    songs: Songs[] = []
  ) {
    this.id = id;
    this.name = name;
    this.songs = songs;
    this.band = band;

  }

}
