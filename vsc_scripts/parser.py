import pandas as pd

class SongParser:
    def __init__(self):
        self.songs_info = self.generateSongTuples()

    def generateSongTuples(self):
        file_path = 'TopSongs.csv'
        df = pd.read_csv(file_path)
        songs_info = list(df[['Artist', 'Song', 'Year', "col1", "col2", "col3"]].itertuples(index=False, name=None))
        #updated_tuples = [t[:3] for t in songs_info]
        return songs_info


songs = SongParser()
print(songs.generateSongTuples())
