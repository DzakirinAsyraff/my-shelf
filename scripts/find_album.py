import json
import requests
import sys
import os
import base64

def get_spotify_token():
    """Get Spotify access token using client credentials flow"""
    api_key = os.getenv('SPOTIFY_API_KEY')
    if not api_key:
        print("Error: SPOTIFY_API_KEY environment variable not set")
        return None
    
    # Assuming API_KEY contains client_id:client_secret
    auth_header = base64.b64encode(api_key.encode()).decode()
    
    headers = {
        'Authorization': f'Basic {auth_header}',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    data = {'grant_type': 'client_credentials'}
    
    response = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data)
    
    if response.status_code == 200:
        return response.json().get('access_token')
    else:
        print(f"Error getting Spotify token: {response.status_code}")
        return None

def find_album_data(artist, album):
    """Find album data using Spotify API"""
    token = get_spotify_token()
    if not token:
        return None, None
    
    headers = {
        'Authorization': f'Bearer {token}'
    }
    
    # Search for the album
    search_url = "https://api.spotify.com/v1/search"
    params = {
        'q': f'artist:{artist} album:{album}',
        'type': 'album',
        'limit': 1
    }
    
    response = requests.get(search_url, headers=headers, params=params)
    
    if response.status_code == 200:
        data = response.json()
        albums = data.get('albums', {}).get('items', [])
        
        if albums:
            album_info = albums[0]
            year = album_info.get('release_date', '').split('-')[0]  # Extract year from date
            cover = album_info.get('images', [{}])[0].get('url', '') if album_info.get('images') else ''
            return year, cover
        else:
            print(f"No album found for {artist} - {album}")
            return None, None
    else:
        print(f"Error fetching data from Spotify: {response.status_code}")
        return None, None

def update_album_data(artist, album, year, cover):
    album_data = {
        "artist": artist,
        "album": album,
        "year": year,
        "cover": cover
    }
    
    os.makedirs('data', exist_ok=True)
    
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