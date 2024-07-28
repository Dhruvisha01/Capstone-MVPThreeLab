// import { Connect } from "twilio/lib/twiml/VoiceResponse";
var tutorial = true
var skipTutorial = false

// Import necessary functions and modules from other files
import { key1Open, key2Open } from './main.js';
import { needle } from './main.js';
import { update } from "three/examples/jsm/libs/tween.module.js";
import { needlePivot } from './main.js';

// Function to show the overlay and introduction div
function showDiv() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('labIntro').style.display = 'block';
}

// Function to hide the overlay and introduction div
function hideDiv() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('labIntro').style.display = 'none';
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Show the div and overlay when the page loads 
    showDiv();

    // Add event listeners to various elements
    document.querySelector('#next').addEventListener('click', GalvIntro);
    document.getElementById('submitConnections').style.display = "none"
    document.body.addEventListener('click', function (event) {
        // Event listeners for different buttons and steps
        if (event.target.closest('#next')) {
            GalvIntro();
        }
        if (event.target.closest('.prevLab')) {
            LabIntro();
        }
        if (event.target.closest('.nextBattery')) {
            BatteryIntro();
        }
        if (event.target.closest('.prevGalv')) {
            GalvIntro();
        }
        if (event.target.closest('.nextHighRB')) {
            HighRBIntro();
        }
        if (event.target.closest('.prevBattery')) {
            BatteryIntro();
        }
        if (event.target.closest('.nextShuntRB')) {
            ShuntRBIntro();
        }
        if (event.target.closest('.prevHighRB')) {
            HighRBIntro();
        }
        if (event.target.closest('.nextKey1')) {
            Key1Intro();
        }
        if (event.target.closest('.prevShuntRB')) {
            ShuntRBIntro();
        }
        if (event.target.closest('.prevKey1')) {
            Key1Intro();
        }
        if (event.target.closest('.nextKey2')) {
            Key2Intro();
        }
        if (event.target.closest('.hideDiv')) {
            hideDiv();
        }
        if (event.target.closest('.circuitDiagram')) {
            circuitDiagram();
        }
        if (event.target.closest('.circuitDiagramIcon')) {
            displayDiagram();
        }
        if (event.target.closest('#connectWiresDiv2')) {
            connectWiresStep3();
        }
        if (event.target.closest('#connectWiresDiv3')) {
            console.log("should hide display")
            doLab();
        }
        if (event.target.closest('.procedure')) {
            procedure();
        }

        if (event.target.closest('.stepsIcon')) {
            steps();
        }
        if (event.target.closest('.closeSteps')) {
            doLab();
        }
        if (event.target.closest('.stepsNext')) {
            obTable();
        }
        if (event.target.closest('.observations')) {
            takeReadings();
        }
        if (event.target.closest('.takeReadings')) {
            doneWithTutorial();
        }
        if (event.target.closest('#keyStatusContinue')) {
            document.getElementById('modal-overlay-key').style.display = "none"
        }
        if (event.target.closest('.info')) {
            document.getElementById('modal-overlay-info').style.display = "block"
        }
        if (event.target.closest('.closeInfo')) {
            document.getElementById('modal-overlay-info').style.display = "none"
        }



    });

});

// Function to display lab introduction content
function LabIntro() {
    const labIntroDiv = document.getElementById('labIntro');
    labIntroDiv.innerHTML = `
    <h1 class="roboto-bold introTitle">Welcome to the Lab Simulation!</h1>
    <p class="introContent roboto-regular">In this section, you’ll test your hypothesis by doing the experiment
        yourself.
        Here's how the lab works:</p>

    <div class="progress-container">
        <div class="progress-step">
            <div class="progress-circle">
                <img src="/images/batteryOutline.svg" alt="Battery Icon" style="width: 30px; height: 30px;">
            </div>
            <div class="progress-text roboto-light">Learn the equipment</div>
        </div>
        <div class="progress-line"></div>
        <div class="progress-step">
            <div class="progress-circle">
                <img src="/images/circuitOutline.svg" alt="Setup Icon" style="width: 30px; height: 30px;">
            </div>
            <div class="progress-text roboto-light">Set up the equipment</div>
        </div>
        <div class="progress-line"></div>
        <div class="progress-step">
            <div class="progress-circle">
                <img src="/images/stepsOutline.svg" alt="Procedures Icon" style="width: 30px; height: 30px;">
            </div>
            <div class="progress-text roboto-light">Learn the procedures</div>
        </div>
        <div class="progress-line"></div>
        <div class="progress-step">
            <div class="progress-circle">
                <img src="/images/settingsOutline.svg" alt="Experiment Icon" style="width: 30px; height: 30px;">
            </div>
            <div class="progress-text roboto-light">Do the Experiment</div>
        </div>
        <div class="progress-line"></div>
        <div class="progress-step">
            <div class="progress-circle">
                <img src="/images/recordOutline.svg" alt="Record Icon" style="width: 30px; height: 30px;">
            </div>
            <div class="progress-text roboto-light">Record observations</div>
        </div>
    </div>


    <div class="next right-arrow" id="next">
        <img src="/images/arrow.svg" alt="">
    </div>
    `
}

