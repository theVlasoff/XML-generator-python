import React, { useState } from 'react';
import NestedList from './NestedList';
import data from './data.json'
import CreateXmlDocument from './CreateXMLDocument';

function GenerateForm() {
    const [result, setResult] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formElements = event.target.elements;
        const formData = Array.from(formElements).filter(element => {
            return element.tagName.toLowerCase() !== 'button';
        });
        const xmlDoc = CreateXmlDocument(formData);
        const xmlString = new XMLSerializer().serializeToString(xmlDoc);
        const beautifiedXmlText = new XmlBeautify().beautify(xmlString);
        setResult(beautifiedXmlText);
    };


    return (
        <div className="container">
            <div className="left" key="left">
                <form onSubmit={handleSubmit}>
                    <div className="mainList">
                        <NestedList items={data} />
                        {/* {renderTree(data.filter((item) => item.level === 0))} */}
                    </div>
                    <button type="submit" value="Submit">Submit</button>
                </form>
            </div>
            <div className="right" key="Right">
                <textarea value={result} readOnly />
            </div>
        </div>
    );
}

export default GenerateForm;