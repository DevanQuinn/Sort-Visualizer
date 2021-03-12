import React, { useState, useEffect, useReducer } from "react";
import "./SortingVisualizer.css";
import sortingAlgorithms from "../sortingAlgorithms/sortingAlgorithms";

const SortingVisualizer = () =>
{
    const [array, setArray] = useState([]);
    const [speed, setSpeed] = useState([5]);
    const [buttonDisabled, setDisabled] = useState(false);
    const [generateDisabled, toggleGenerate] = useReducer(disabled => !disabled, false);
    
    const generateArrayVals = (max, min, length) =>
    {
        let arr = [];
        for (let i = 0; i < length; i++)
        {
            arr[i] = Math.floor(Math.random() * (max - min + 1) + min);
        }
        const container = document.getElementById('array-container');
        Array.from(container.children).forEach(e => e.style.backgroundColor = 'red');
        return setArray(arr);
    }

    useEffect(() => generateArrayVals(950, 5, 100), []);
    
    const handleSpeed = (e) => 
    {
        const newSpeed = Math.abs(10 - e.target.value);
        setSpeed(newSpeed);
    }

    const mergeSort = () =>
    {
        setDisabled(true);
        toggleGenerate();
        const newArray = sortingAlgorithms.mergeSort(array);
        sortingAlgorithms.visualizeAlt('merge', speed, toggleGenerate);
        //return setTimeout(() => setArray(newArray), 1000);
    }

    const bubbleSort = () => 
    {
        setDisabled(true);
        toggleGenerate();
        sortingAlgorithms.bubbleSort(array);
        sortingAlgorithms.visualizeAlt('bubble', speed, toggleGenerate);
        // setArray([...newArray]);
    }

    const handleGenerate = () =>
    {
        generateArrayVals(1000, 5, 100);
        setDisabled(false);
    }

    return (
        <>
            <nav>
                <button 
                    onClick={handleGenerate} 
                    disabled={generateDisabled}>
                    Generate New Array
                </button>
                <button onClick={bubbleSort} disabled={buttonDisabled} >Bubble Sort</button>
                <input type="range" step="0.5" min="0.5" max="9.5" defaultValue={speed} onChange={handleSpeed} disabled={buttonDisabled}/>
            </nav>
            <div id="array-container">
                {array.map((value, index) =>
                    <div className="array-bar" key={index} style={{ height: `${value / 13}vh`, width: `${array.length}vw` }}>
                    </div>)}
            </div>
        </>
    );
}

export default SortingVisualizer;