import pandas as pd
import song_tuples as songs
import parser as parse
import artist_id_map as artists



songs_instance = songs.SongGenerator()

print('***********************************************************************************************')
sql_template = "INSERT INTO `song` (`id`, `name`, `song_length`, `release_year`, `genre`, `album_title`, `artist_id`) VALUES ({id}, '{name}', '{length}', '{year}', '{genre}', '{album}', {artist_id});"

song_id = 1

for song in songs_instance.songs_data():
    artist, name, year, length, genre, album = song  

    if isinstance(year, str):
        name, year = year, name
    if "'" in name:
        name = name.replace("'", "")
    if isinstance(genre, str) == False:
        genre = ""
    if isinstance(album, str) == False:
       album = ""
    if "'" in album:
        album = album.replace("'", "")
    for k, v in artists.updated_artist_map.items():
        if artist.lower() == k.lower():
            artist_id = v
            sql_statement = sql_template.format(id=song_id, name=name, year=year, length=length, genre=genre, album=album,artist_id=artist_id)
            #print(sql_statement)
            song_id += 1
            break  
    else:
        continue


print('***********************************************************************************************')
sql_template2 = "INSERT INTO `artist` (`id`, `name`, `image`) VALUES ({id}, '{name}', '{image}');"

for name, artist_id in artists.updated_artist_map.items():
    image = "image_url_" + name.replace(" ", "_").replace(",", "_").replace(".", "_").replace("'", "_").lower()
    sql_statement = sql_template2.format(id=artist_id, name=name, image=image)
    print(sql_statement)

#print(song_data)
print('***********************************************************************************************')


def writeSongInfoToFile(output_file):
    with open(output_file, 'w') as file:
        for song in songs_info:
            file.write(','.join(map(str, song)) + '\n')
