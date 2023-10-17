import React, { useState, useRef } from 'react';

function DuplicateButton() {
    const [divCount, setDivCount] = useState(1);
    const divRef = useRef(null);

    const duplicateDiv = () => {
        if (divCount >= 5) { // change 5 to your desired maximum element count
            alert('Cannot add more than 5 elements.');
            return;
        }

        const newDiv = document.createElement('div');
        const inputName = `Name${divCount + 1}`;
        newDiv.innerHTML = `
      <label>${inputName}</label>
      <input type="text" name="${inputName}">
    `;
        divRef.current.parentNode.appendChild(newDiv);

        setDivCount(count => count + 1);
    };

    return (
        <div>
            <div ref={divRef}>
                <label>Name1</label>
                <input type="text" name="Name1" />
            </div>
            <button onClick={duplicateDiv}>Duplicate</button>
        </div>
    );
}

export default DuplicateButton;
