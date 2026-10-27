import urllib.request
import os

os.makedirs('src/assets/images/scroll', exist_ok=True)

urls = {
    'bg_city': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop',
    'mg_buildings': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop',
    'fg_street': 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=2000&auto=format&fit=crop'
}

for name, url in urls.items():
    path = f'src/assets/images/scroll/{name}.jpg'
    urllib.request.urlretrieve(url, path)
    print(f"Downloaded {name}")