// Function to display galvanometer introduction content
function GalvIntro() {
    const labIntroDiv = document.getElementById('labIntro');
    labIntroDiv.innerHTML = `
        <h2 class = "roboto-bold introTitle tutorialTitle">Let's start by learning the equipment name and their functions!</h2>
        <div class="equipment-container">
            <div class="prevLab left-arrow">
                <img src="/images/leftArrow.svg" alt="">
            </div>
            <div class="tutorialImage"> 
                <img src="/images/galvanometerUpdated.png" alt="Galvanometer">
            </div>
            <div class="equipment-text">
                <h2 class = "tutorialName roboto-bold">Galvanometer</h2>
                <p class = "roboto-regular">A galvanometer measures small electric currents in the circuit.</p>
                <p class = "roboto-regular">Avoid damage by limiting the amount of current flowing through the galvanometer.</p>
            </div>
            
        </div>
        <div class="next right-arrow nextBattery">
			    <img src="/images/arrow.svg" alt="">
		    </div>
    `;
}

// Function to display battery introduction content
function BatteryIntro() {
    const labIntroDiv = document.getElementById('labIntro');
    labIntroDiv.innerHTML = `
        <h2 class = "roboto-bold introTitle tutorialTitle">Let's start by learning the equipment name and their functions!</h2>
        <div class="equipment-container">
            <div class="prevGalv left-arrow">
                <img src="/images/leftArrow.svg" alt="">
            </div>
            <div class="tutorialImage"> 
                <img src="/images/batteryUpdated.png" alt="Galvanometer">
            </div>
            <div class="equipment-text">
                <h2 class = "tutorialName roboto-bold">Battery</h2>
                <p class = "roboto-regular">A battery supplies power to the circuit.
                </p>
                <p class = "roboto-regular">Connect the battery to the circuit, ensuring the correct polarity to avoid damage.</p>
            </div>
            
        </div>
        <div class="next right-arrow nextHighRB">
			    <img src="/images/arrow.svg" alt="">
		    </div>
    `;
}

// Function to display high resistance box introduction content
function HighRBIntro() {
    const labIntroDiv = document.getElementById('labIntro');
    labIntroDiv.innerHTML = `
        <h2 class = "roboto-bold introTitle tutorialTitle">Let's start by learning the equipment name and their functions!</h2>
        <div class="equipment-container">
            <div class="prevBattery left-arrow">
                <img src="/images/leftArrow.svg" alt="">
            </div>
            <div class="tutorialImage"> 
                <img src="/images/high.png" alt="Galvanometer">
            </div>
            <div class="equipment-text">
                <h2 class = "tutorialName roboto-bold">High Resistance Box</h2>
                <p class = "roboto-regular" >A high resistance box limits the current flowing through the circuit and helps achieve the desired deflection of the galvanometer using the half deflection method. 
                </p>
                <p class = "roboto-regular">Adjust the resistance by tapping the high resistance box and selecting the values to control the current and deflection.
                </p>
            </div>
            
        </div>
        <div class="next right-arrow nextShuntRB">
			    <img src="/images/arrow.svg" alt="">
		</div>
    `;
}

