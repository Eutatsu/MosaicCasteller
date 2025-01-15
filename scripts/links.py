import requests
from bs4 import BeautifulSoup
import json

# Target URL
Llista_URL = "https://ca.wikipedia.org/wiki/Llista_de_colles_castelleres"

# Make an HTTP GET request
response = requests.get(Llista_URL)

# Check if the request was successful
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
  
    section = soup.find("h2",id="Colles_castelleres_actuals")
    if section:
        
        print("Section found")

        colles_data = []  

        taula = section.find_next("table")
        files = taula.find_all("tr")[1:]

        for fila in files:
            caselles = fila.find_all("td")
            colla_link = caselles[1].find('a')
            if colla_link:
                colla_name = colla_link.text.strip()
                colla_url = "https://ca.wikipedia.org" + colla_link['href']
                

                print(f"Colla Name: {colla_name}, URL: {colla_url}")

                colles_data.append({
                    'name': colla_name,
                    'url': colla_url
                })
            else:
                print("name not found")
        with open('colles_data.json', 'w', encoding='utf-8') as json_file:
            json.dump(colles_data, json_file, ensure_ascii=False, indent=4)
    else:
    
        print("Section not found")


else:
    print("Failed to access webpage. Status code:", response.status_code)


input("Press Enter to exit...")
