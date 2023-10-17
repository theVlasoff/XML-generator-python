import { useState } from "react";

function NestedList({ items }) {
    const [isOpen, setIsOpen] = useState(Array(items.length).fill(true));

    const handleClick = (index) => {
        const newIsOpen = [...isOpen];
        newIsOpen[index] = !isOpen[index];
        setIsOpen(newIsOpen);
    };

    return (
        <ul>
            {items.map((item, index) => (
                <div key={item.id}>
                    <li onClick={() => handleClick(index)} className="tooltip" htmlFor={item.xmlTag}>
                        {item.children.length != 0 && <span className="arrow">{isOpen ? "▼" : "▶"}</span>}
                        {item.name} <strong>{item.mult}</strong>
                        <span className="tooltiptext">
                            <strong>Definition:</strong><hr></hr>{item.definition}<hr></hr>
                            {item.mult !== undefined && <span><strong>Optionality:</strong> {item.mult}<hr></hr></span>}
                            {item.typeCode !== undefined && <span><strong>Type / Code: </strong> {item.typeCode}<hr></hr></span>}
                            {item.isIgnored !== undefined && <span><strong>Is Ignored: </strong> {item.isIgnored}<hr></hr></span>}
                        </span>
                    </li>
                    {(item.mult === undefined || item.typeCode === undefined) && < input type="hidden" id={item.level} name={item.xmlTag} />}
                    {item.mult !== undefined && item.typeCode !== undefined && <input type="text" id={item.level} name={item.xmlTag} placeholder={item.typeCode} />}
                    {item.mult === '[0..5]' && <button onClick={() => console.log(item)} type="button" className='button-68'>+</button>}
                    {item.children && (
                        <div style={{ display: isOpen[index] ? "block" : "none" }}>
                            <NestedList items={item.children} />
                        </div>
                    )}
                </div>
            ))}
        </ul>
    );
}

export default NestedList;