// Function to display shunt resistance box introduction content
function ShuntRBIntro() {
    const labIntroDiv = document.getElementById('labIntro');
    labIntroDiv.innerHTML = `
        <h2 class = "roboto-bold introTitle tutorialTitle">Let's start by learning the equipment name and their functions!</h2>
        <div class="equipment-container">
            <div class="prevHighRB left-arrow">
                <img src="/images/leftArrow.svg" alt="">
            </div>
            <div class="tutorialImage"> 
                <img src="/images/shunt.png" alt="Galvanometer">
            </div>
            <div class="equipment-text">
                <h2 class = "tutorialName roboto-bold" >Shunt Resistance Box</h2>
                <p class = "roboto-regular" >A shunt resistance box diverts current away from the galvanometer and helps achieve the desired deflection using the half deflection method.

                </p>
                <p class = "roboto-regular" >Adjust the resistance by tapping the shunt resistance box and selecting the values to control the current and deflection.
                </p>
            </div>
            
        </div>
        <div class="next right-arrow nextKey1">
			    <img src="/images/arrow.svg" alt="">
		    </div>
    `;
}

// Function to display key 1 introduction content
function Key1Intro() {
    const labIntroDiv = document.getElementById('labIntro');
    labIntroDiv.innerHTML = `
        <h2 class = "roboto-bold introTitle tutorialTitle">Let's start by learning the equipment name and their functions!</h2>
        <div class="equipment-container">
            <div class="prevShuntRB left-arrow">
                <img src="/images/leftArrow.svg" alt="">
            </div>
            <div class="tutorialImage"> 
                <img src="/images/key.png" alt="Galvanometer">
            </div>
            <div class="equipment-text">
                <h2 class = "tutorialName roboto-bold">Key 1</h2>
                <p class = "roboto-regular">Key 1 switches the current on and off in the circuit. 
                </p>
                <p class = "roboto-regular">Tap Key 1 to start or stop the current flow during the experiment.
                </p>
            </div>
            
        </div>
        <div class="next right-arrow nextKey2">
			    <img src="/images/arrow.svg" alt="">
		    </div>
    `;
}

// Function to display key 2 introduction content
function Key2Intro() {
    const labIntroDiv = document.getElementById('labIntro');
    labIntroDiv.innerHTML = `
        <h2 class = "roboto-bold introTitle tutorialTitle">Let's start by learning the equipment name and their functions!</h2>
        <div class="equipment-container">
            <div class="prevKey1 left-arrow">
                <img src="/images/leftArrow.svg" alt="">
            </div>
            <div class="tutorialImage"> 
                <img src="/images/key.png" alt="Galvanometer">
            </div>
            <div class="equipment-text">
                <h2 class = "tutorialName roboto-bold">Key 2</h2>
                <p class = "roboto-regular">Key 2 switches the current on and off to the shunt resistance box. 
                </p>
                <p class = "roboto-regular">Tap Key 2 to control whether the current is diverted through the shunt resistance box or flows through the galvanometer.
                </p>
            </div>
        </div>

        <div class="nextButtonDiv circuitDiagram">
            <button class="next-button">Next</button>
		</div>
    `;
}

// Function to display circuit diagram
function circuitDiagram() {
    const circuitDiagramIntro = document.getElementById('circuit')
    const labIntro = document.getElementById('labIntro')
    const toolBox = document.getElementById('toolBox')
    const highlight = document.getElementById('highlight')
    document.getElementById('overlay').style.zIndex = "1001"
    labIntro.style.display = "none"
    circuitDiagramIntro.style.display = "block"
    toolBox.style.display = "block"
    highlight.style.display = "block"
}

// Function to display circuit diagram tutorial
function displayDiagram() {
    const circuitDiagramModal = document.getElementById('circuitDiagramModal')
    const circuitDiagramIntro = document.getElementById('circuit')
    circuitDiagramModal.style.display = "block"
    const toolBox = document.getElementById('toolBox')
    const highlight = document.getElementById('highlight')
    document.getElementById('overlay').style.zIndex = "1002"
    highlight.style.display = "none"
    circuitDiagramIntro.style.display = "none"
}

// Close circuit diagram modal
document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('circuitDiagramModal').style.display = 'none';
    if (tutorial) {
        document.getElementById('fixPositionIntro').style.display = 'block';
        document.getElementById('lockButton').style.display = "block"
        document.getElementById('lockButton').disabled = true
        document.getElementById('overlay').style.zIndex = "1001"
        const highlight = document.getElementById('highlight')
        highlight.style.display = "block"
        highlight.style.left = "88%"

    }
    else {
        const highlight = document.getElementById('highlight')
        // toolBox.style.display = "none"
        highlight.style.display = "none"
    }


});

