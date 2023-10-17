const [updateCount, setUpdateCount] = useState(0);

const handleDuplicate = (item) => {
    const newItem = { ...item };
    newItem.id = Math.max(...data.map(item => item.id)) + 1;
    newItem.key = newItem.id.toString();
    setData(prevData => [...prevData, newItem]);
    setUpdateCount(prevCount => prevCount + 1); // Increment the update count
    console.log(newItem);
};
