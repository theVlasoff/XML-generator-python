from lxml import etree
from random import randint

# Чтение XSD-схемы
schema = etree.parse("schema.xsd")

# Генерация XML-файла
root = etree.Element(schema.getroot().tag, nsmap=schema.getroot().nsmap)
for element in schema.iter("{http://www.w3.org/2001/XMLSchema}element"):
    tag = etree.QName(element.attrib["type"]).localname
    child = etree.Element(tag)
    child.text = str(randint(0, 100))  # генерация случайного значения
    root.append(child)

# Запись XML-файла
with open("example.xml", "wb") as f:
    f.write(etree.tostring(root, xml_declaration=True, encoding="utf-8", pretty_print=True))