// Event listener for the next button in the fix positions intro
document.getElementById('next-button-fix').addEventListener('click', function () {
    const highlight = document.getElementById('highlight')
    const fixPositionIntro = document.getElementById('fixPositionIntro')
    document.getElementById('circuitDiagramModal').style.display = 'none';
    highlight.style.display = "none"
    fixPositionIntro.style.display = "none"
    tutorial = false
    document.getElementById('lockButton').disabled = false
    document.getElementById('lockButton').style.display = "block"
    hideDiv()
})

// Event listener for connecting wires tutorial
document.getElementById('connectWiresDiv1').addEventListener('click', function () {
    tutorial = true
    connectWiresStep2()
})

// Function to display step 2 of connecting wires
function connectWiresStep2() {
    const connectWiresDiv = document.getElementById('connectWiresDiv')
    connectWiresDiv.innerHTML = `
    <h3>If you need to delete any connections use the eraser button above</h3>
	<div class="newNextButtonDiv" id="connectWiresDiv2">
		<button class="next-button" id="next-button-fix">Next</button>
	</div>
    `
    const highlight = document.getElementById('highlight')
    highlight.style.display = "block"
    highlight.style.left = "80%"
}

// Function to display step 3 of connecting wires
function connectWiresStep3() {
    const connectWiresDiv = document.getElementById('connectWiresDiv')
    connectWiresDiv.innerHTML = `
    <h3>Once you finished connecting the circuit, tap the “submit” button on the top right corner. </h3>
	<div class="newNextButtonDiv" id="connectWiresDiv3">
		<button class="next-button" id="next-button-fix">Next</button>
	</div>
    `
    const highlight = document.getElementById('highlight')
    highlight.style.display = "block"
    highlight.style.left = "92%"
}

// Function to start the lab
function doLab() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('connectWiresDiv').style.display = "none"
    document.getElementById('highlight').style.display = "none"
    document.getElementById("wireFeedbackDiv").style.display = "none";
    document.getElementById('steps').style.display = "none"
    tutorial = false
    document.getElementById('erase').disabled = false
    document.getElementById('submitConnections').disabled = false

}
var directionOfDeflection = null

// Function to handle correct connections
export function correctConnections(direction) {
    directionOfDeflection = direction
    tutorial = true
    console.log("Correct Connections function called");
    const wireFeedbackDiv = document.getElementById("wireFeedbackDiv");
    if (wireFeedbackDiv) {
        wireFeedbackDiv.style.display = "block";
        if (tutorial) {
            wireFeedbackDiv.innerHTML = `
            <h3>
                Nice attention to detail, the circuit connections are correct.
                Now, we’re ready to start the lab!
            </h3>
            <div class="nextButtonDiv procedure">
            <button class="next-button">Next</button>
		</div>
        `;
        }
        else {
            wireFeedbackDiv.innerHTML = `
            <h3>
                Nice attention to detail, the circuit connections are correct.
                Now, we’re ready to start the lab!
            </h3>
            <div class="nextButtonDiv doLab">
            <button class="next-button">Close</button>
		</div>
        `;
        }


        document.getElementById("submitConnections").style.display = "none"
        document.getElementById("erase").style.display = "none"
    } else {
        console.error("wireFeedbackDiv element not found");
    }
}

let currentHintIndex = 0;
let hints = [];

// Function to handle invalid connections and show hints
export function invalidConnectionFunction(hintsArray) {
    hints = hintsArray;
    currentHintIndex = 0;
    const wireFeedbackDiv = document.getElementById("wireFeedbackDiv");
    wireFeedbackDiv.style.display = "block";
    wireFeedbackDiv.innerHTML = `
            <h3>
            Great start so far!  There are just a couple changes we should make before starting the lab. First, try reviewing your circuit diagram to see if there’s a better way to connect the wires. 
            </h3>
            <h3>
            If you’d like help, click on the ‘hint’ button.
            </h3>
            <div class="newNextButtonDiv" id="hintButton">
			    <button class="next-button hint-button">
                <img src="/images/hint.svg" alt="Bulb Icon">
                Hint
                </button>
		    </div>
        `;

    document.getElementById('hintButton').addEventListener('click', showHint);
}

