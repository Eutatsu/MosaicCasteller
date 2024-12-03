import requests
from bs4 import BeautifulSoup
import json

RED = "\033[91m"
RESET = "\033[0m" 

colla_url = "https://ca.wikipedia.org/wiki/Castellers_de_Berga"
print(f"Processing: {colla_url}")
    
    # Make an HTTP GET request
response = requests.get(colla_url)

    # Check if the request was successful
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the infobox
    infobox = soup.find("table", class_="infobox")
    if infobox:
        print("infobox found")
        input("enter to continue")
        fila_color = infobox.find("th", string="Color camisa")
        
        if fila_color:
            print(f"color row found:{fila_color}")
            valor_color = fila_color.find_next("td")
            print(f"color value found:{valor_color}")
            color = valor_color.text.strip()
            casella_color = valor_color.find_next("span")
            print(f"color span found:{valor_color}")
            input("enter to continue")  
            if casella_color and "style" in casella_color.attrs:
                
                print("color box found")
                input("enter to continue")
                style = casella_color["style"]
                start = style.find("background-color:")
                if start != -1:
                    codi_color = style[start + len("background-color:"):].split(';')[0].strip()
                    print(f"  - Color: {color}, Code: {codi_color}")
                else:
                    print(f"{RED}  - Color code not found {RESET}")
                    # Append default color data when not found
                   
            else:
                print(f"{RED}  - Color box not found.{RESET}")
                # Append default color data if color box is not found
                
        else:
            print(f"  - 'Color camisa' row not found")
            # Append default color data if 'Color camisa' row is not found
            
    else:
        print(f"  - Infobox not found")
        # Append default color data if infobox is not found
else:
        print(f"Failed to access. Status code:", response.status_code)
