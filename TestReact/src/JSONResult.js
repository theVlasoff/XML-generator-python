import React, { useState } from 'react';
import jsonList from './data.json';

function RecursiveTree({ data }) {
    const [formValues, setFormValues] = useState({});

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    const renderNode = (node) => {
        const { Lvl, Name, 'XML Tag': xmlTag, Definition } = node;
        const children = data.filter((childNode) => childNode.Lvl === (parseInt(Lvl, 10) + 1).toString());

        return (
            <li key={`${Lvl}-${Name}`}>
                <div>
                    <label>{`${xmlTag}, Level ${Lvl}`}</label>
                    <input type="text" name={Name} value={formValues[Name] || ''} onChange={handleChange} />
                </div>
                {Definition && <p>{Definition}</p>}
                {children.length > 0 && (
                    <ul>
                        {children.map((childNode) => renderNode(childNode))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <form>
            <ul>
                {data.filter((node) => node.Lvl === '0').map((node) => renderNode(node))}
            </ul>
            <button type="submit">Submit</button>
        </form>
    );
}

export default RecursiveTree;