// Function to show hint for invalid connections
function showHint() {
    console.log("Clicked hint button");
    const hintBox = document.getElementById("hintBox");
    const wireFeedbackBox = document.getElementById('wireFeedbackDiv')
    hintBox.style.display = "block";
    wireFeedbackBox.style.display = "none"

    hintBox.innerHTML = `
    <div class="hint-container">
        <div id="hintContent">
            <h3 class="roboto-bold">Hint: ${hints[currentHintIndex]}</h3>
        </div>
    </div>

    <div class="button-container">
        <div class="hint-navigation">
            <div class="hintArrowContainer"><img src="/images/leftArrow.svg" id="prevHint" class="arrow-button" alt="Previous Hint"></div>

            <h3 class = "roboto-bold hintCounterText"><span id="hintCounter">Hint #${currentHintIndex + 1}</span></h3>
            <div class = "hintArrowContainer"><img src="/images/arrow.png" id="nextHint" class="arrow-button" alt="Next Hint"></div>

        </div>
    </div>

    <button class="next-button newNextButtonDiv iGotIt" id="closeHint">
        I Got It
    </button>

    `;

    document.getElementById('prevHint').addEventListener('click', prevHint);
    document.getElementById('nextHint').addEventListener('click', nextHint);
    document.getElementById('closeHint').addEventListener('click', closeHint);

    updateHintVisibility();
}

// Function to update hint content
function updateHintContent() {
    const hintContent = document.getElementById('hintContent');
    hintContent.innerHTML = `<h3 class="roboto-bold">Hint: ${hints[currentHintIndex]}</h3>`;
    const hintCounter = document.getElementById('hintCounter');
    hintCounter.innerText = `Hint #${currentHintIndex + 1}`;
    updateHintVisibility();
}
// Function to update hint navigation visibility
function updateHintVisibility() {
    const prevHintButton = document.getElementById('prevHint');
    const nextHintButton = document.getElementById('nextHint');
    prevHintButton.style.display = currentHintIndex === 0 ? 'none' : 'inline';
    nextHintButton.style.display = currentHintIndex === hints.length - 1 ? 'none' : 'inline';
}

// Function to show the next hint
function nextHint() {
    if (currentHintIndex < hints.length - 1) {
        currentHintIndex++;
        updateHintContent();
    }
}

// Function to show the previous hint
function prevHint() {
    if (currentHintIndex > 0) {
        currentHintIndex--;
        updateHintContent();
    }
}

// Function to close the hint box
function closeHint() {
    const hintBox = document.getElementById("hintBox");
    const wireFeedbackBox = document.getElementById("wireFeedbackDiv");
    hintBox.style.display = "none";
    wireFeedbackBox.style.display = "none"
    console.log("close hint called")
}

// Function to show the procedure steps
function procedure() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('connectWiresDiv').style.display = "none"
    document.getElementById('highlight').style.display = "none"
    document.getElementById("wireFeedbackDiv").style.display = "none";

    const procedureBox = document.getElementById('procedureBox')
    procedureBox.style.display = "block"
    procedureBox.innerHTML = `
    <h3 class = "roboto-bold" >Before the experiment, let’s learn the steps involved in this experiment. Please click on the steps icon above.</h3>
    `;

    const highlight = document.getElementById('highlight')
    highlight.style.display = "block"
    highlight.style.left = "55%"
}

// Function to show the steps involved in the experiment
function steps() {
    const steps = document.getElementById('steps')
    steps.style.display = "flex"
    steps.style.flexDirection = "column"
    // steps.style.justifyContent = "center"
    if (tutorial) {
        steps.innerHTML = `
    <h3 class="roboto-bold">
			Experiment Procedure
		</h3>
		<div class="scrollableSteps">
            <ol>
                <li>
                    <h4 class="roboto-bold">
                        Choose a very large resistance value for the high-resistance box (R) so that the current goes
                        through the galvanometer is small to start with.
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Close key k1 to close the circuit (R, G, E, k1).
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Adjust the R value to allow the maximum deflection on the galvanometer.
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Observe and record the maximum deflection on the galvanometer as θ in the observation table.
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Without altering the resistance (R), close key k2 to make the shunt resistance box (S) parallel to
                        the galvanometer (G).
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Adjust the variable resistance (S) until the galvanometer shows a deflection of exactly θ/2, half of
                        your initial recorded deflection. Record the half deflection as θ/2 in the observation table.
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Choose a new resistance (R) and repeat the experiment five times
                    </h4>
                </li>

            </ol>
		</div>

        <div class="newNextButtonDiv close-button-container stepsNext ">
            <button class="next-button close-button-steps">Next</button>
        </div>
    `
    }
    else {
        steps.innerHTML = `
    <h3 class="roboto-bold">
			Experiment Procedure
		</h3>
		<div class="scrollableSteps">
            <ol>
                <li>
                    <h4 class="roboto-bold">
                        Choose a very large resistance value for the high-resistance box (R) so that the current goes
                        through the galvanometer is small to start with.
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Close key k1 to close the circuit (R, G, E, k1).
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Adjust the R value to allow the maximum deflection on the galvanometer.
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Observe and record the maximum deflection on the galvanometer as θ in the observation table.
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Without altering the resistance (R), close key k2 to make the shunt resistance box (S) parallel to
                        the galvanometer (G).
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Adjust the variable resistance (S) until the galvanometer shows a deflection of exactly θ/2, half of
                        your initial recorded deflection. Record the half deflection as θ/2 in the observation table.
                    </h4>
                </li>
                <li>
                    <h4 class="roboto-bold">
                        Choose a new resistance (R) and repeat the experiment five times
                    </h4>
                </li>

            </ol>
		</div>

        <div class="newNextButtonDiv close-button-container closeSteps">
            <button class="next-button close-button-steps">Close</button>
        </div>
    `
    }

}


