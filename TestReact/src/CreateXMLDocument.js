function CreateXmlDocument(formData) {
    const xmlDoc = document.implementation.createDocument("", "", null);
    const root = xmlDoc.createElement(formData[0].name.slice(1, -1));
    xmlDoc.appendChild(root);
    const currentParents = [root];

    for (let i = 1; i < formData.length; i++) {
        const name = formData[i].name;
        let level = parseInt(formData[i].id);
        const value = formData[i].value;
        console.log(value);
        const xmlElement = xmlDoc.createElement(name.slice(1, -1));
        xmlElement.appendChild(xmlDoc.createTextNode(value));
        currentParents[level] = xmlElement;
        currentParents[level - 1].appendChild(xmlElement);
    }

    return xmlDoc;
}

export default CreateXmlDocument;