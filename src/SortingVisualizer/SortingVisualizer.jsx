import React, { useState, useEffect, useReducer } from "react";
import "./SortingVisualizer.css";
import visualize from "../sortingAlgorithms/sortingAlgorithms";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slider from '@material-ui/core/Slider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';


const SortingVisualizer = () =>
{
    const [brightness, setBrightness] = useState(0);
    const [array, setArray] = useState([]);
    const [speed, setSpeed] = useState(5);
    const [size, setSize] = useState(100);
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
        Array.from(container.children).forEach(e => e.style.backgroundColor = 'OrangeRed');
        return setArray(arr);
    }
    useEffect(() => generateArrayVals(1000, 5, size), [size]);

    const algorithm = (type) =>
    {
        setDisabled(true);
        toggleGenerate();
        visualize(type, array, speed, toggleGenerate);
    }

    const handleSize = (e, val) =>
    {
        if (val === size) return;
        setSize(val);
        generateArrayVals(1000, 5, val);
    }

    const handleSpeed = (e, val) => 
    {
        if (val === speed) return;
        const newSpeed = Math.abs(10 - (val - 0.5));
        setSpeed(newSpeed);
        setBrightness(speed * 10 + -50);
    }

    const handleGenerate = () =>
    {
        generateArrayVals(1000, 5, size);
        setDisabled(false);
    }

    return (
        <>
            <Accordion defaultExpanded={true} style={{marginBottom: '10px', backgroundColor: '#026e6e', color: 'white'}}> 
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography variant="h6">Controls</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    
                    <Button variant="contained" color="primary" onClick={handleGenerate} disabled={generateDisabled}>
                    Generate New Array
                </Button>
                
                <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group" className="button-group">
                    <Button onClick={() => algorithm('insertion')} disabled={buttonDisabled} >
                        Insertion Sort (Slowest)
                    </Button>
                    <Button onClick={() => algorithm('bubble')} disabled={buttonDisabled} >
                        Bubble Sort (Slow)
                    </Button>
                    <Button onClick={() => algorithm('selection')} disabled={buttonDisabled} >
                        Selection Sort (Fast)
                    </Button>
                    </ButtonGroup>
                    <div className="sliders">
                        <Slider
                            min={10}
                            max={150}
                            step={10}
                            defaultValue={100}
                            onChange={handleSize}
                            disabled={buttonDisabled}
                            marks={true}
                            valueLabelDisplay="auto"
                            />
                        <Slider
                            className="slider"
                            style={{display: 'block'}}
                            color="secondary"
                            step={0.5}
                            min={1}
                            max={10}
                            marks={true}
                            defaultValue={5}
                            onChange={handleSpeed}
                            disabled={buttonDisabled}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    
                </AccordionDetails>
                
            </Accordion>
            <div id="array-container">
                {array.map((value, index) =>
                    <div className="array-bar" key={index} style={{
                        height: `${value / 13}vh`,
                        width: `${(1 / array.length) * 1000}px`,
                        filter: `hue-rotate(${brightness}deg)`
                    }}>
                    </div>)}
            </div>
        </>
    );
}

export default SortingVisualizer;