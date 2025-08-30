import json
import requests
import sys

def find_album_data(artist, album):
    # Replace with an actual API endpoint or database query
    api_url = f"https://api.example.com/albums?artist={artist}&album={album}"
    
    response = requests.get(api_url)
    
    if response.status_code == 200:
        data = response.json()
        album_year = data.get('year')
        album_cover = data.get('cover')
        return album_year, album_cover
    else:
        print(f"Error fetching data: {response.status_code}")
        return None, None

def update_album_data(artist, album, year, cover):
    album_data = {
        "artist": artist,
        "album": album,
        "year": year,
        "cover": cover
    }
    
    try:
        with open('data/albums.json', 'r') as f:
            albums = json.load(f)
    except FileNotFoundError:
        albums = []

    albums.append(album_data)

    with open('data/albums.json', 'w') as f:
        json.dump(albums, f, indent=4)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python find_album_data.py <artist> <album>")
        sys.exit(1)

    artist_name = sys.argv[1]
    album_name = sys.argv[2]

    year, cover = find_album_data(artist_name, album_name)
    
    if year and cover:
        update_album_data(artist_name, album_name, year, cover)
        print(f"Added album: {album_name} by {artist_name} (Year: {year})")
    else:
        print("Failed to retrieve album data.")