// Function to show the observation table
function obTable() {
    const obTableIntro = document.getElementById('obTableIntro')
    obTableIntro.style.display = "block"
    const highlight = document.getElementById('highlight')
    highlight.style.display = "block"
    highlight.style.left = "67%"
    document.getElementById('steps').style.display = "none"
}

// Function to take readings and show the observation table
function takeReadings() {
    const observationTable = document.getElementById('modal-overlay')
    observationTable.style.display = "flex"
    const obTableIntro = document.getElementById('obTableIntro')
    obTableIntro.style.display = "none"
    document.getElementById('steps').style.display = "none"
    document.getElementById('highlight').style.display = "none"
    document.getElementById('procedureBox').style.display = "none"
    loadTableData
    disableThreeJSInteraction();
    validateInputFields();
}

// Function to save observation table data to local storage
function saveTableData() {
    const tableData = [];
    const rows = document.querySelectorAll('#observationTableBody tr');
    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll('input');
        cells.forEach((cell, cellIndex) => {
            tableData.push({
                id: `input_${rowIndex + 1}_${cellIndex + 1}`,
                value: cell.value
            });
        });
    });
    localStorage.setItem('tableData', JSON.stringify(tableData));
    validateInputFields();
}

// Function to validate input fields in the observation table
function validateInputFields() {
    const submitButton = document.getElementById('submitObservations');
    const row1Inputs = document.querySelectorAll('tbody tr:nth-child(1) input');
    const row2Inputs = document.querySelectorAll('tbody tr:nth-child(2) input');
    let allFilled = true;

    row1Inputs.forEach(input => {
        if (input.value === '') {
            allFilled = false;
        }
    });

    row2Inputs.forEach(input => {
        if (input.value === '') {
            allFilled = false;
        }
    });

    submitButton.disabled = !allFilled;
}


// Function to load observation table data from local storage
function loadTableData() {
    const tableData = JSON.parse(localStorage.getItem('tableData'));
    if (tableData) {
        tableData.forEach(item => {
            document.getElementById(item.id).value = item.value;
        });
    }
}

// Add event listeners to save data on input change
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', saveTableData);
});

// Close the observation table modal
document.getElementById('closeButtonOB').addEventListener('click', () => {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('overlay').style.display = "none"
    if (tutorial) {
        document.getElementById('beginScreen').style.display = "block"
    }
    else {
        doLab()
    }
    enableThreeJSInteraction();
});

// Function to indicate the tutorial is done
function doneWithTutorial() {
    document.getElementById('overlay').style.display = "none"
    document.getElementById('beginScreen').style.display = "none"
    tutorial = false

}

// Function to disable Three.js interaction
export function disableThreeJSInteraction() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.addEventListener('click', stopPropagation);
    modalOverlay.addEventListener('keydown', stopPropagation);
}

// Function to enable Three.js interaction
export function enableThreeJSInteraction() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.removeEventListener('click', stopPropagation);
    modalOverlay.removeEventListener('keydown', stopPropagation);
}

// Function to stop event propagation
export function stopPropagation(event) {
    event.stopPropagation();
}
// High Resistance
let sumHRB = 0;
let deflection = 0
let R = 0

