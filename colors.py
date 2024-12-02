import requests
from bs4 import BeautifulSoup
import json

RED = "\033[91m"

# Load the JSON file containing colla names and URLs
with open('colles_data.json', 'r', encoding='utf-8') as json_file:
    colles_data = json.load(json_file)

# Prepare a results list to store data
results = []

# Loop through each colla in the JSON
for colla in colles_data:
    colla_name = colla["name"]
    colla_url = colla["url"]
    print(f"Processing {colla_name}: {colla_url}")
    
    # Make an HTTP GET request
    response = requests.get(colla_url)

    # Check if the request was successful
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the infobox
        infobox = soup.find("table", class_="infobox")
        if infobox:
            fila_color = infobox.find("th", string="Color camisa")
            if fila_color:
                valor_color = fila_color.find_next("td")
                color = valor_color.text.strip()
                casella_color = valor_color.find_next("span")
                if casella_color and "style" in casella_color.attrs:
                    style = casella_color["style"]
                    start = style.find("background-color:")
                    if start != -1:
                        codi_color = style[start + len("background-color:"):].split(';')[0].strip()
                        print(f"  - Color: {color}, Code: {codi_color}")
                        # Append data to results
                        results.append({
                            "name": colla_name,
                            "url": colla_url,
                            "color_name": color,
                            "color_code": codi_color
                        })
                    else:
                        print(f"{RED}  - Color code not found for {colla_name}, using default white.")
                        # Append default color data when not found
                        results.append({
                            "name": colla_name,
                            "url": colla_url,
                            "color_name": color,
                            "color_code": "white"  # Default color if no valid color code found
                        })
                else:
                    print(f"{RED}  - Color box not found for {colla_name}, using default white.")
                    # Append default color data if color box is not found
                    results.append({
                        "name": colla_name,
                        "url": colla_url,
                        "color_name": color,
                        "color_code": "white"  # Default color if no color box found
                    })
            else:
                print(f"  - 'Color camisa' row not found for {colla_name}, using default white.")
                # Append default color data if 'Color camisa' row is not found
                results.append({
                    "name": colla_name,
                    "url": colla_url,
                    "color_name": "Color not found",
                    "color_code": "white"  # Default color when row is missing
                })
        else:
            print(f"  - Infobox not found for {colla_name}, using default white.")
            # Append default color data if infobox is not found
            results.append({
                "name": colla_name,
                "url": colla_url,
                "color_name": "Infobox not found",
                "color_code": "white"  # Default color when infobox is missing
            })
    else:
        print(f"Failed to access {colla_name}. Status code:", response.status_code)

# Save the results to a new JSON file
with open('colles_colors.json', 'w', encoding='utf-8') as output_file:
    json.dump(results, output_file, ensure_ascii=False, indent=4)

print("Processing completed! Results saved to colles_colors.json.")
