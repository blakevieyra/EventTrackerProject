import { Artist } from "./artist";

export class Songs {
  id: number;
  name: string;
  album: string;
  genre: string;
  length: number;
  year: number;
  artist: Artist | null;

  constructor(
    id: number = 0,
    name: string = '',
    genre: string = '',
    album: string = '',
    length: number = 0,
    year: number = 0,
    artist: Artist | null = null
  ) {
    this.id = id;
    this.name = name;
    this.album = album;
    this.genre = genre;
    this.length = length;
    this.year = year;
    this.artist = artist;
  }
}