// Function to update deflection in high resistance box
function updateDeflection() {
    console.log("key1Open", key1Open)
    console.log("key2Open", key2Open)
    const checkboxes = document.querySelectorAll('.checkbox-grid-HRB input[type="checkbox"]');
    sumHRB = 0
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            sumHRB += parseInt(checkbox.value);
            console.log(sumHRB)
        }
    });


}

// Add event listeners to checkboxes in high resistance box
document.querySelectorAll('.checkbox-grid-HRB input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateDeflection);
});

// Close high resistance box modal
document.getElementById('closeButtonHRB').addEventListener('click', () => {
    document.getElementById('modal-overlay-hrb').style.display = 'none';
    enableThreeJSInteraction();
});

const modalOverlayHRB = document.getElementById('modal-overlay-hrb')
const safetyElement = document.getElementById('safety');
export var visibility = false

// Event listener for submitting high resistance box resistance
document.getElementById('submitHRBResistance').addEventListener('click', function () {
    disableThreeJSInteraction();
    updateDeflection()
    let v = 2
    let i;
    R = sumHRB + 100;
    // R = sumHRB + 60
    i = v / R;
    const k = 3.175e-5
    // const k = 6.28931e-5
    let theta;
    // k * theta = E/(R+G)
    // We are supposed to know G
    theta = (i / k).toFixed(2);

    if (key1Open) {
        document.getElementById('deflectionValue').textContent = 'Key 1 is Open';
    }
    else if (!key1Open && key2Open) {
        if (directionOfDeflection == "right") {
            if (theta > 30) {
                document.getElementById('deflectionValue').textContent = theta;
                const safety = document.getElementById("safety");
                safety.style.display = "block";
                safety.classList.add('shake-animation');
                setTimeout(function () {
                    safety.classList.remove('shake-animation');
                    safety.style.display = "none";
                }, 5000);
            }
            else if (theta < 5) {
                document.getElementById('deflectionValue').textContent = theta;
                const safety = document.getElementById("safety");
                safety.style.display = "block";
                safety.classList.add('shake-animation');
                setTimeout(function () {
                    safety.classList.remove('shake-animation');
                    safety.style.display = "none";
                }, 5000);
            }
            else {
                document.getElementById('deflectionValue').textContent = theta;

            }

            // updateNeedle(theta)
        }
        else if (directionOfDeflection == "left") {
            if (theta > 30) {
                document.getElementById('deflectionValue').textContent = -theta;
                const safety = document.getElementById("safety");
                safety.style.display = "block";
                safety.classList.add('shake-animation');
                setTimeout(function () {
                    safety.classList.remove('shake-animation');
                    safety.style.display = "none";
                }, 5000);
            }
            else if (theta < 5) {
                document.getElementById('deflectionValue').textContent = -theta;
                const safety = document.getElementById("safety");
                safety.style.display = "block";
                safety.classList.add('shake-animation');
                setTimeout(function () {
                    safety.classList.remove('shake-animation');
                    safety.style.display = "none";
                }, 5000);
            }
            else {
                document.getElementById('deflectionValue').textContent = -theta;

            }
            // updateNeedle(-theta)
        }

    }
    else if (!key1Open && !key2Open) {
        document.getElementById('deflectionValue').textContent = 'Keep key 2 Open for this';
    }

})

// Function to hide safety messages when clicking outside of them
export function hideSafetyMessages(event) {
    const safetyElement = document.getElementById("safety");
    const safetyLowElement = document.getElementById("safetyLow");
    const hRBModal = document.querySelector('.hRBModal');

    // Check if the click is outside the safety message elements and the modal content
    if (!hRBModal.contains(event.target) && safetyElement.style.display === "block") {
        safetyElement.style.display = "none";
    }

    if (!hRBModal.contains(event.target) && safetyLowElement.style.display === "block") {
        safetyLowElement.style.display = "none";
    }
}
// Shunt Resistance
let sumShunt = 0
let deflectionShunt = 0

// Function to update deflection in shunt resistance box
function updateDeflectionShunt() {
    console.log("key1Open", key1Open)
    console.log("key2Open", key2Open)
    const checkboxes = document.querySelectorAll('.checkbox-grid-LRB input[type="checkbox"]');
    sumShunt = 0
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            sumShunt += parseInt(checkbox.value);
        }
    });
}

