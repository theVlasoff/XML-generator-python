import xml.dom.minidom as minidom
import pandas as pd
import xml.etree.ElementTree as ET

# Read the Excel file into a DataFrame
df = pd.read_excel('ISO messages/ExcelExample.xlsx', sheet_name='Full_View', usecols=[1,2,3,4,14])

# Create the root element of the XML tree
root = ET.Element(df.loc[0, 'XML Tag'][1:-1])

# Create a dictionary to keep track of the parent element for each level
parent_map = {1: root}

# Set initial value for name
name = ""

# Iterate over the rows of the DataFrame
for _, row in df.iterrows():
    level = int(row['Lvl'])
    tag = row['XML Tag']
    isRemoved = row['Is Removed']

    #Skip for the level root element
    if level == 0:
        continue

    #Skip removed elements
    if type(isRemoved) == str and 'Yes' in isRemoved:
        continue

    #Find not empty Element and remove <>. Name is name of element
    if type(tag) == str and tag.startswith('<') and tag.endswith('>'):
        # Extract the tag name from the XML tag
        name = tag[1:-1]

    # Check if the current level is in the parent map, and add it if not
    if level not in parent_map:
        parent_map[level] = []

    # Create the new element
    element = ET.Element(name)

     # Add the element as a child of the parent element for the current level
    parent_map[level].append(element)

    # Update the parent map for the next level
    parent_map[level+1] = element

# Create the XML file
xml_str = ET.tostring(root, encoding='utf-8')
xml_parsed = minidom.parseString(xml_str)
xml_formatted = xml_parsed.toprettyxml(indent='  ')

# Write the formatted XML to a file
with open('output.xml', 'w', encoding='utf-8') as f:
    f.write(xml_formatted)