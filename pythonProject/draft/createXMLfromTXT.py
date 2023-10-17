import xml.etree.ElementTree as ET
import xml.dom.minidom as minidom

with open('../ISO messages/reda014_myStandards.txt', 'r') as f:
    lines = f.readlines()

root = ET.Element('root')
stack = [(0, root)]

for line in lines:
    name = line.strip()
    indent = len(line) - len(name)

    while stack[-1][0] >= indent:
        stack.pop()

    parent = stack[-1][1]
    new_element = ET.SubElement(parent, name)
    stack.append((indent, new_element))

xml_string = ET.tostring(root, encoding='unicode', method='xml')
xml_pretty_string = minidom.parseString(xml_string).toprettyxml(indent="  ")

with open('../output.xml', 'w') as f:
    f.write(xml_pretty_string)