// Add event listeners to checkboxes in shunt resistance box
document.querySelectorAll('.checkbox-grid-LRB input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateDeflectionShunt);
});

// Close shunt resistance box modal
document.getElementById('closeButtonLRB').addEventListener('click', () => {
    document.getElementById('modal-overlay-lrb').style.display = 'none';
    enableThreeJSInteraction()
});


// Event listener for submitting shunt resistance box resistance
document.getElementById('submitLRBResistance').addEventListener('click', function () {
    disableThreeJSInteraction()
    updateDeflectionShunt()
    let v = 2
    let i;

    let rDash = (R - 100) + (100 * sumShunt) / (100 + sumShunt);
    console.log("R value", R)
    console.log("R Dash is", rDash)
    console.log("Sum shunt - ", sumShunt)
    i = ((v / rDash) * sumShunt) / (100 + sumShunt);;;
    // const k = 6.28931e-5
    const k = 3.175e-5
    let theta;
    // k * theta = E/(R+G)
    // We are supposed to know G
    theta = (i / k).toFixed(2);
    if (key2Open) {
        document.getElementById('deflectionValueLRB').textContent = 'Key2 is open';
    }
    else {
        if (directionOfDeflection == "right") {
            if (theta > 30) {
                document.getElementById('deflectionValueLRB').textContent = theta;
                const safety = document.getElementById("safetyLRB");
                safety.style.display = "block";
                safety.classList.add('shake-animation');
                setTimeout(function () {
                    safety.classList.remove('shake-animation');
                    safety.style.display = "none";
                }, 5000);
            }
            else if (theta < 5) {
                document.getElementById('deflectionValueLRB').textContent = theta;
                const safety = document.getElementById("safetyLowLRB");
                safety.style.display = "block";
                safety.classList.add('shake-animation');
                setTimeout(function () {
                    safety.classList.remove('shake-animation');
                    safety.style.display = "none";
                }, 5000);
            }
            else {
                document.getElementById('deflectionValueLRB').textContent = theta;
            }
            // updateNeedle(theta)
        }
        else if (directionOfDeflection == "left") {
            if (theta > 30) {
                document.getElementById('deflectionValueLRB').textContent = -theta;
                const safety = document.getElementById("safetyLRB");
                safety.style.display = "block";
                safety.classList.add('shake-animation');
                setTimeout(function () {
                    safety.classList.remove('shake-animation');
                    safety.style.display = "none";
                }, 5000);
            }
            else if (theta < 5) {
                document.getElementById('deflectionValueLRB').textContent = -theta;
                const safety = document.getElementById("safetyLowLRB");
                safety.style.display = "block";
                safety.classList.add('shake-animation');
                setTimeout(function () {
                    safety.classList.remove('shake-animation');
                    safety.style.display = "none";
                }, 5000);
            }
            else {
                document.getElementById('deflectionValueLRB').textContent = -theta;
            }

            // updateNeedle(-theta)

        }
    }

})

// Function to calculate the rotation angle for the needle based on deflection
function calculateRotationAngle(deflection) {
    const maxDeflection = 30;
    const maxAngle = 37; // Degrees
    return -1 * (deflection / maxDeflection) * maxAngle * (Math.PI / 180);; // Convert degrees to radians
}

// Function to update the needle deflection
export function updateNeedle(deflection) {
    console.log("Inside Update deflection")
    if (needlePivot) {  // Ensure the needle object is loaded
        console.log("Inside Needle if")
        const rotationAngle = calculateRotationAngle(deflection);
        needlePivot.rotation.z = rotationAngle; // Assuming the needle rotates around the Z axis
        console.log(`Needle rotation updated to: ${rotationAngle} radians`);
    }
}


// Event listener for submitting observations
document.getElementById('submitObservations').addEventListener('click', function () {
    console.log("hit submit observations")

    const congratsScreen = document.getElementById('congratsScreen')
    congratsScreen.style.display = "block"
    document.getElementById('modal-overlay').style.display = "none"
    document.getElementById('overlay').style.display = "block"

})

// Event listener for the next button on the congratulations screen
document.getElementById('congratsNext').addEventListener('click', function () {
    const congratsScreen = document.getElementById('congratsScreen')
    congratsScreen.style.display = "None"
    const redirect = document.getElementById('redirect')
    redirect.style.display = "block"
    document.getElementById('overlay').style.display = "block"
})

