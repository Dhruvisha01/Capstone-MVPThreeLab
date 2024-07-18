import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
// import { floor } from 'three/examples/jsm/nodes/Nodes.js';
import { correctConnections } from './instruction.js';
import { invalidConnectionFunction } from './instruction.js';
import { enableThreeJSInteraction } from './instruction.js';
import { disableThreeJSInteraction } from './instruction.js';

let needle;
let needlePivot;

export { needle }

// Scene, camera, and renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);
const axesHelper = new THREE.AxesHelper(5);
// red blue green
// x, y, z
// axesHelper.setColors(0xff0000, 0x0000ff, 0x00ff00)
// scene.add(axesHelper);
// Table 
let floorTexture = new THREE.TextureLoader().load('images/Table2.jpg');
floorTexture.wrapS = THREE.RepeatWrapping;// wrapS is horizontal direction
floorTexture.wrapT = THREE.RepeatWrapping; //wrapT is vertical direction
floorTexture.repeat.set(5, 5); //how many times to repeat the texture
let planeGeometry = new THREE.PlaneGeometry(50, 50); //width and height

let planeMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    side: THREE.DoubleSide, //Render both sides of the plane
});

let floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = Math.PI / 2; //This is 90 degrees

floorPlane.position.y = -Math.PI; //This is 180 degrees

scene.add(floorPlane);

// Terminals 
function placeTerminalButton(position, parentGroup, name) {
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.0,
        depthWrite: true
    });
    const button = new THREE.Mesh(geometry, material);
    button.name = name;
    button.position.copy(position);
    parentGroup.add(button);
    console.log("Added button:", name, button.position);
    return button;
}

function createPlusButton() {
    const buttonGeometry = new THREE.PlaneGeometry(0.1, 0.1);
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
    return new THREE.Mesh(buttonGeometry, buttonMaterial);
}

function createLargerTransparentArea(button, size) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
    const largerArea = new THREE.Mesh(geometry, material);
    largerArea.position.copy(button.position);
    return largerArea;
}

function createCircle(position) {
    const geometry = new THREE.CircleGeometry(0.1, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.copy(position);
    circle.position.z += 0.1;  // Slightly offset to avoid z-fighting
    return circle;
}

// GLTF Models
const objects = [];  // Array to hold draggable objects

// GLTFLoader
const loader = new GLTFLoader();
const groupGalv = new THREE.Group();
const groupHRB = new THREE.Group();
const groupBattery = new THREE.Group();
const groupLRB = new THREE.Group();
const groupk1 = new THREE.Group();
const groupk2 = new THREE.Group();
groupHRB.userData.customName = "HRBGroup";
groupLRB.userData.customName = "LRBGroup";
groupk2.userData.customName = "Key2Group"
groupk1.userData.customName = "key1Group"
let highRB, lowRB
let gbutton1, gbutton2, gbutton1Area, gbutton2Area, hbutton1, hbutton2, hbutton1Area, hbutton2Area, bbutton1, bbutton2, bbutton1Area, bbutton2Area, lRBbutton1, lRBbutton2, lRBbutton1Area, lRBbutton2Area, k1button1, k1button2, k1button1Area, k1button2Area, k2button1, k2button2, k2button1Area, k2button2Area;
// Load the GLTF file
loader.load(
    '/galvanometer/clean-G.gltf',
    function (gltf) {
        const galvanometer = gltf.scene;

        // Apply necessary transformations to the model
        galvanometer.position.set(-4, 0, -9.5); // Ensure the model is centered
        galvanometer.scale.set(0.5, 0.5, 0.5); // Adjust the scale if necessary

        // Ensure all transformations are applied
        galvanometer.updateMatrixWorld(true);
        groupGalv.add(galvanometer)
        scene.add(groupGalv);

        // Calculate the bounding box of the model
        const boundingBox = new THREE.Box3().setFromObject(galvanometer);
        const boxHelper = new THREE.BoxHelper(galvanometer, 0xff0000); // Red color for the box
        // scene.add(boxHelper);

        // Get the dimensions of the bounding box
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        // Calculate the end positions
        // const end1Position = new THREE.Vector3(center.x - size.x / 2, center.y, center.z + 0.5);
        // const end2Position = new THREE.Vector3(center.x + size.x / 2, center.y, center.z + 0.5);
        objects.push(groupGalv);

        // // Place terminal buttons at the calculated positions
        // galvanometerButton1 = placeTerminalButton(end1Position, groupGalv, 'galvanometerButton1');
        // galvanometerButton2 = placeTerminalButton(end2Position, groupGalv, 'galvanometerButton2');

        gbutton1 = createPlusButton();
        gbutton2 = createPlusButton();
        gbutton1.position.set(center.x - size.x / 2, center.y, center.z + 0.5);
        gbutton2.position.set(center.x + size.x / 2, center.y, center.z + 0.5);
        groupGalv.add(gbutton1);
        groupGalv.add(gbutton2);
        gbutton1.name = "gbutton1";
        gbutton2.name = "gbutton2";

        gbutton1Area = createLargerTransparentArea(gbutton1, 0.5);
        gbutton2Area = createLargerTransparentArea(gbutton2, 0.5);
        groupGalv.add(gbutton1Area);
        groupGalv.add(gbutton2Area);


        gbutton1Area.name = "gbutton1Area"
        gbutton2Area.name = "gbutton2Area"

        loader.load(
            '/galvanometer/UpdatedNeedle.gltf', // Replace with the actual path to your needle model
            function (needleGltf) {
                needle = needleGltf.scene;
                // const needleBoundingBox = new THREE.Box3().setFromObject(needle);
                // const needleSize = needleBoundingBox.getSize(new THREE.Vector3());
                // const needleCenter = needleBoundingBox.getCenter(new THREE.Vector3());

                // Create a pivot object for the needle
                needlePivot = new THREE.Object3D();
                // const boxHelper = new THREE.BoxHelper(needlePivot, 0x00ff00); // Green color for the box
                // scene.add(boxHelper);

                // Position the pivot where the base of the needle should be
                needlePivot.position.set(0, 0, 0); // Adjust as necessary
                needlePivot.rotation.set(0, 0, 0);

                // Adjust needle position to make the base of the needle at the pivot point
                // needle.position.set(-needleCenter.x + 8, -needleCenter.y + 1.5, -needleCenter.z + 24.5);
                // needle.position.set(-needleCenter.x, -needleCenter.y, -needleCenter.z);
                // needle.position.y += needleSize.y / 2;

                // Add the needle to the pivot
                needlePivot.add(needle);

                // Add the pivot to the galvanometer
                galvanometer.add(needlePivot);

                // Apply rotation to the pivot, for example, 10 degrees (converted to radians)
                // needlePivot.rotation.x = THREE.MathUtils.degToRad(10);

                console.log("Needle added as a child to needlePivot");

            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.error('An error happened while loading the needle', error);
            }
        );
        checkAllModelsLoaded()
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

export { needlePivot };


// High RB
loader.load(
    '/resistance_box/High-RB.gltf',
    function (gltf) {
        highRB = gltf.scene;
        highRB.name = "highRB"
        // Center the model
        highRB.position.set(-12, -3, -4);
        highRB.rotation.set(0, Math.PI / 2, 0);

        // Increase the scale to make the model bigger
        const scaleFactor = 1;
        highRB.scale.set(1 * scaleFactor, 1 * scaleFactor, 1 * scaleFactor);

        // Ensure the model is added to the scene after scaling
        groupHRB.add(highRB)
        scene.add(groupHRB);
        objects.push(groupHRB)
        // groupHRB.name = "HRB"
        // Log the model's bounding box and other properties after scaling
        const box = new THREE.Box3().setFromObject(highRB);
        const size = new THREE.Vector3();
        const boxHelper = new THREE.BoxHelper(highRB, 0xff0000); // Red color for the box
        // scene.add(boxHelper);
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // const end1Position = new THREE.Vector3(center.x - size.x / 2 + 0.6, center.y + 0.9, center.z + 1.8);
        // const end2Position = new THREE.Vector3(center.x + size.x / 2 - 0.6, center.y + 0.9, center.z + 1.8);
        // highRBbutton1 = placeTerminalButton(end1Position, groupHRB, 'highRBbutton1');
        // highRBbutton2 = placeTerminalButton(end2Position, groupHRB, 'highRBbutton2');
        hbutton1 = createPlusButton();
        hbutton2 = createPlusButton();
        hbutton1.position.set(center.x - size.x / 2 + 0.6, center.y + 0.9, center.z + 1.8);
        hbutton2.position.set(center.x + size.x / 2 - 0.6, center.y + 0.9, center.z + 1.8);
        groupHRB.add(hbutton1);
        groupHRB.add(hbutton2);
        groupHRB.name = "HRB"
        hbutton1.name = "hbutton1";
        hbutton2.name = "hbutton2";

        hbutton1Area = createLargerTransparentArea(hbutton1, 0.5);
        hbutton2Area = createLargerTransparentArea(hbutton2, 0.5);
        groupHRB.add(hbutton1Area);
        groupHRB.add(hbutton2Area);


        hbutton1Area.name = "hbutton1Area"
        hbutton2Area.name = "hbutton2Area"

        checkAllModelsLoaded()
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

// Battery
loader.load(
    '/battery/scene.gltf',
    function (gltf) {
        const battery = gltf.scene;
        // Center the model
        battery.position.set(-2, 0, 3);
        battery.rotation.set(0, Math.PI / 2, 0);

        battery.scale.set(6, 6, 6)

        groupBattery.add(battery)
        scene.add(groupBattery);
        objects.push(groupBattery)

        // Log the model's bounding box and other properties
        const box = new THREE.Box3().setFromObject(battery);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const maxAxis = Math.max(size.x, size.y, size.z);
        battery.scale.multiplyScalar(1 / maxAxis);

        const boxHelper = new THREE.BoxHelper(battery, 0xff0000); // Red color for the box
        // scene.add(boxHelper);

        const end1Position = new THREE.Vector3(center.x - size.x / 2 + 0.2, center.y + 0.3, center.z + 0.2);
        const end2Position = new THREE.Vector3(center.x + size.x / 2 - 1, center.y + 0.3, center.z - 0.2);
        // batterybutton1 = placeTerminalButton(end1Position, groupBattery, 'batterybutton1');
        // batterybutton2 = placeTerminalButton(end2Position, groupBattery, 'batterybutton2');
        bbutton1 = createPlusButton();
        bbutton2 = createPlusButton();
        bbutton1.position.set(center.x - size.x / 2 + 0.4, center.y + 0.2, center.z + 0.4);
        bbutton2.position.set(center.x + size.x / 2 - 0.4, center.y + 0.2, center.z + 0.4);
        groupBattery.add(bbutton1);
        groupBattery.add(bbutton2);

        bbutton1.name = "bbutton1";
        bbutton2.name = "bbutton2";

        bbutton1Area = createLargerTransparentArea(bbutton1, 0.2);
        bbutton2Area = createLargerTransparentArea(bbutton2, 0.2);
        groupBattery.add(bbutton1Area);
        groupBattery.add(bbutton2Area);


        bbutton1Area.name = "bbutton1Area"
        bbutton2Area.name = "bbutton2Area"

        checkAllModelsLoaded()
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

// Low RB
loader.load(
    '/resistance_box/Shunt-RB.gltf',
    function (gltf) {
        lowRB = gltf.scene;

        // Center the model
        lowRB.position.set(-8, -3, -8);
        lowRB.rotation.set(0, Math.PI / 2, 0);

        // Increase the scale to make the model bigger
        const scaleFactor = 1;
        lowRB.scale.set(1 * scaleFactor, 1 * scaleFactor, 1 * scaleFactor);

        // Ensure the model is added to the scene after scaling
        groupLRB.add(lowRB)
        scene.add(groupLRB);
        objects.push(groupLRB)

        // Log the model's bounding box and other properties after scaling
        const box = new THREE.Box3().setFromObject(lowRB);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const boxHelper = new THREE.BoxHelper(lowRB, 0xff0000); // Red color for the box
        // scene.add(boxHelper);

        const end1Position = new THREE.Vector3(center.x - size.x / 2 + 0.6, center.y + 0.9, center.z + 1.8);
        const end2Position = new THREE.Vector3(center.x + size.x / 2 - 0.6, center.y + 0.9, center.z + 1.8);
        // lowRBbutton1 = placeTerminalButton(end1Position, groupLRB, 'lowRBbutton1');
        // lowRBbutton2 = placeTerminalButton(end2Position, groupLRB, 'lowRBbutton2');
        lRBbutton1 = createPlusButton();
        lRBbutton2 = createPlusButton();
        lRBbutton1.position.set(center.x - size.x / 2 + 0.6, center.y + 0.9, center.z + 1.8);
        lRBbutton2.position.set(center.x + size.x / 2 - 0.6, center.y + 0.9, center.z + 1.8);
        groupLRB.add(lRBbutton1);
        groupLRB.add(lRBbutton2);

        lRBbutton1.name = "lRBbutton1";
        lRBbutton2.name = "lRBbutton2";

        lRBbutton1Area = createLargerTransparentArea(lRBbutton1, 0.5);
        lRBbutton2Area = createLargerTransparentArea(lRBbutton2, 0.5);
        groupLRB.add(lRBbutton1Area);
        groupLRB.add(lRBbutton2Area);


        lRBbutton1Area.name = "lRBbutton1Area"
        lRBbutton2Area.name = "lRBbutton2Area"

        checkAllModelsLoaded()
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

// Switch
loader.load(
    '/switch/Key-no-top.gltf',
    function (gltf) {
        const key1 = gltf.scene;

        // Center the model
        key1.position.set(9, -3, 1);
        key1.rotation.set(0, 0, 0);

        // Increase the scale to make the model bigger
        const scaleFactor = 1.5;
        key1.scale.set(1 * scaleFactor, 1 * scaleFactor, 1 * scaleFactor);

        // Ensure the model is added to the scene after scaling
        groupk1.add(key1)
        scene.add(groupk1);
        objects.push(groupk1)

        // Log the model's bounding box and other properties after scaling
        const box = new THREE.Box3().setFromObject(key1);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const size1 = box.getSize(new THREE.Vector3());
        const center1 = box.getCenter(new THREE.Vector3());

        const boxHelper = new THREE.BoxHelper(key1, 0xff0000); // Red color for the box
        // scene.add(boxHelper);

        const end1Position = new THREE.Vector3(center.x - size.x / 2 + 0.3, center.y - 0.1, center.z + 0.1);
        const end2Position = new THREE.Vector3(center.x + size.x / 2 - 0.1, center.y - 0.1, center.z + 0.1);
        // key1button1 = placeTerminalButton(end1Position, groupk1, 'key1button1');
        // key1button2 = placeTerminalButton(end2Position, groupk1, 'key1button2');
        k1button1 = createPlusButton();
        k1button2 = createPlusButton();
        k1button1.position.set(center.x - size.x / 2 + 0.5, center.y + 0.7, center.z + 0.3);
        k1button2.position.set(center.x + size.x / 2 - 1, center.y + 0.7, center.z + 0.3);
        groupk1.add(k1button1);
        groupk1.add(k1button2);

        k1button1.name = "k1button1";
        k1button2.name = "k1button2";

        k1button1Area = createLargerTransparentArea(k1button1, 0.5);
        k1button2Area = createLargerTransparentArea(k1button2, 0.5);
        groupk1.add(k1button1Area);
        groupk1.add(k1button2Area);


        k1button1Area.name = "k1button1Area"
        k1button2Area.name = "k1button2Area"
        checkAllModelsLoaded()
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

loader.load(
    '/switch/Key-only-top.gltf',
    function (gltf) {
        const key1 = gltf.scene;
        key1.userData.customName = "key1Model"
        // Center the model
        key1.position.set(9, -2.5, 1);
        key1.rotation.set(0, 0, 0);

        // Increase the scale to make the model bigger
        const scaleFactor = 1.5;
        key1.scale.set(1 * scaleFactor, 1 * scaleFactor, 1 * scaleFactor);

        // Ensure the model is added to the scene after scaling
        groupk1.add(key1)
        scene.add(groupk1);
        objects.push(groupk1)

        // Log the model's bounding box and other properties after scaling
        const box = new THREE.Box3().setFromObject(key1);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const size1 = box.getSize(new THREE.Vector3());
        const center1 = box.getCenter(new THREE.Vector3());

        const boxHelper = new THREE.BoxHelper(key1, 0xff0000); // Red color for the box
        // scene.add(boxHelper);
    }
)
// Switch
loader.load(
    '/switch/Key-no-top.gltf',
    function (gltf) {
        const key2 = gltf.scene;

        // Center the model
        key2.position.set(9.5, -3, -3);
        key2.rotation.set(0, 0, 0);

        // Increase the scale to make the model bigger
        const scaleFactor = 1.5;
        key2.scale.set(1 * scaleFactor, 1 * scaleFactor, 1 * scaleFactor);

        // Ensure the model is added to the scene after scaling
        groupk2.add(key2)
        scene.add(groupk2);
        objects.push(groupk2)

        // Log the model's bounding box and other properties after scaling
        const box = new THREE.Box3().setFromObject(key2);
        const size = new THREE.Vector3();
        box.getSize(size);

        const size1 = box.getSize(new THREE.Vector3());
        const center1 = box.getCenter(new THREE.Vector3());

        const center = new THREE.Vector3();
        box.getCenter(center);
        const boxHelper = new THREE.BoxHelper(key2, 0xff0000); // Red color for the box
        // scene.add(boxHelper);

        const end1Position = new THREE.Vector3(center.x - size.x / 2 + 0.3, center.y - 0.1, center.z + 0.1);
        const end2Position = new THREE.Vector3(center.x + size.x / 2 - 0.1, center.y - 0.1, center.z + 0.1);
        // key2button1 = placeTerminalButton(end1Position, groupk2, 'key2button1');
        // key2button2 = placeTerminalButton(end2Position, groupk2, 'key2button2');
        k2button1 = createPlusButton();
        k2button2 = createPlusButton();
        k2button1.position.set(center.x - size.x / 2 + 0.8, center.y + 0.5, center.z);
        k2button2.position.set(center.x + size.x / 2 - 0.75, center.y + 0.5, center.z);
        groupk2.add(k2button1);
        groupk2.add(k2button2);

        k2button1.name = "k2button1";
        k2button2.name = "k2button2";

        k2button1Area = createLargerTransparentArea(k2button1, 0.5);
        k2button2Area = createLargerTransparentArea(k2button2, 0.5);
        groupk2.add(k2button1Area);
        groupk2.add(k2button2Area);

        k2button1Area.name = "k2button1Area"
        k2button2Area.name = "k2button2Area"

        checkAllModelsLoaded()
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);
groupk2.userData.customName = "key2Group";
loader.load(
    '/switch/Key-only-top.gltf',
    function (gltf) {
        const key2 = gltf.scene;
        key2.userData.customName = "key2Model"
        // Center the model
        key2.position.set(9.5, -2.5, -3);
        key2.rotation.set(0, 0, 0);

        // Increase the scale to make the model bigger
        const scaleFactor = 1.5;
        key2.scale.set(1 * scaleFactor, 1 * scaleFactor, 1 * scaleFactor);

        // Ensure the model is added to the scene after scaling
        groupk2.add(key2)
        scene.add(groupk2);
        objects.push(groupk2)

        // Log the model's bounding box and other properties after scaling
        const box = new THREE.Box3().setFromObject(key2);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const size1 = box.getSize(new THREE.Vector3());
        const center1 = box.getCenter(new THREE.Vector3());

        const boxHelper = new THREE.BoxHelper(key2, 0xff0000); // Red color for the box
        // scene.add(boxHelper);
    }
)

function checkAllModelsLoaded() {
    if (objects.length === 6) {
        initializeDragControls();
    }
}

let dragControls = null;

function initializeDragControls() {
    dragControls = new DragControls(objects, camera, renderer.domElement);
    dragControls.transformGroup = true;
    dragControls.enabled = !isLocked;

    let initialY = null;

    dragControls.addEventListener('dragstart', function (event) {

        initialY = event.object.position.y;  // Store the initial Y position

        event.object.traverse((child) => {
            if (child.isMesh) {
                // child.material.opacity = 0.5;  // Optional: Change appearance while dragging
                // child.material.transparent = true;
            }
        });
    });

    dragControls.addEventListener('drag', function (event) {

        const object = event.object;
        object.position.y = initialY;  // Keep the Y coordinate constant
    });

    dragControls.addEventListener('dragend', function (event) {

        event.object.traverse((child) => {
            if (child.isMesh) {
                // Check if the child is a larger transparent area
                if (child.material.opacity === 0) {
                    child.material.transparent = true;
                } else {
                    child.material.opacity = 1;  // Optional: Revert appearance after dragging
                    child.material.transparent = false;
                }
            }
        });;
    });
}
// Lock and Unlock Button
const lockButton = document.getElementById('lockButton');
let isLocked = false;
const eraseButton = document.getElementById('erase')
const connectWiresDiv = document.getElementById('connectWiresDiv')
const submitConnectionsButton = document.getElementById('submitConnections')
const overlay = document.getElementById("overlay")
lockButton.addEventListener('click', () => {
    isLocked = true
    // isLocked = !isLocked;
    // lockButton.textContent = isLocked ? 'Unlock' : 'Lock';
    eraseButton.style.display = "block"
    lockButton.style.display = "None"
    connectWiresDiv.style.display = "block"
    submitConnectionsButton.style.display = "block"
    overlay.style.display = "block"


    if (dragControls) {
        dragControls.enabled = !isLocked;
        console.log('DragControls enabled:', dragControls.enabled);
    }
});

// Wire connections - 
let isDrawing = false;
let justFinishedDrawing = false;
let startTouchpoint = null;
let currentLine = null;

var node1 = null
var node2 = null
var connection = {}
let connections = []
let drawnLines = []

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function getIntersects(event, objects) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(objects);
}

function getMousePosition(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(scene, true);
    return intersects.length > 0 ? intersects[0].point : null;
}

// Drawing the line
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('images/cablePic3.jpg'); // Replace with the actual path to your texture

function createLine(startPoint, endPoint) {
    const material = new THREE.MeshBasicMaterial({ color: 0x7f7f7f });

    const direction = new THREE.Vector3().subVectors(endPoint, startPoint);
    const length = direction.length();

    // Create cylinder geometry
    const cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, length, 32, 1, false);
    const cylinder = new THREE.Mesh(cylinderGeometry, material);

    // Set orientation
    const orientation = new THREE.Matrix4();
    orientation.lookAt(startPoint, endPoint, new THREE.Object3D().up);
    orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    cylinder.applyMatrix4(orientation);

    // Set position
    const midPoint = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
    cylinder.position.copy(midPoint);

    return cylinder;
}

function updateLine(line, startPoint, endPoint) {
    const direction = new THREE.Vector3().subVectors(endPoint, startPoint);
    const length = direction.length();

    // Dispose of old geometry
    line.geometry.dispose();
    line.geometry = new THREE.CylinderGeometry(0.05, 0.05, length, 32, 1, false);

    // Set orientation
    const orientation = new THREE.Matrix4();
    orientation.lookAt(startPoint, endPoint, new THREE.Object3D().up);
    orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    line.setRotationFromMatrix(orientation);

    // Set position
    const midPoint = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
    line.position.copy(midPoint);
}

let startCircle = null;
let endCircle = null;


// Deleting the lines drawn 
var eraser = false
eraseButton.addEventListener('click', () => {
    eraser = !eraser
    if (eraser) {
        eraseButton.style.color = "Black"
        eraseButton.style.backgroundColor = "White"
    }
    else {
        eraseButton.style.color = "White"
        eraseButton.style.backgroundColor = "transparent"
    }


})
function removeDuplicatesAndCleanScene(drawnLines, scene) {
    // Use a Set to keep track of unique elements
    const uniqueLines = new Set();
    const duplicates = [];

    // Iterate through the drawnLines array
    drawnLines.forEach(line => {
        // If the line is already in the Set, it's a duplicate
        if (uniqueLines.has(line)) {
            duplicates.push(line);
        } else {
            uniqueLines.add(line);
        }
    });

    // Remove duplicates from the drawnLines array
    drawnLines = Array.from(uniqueLines);

    // Remove duplicate elements from the scene
    duplicates.forEach(line => {
        scene.remove(line);
    });

    return drawnLines;
}
window.addEventListener('click', onMouseClick, false);
let readings = false
export let key2Open = true
export let key1Open = true
let noDraw = false

function createCircleDiv(position) {
    const vector = position.clone();
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    return circle;
}

let direction = null

function onMouseClick(event) {
    if (dragControls && dragControls.enabled) {
        return;
    }

    const intersects = getIntersects(event, [gbutton1Area, gbutton2Area, hbutton1Area, hbutton2Area, bbutton1Area, bbutton2Area, lRBbutton1Area, lRBbutton2Area, k1button1Area, k1button2Area, k2button1Area, k2button2Area]); // List of interactive objects
    if (intersects.length > 0) {
        if (!eraser && !noDraw) {
            if (!isDrawing) {
                // First click
                isDrawing = true;
                startTouchpoint = intersects[0].point;
                node1 = intersects[0].object.name;
                console.log("First terminal:", node1);

                startCircle = createCircleDiv(startTouchpoint);
                document.getElementById('circleContainer').appendChild(startCircle);
            } else {
                // Second click
                isDrawing = false;
                const endTouchpoint = intersects[0].point;
                node2 = intersects[0].object.name;
                console.log("Second terminal:", node2);

                // Create the line
                currentLine = createLine(startTouchpoint, endTouchpoint);
                scene.add(currentLine);
                drawnLines.push(currentLine);
                console.log("Here's my lines so far", drawnLines);

                const newConnection = {
                    id: currentLine,
                    node1: node1,
                    node2: node2
                };
                connections.push(newConnection);
                console.log("Connections so far:", connections);

                if (startCircle) startCircle.remove();
                if (endCircle) endCircle.remove();
                startCircle = null;
                endCircle = null;


            }
        }
    }
    else if (eraser) {
        const objectsToIntersect = [gbutton1Area, gbutton2Area, hbutton1Area, hbutton2Area, bbutton1Area, bbutton2Area, lRBbutton1Area, lRBbutton2Area, k1button1Area, k1button2Area, k2button1Area, k2button2Area];
        console.log("Current drawn lines:", drawnLines);
        drawnLines = removeDuplicatesAndCleanScene(drawnLines, scene);
        console.log("No duplicates ", drawnLines)
        drawnLines.forEach(line => objectsToIntersect.push(line));
        console.log("new objects", objectsToIntersect)

        scene.updateMatrixWorld();
        camera.updateMatrixWorld();

        const intersects = raycaster.intersectObjects(objectsToIntersect, true);
        console.log("Intersections found:", intersects);

        if (intersects.length > 0) {
            console.log("I clicked something in erase mode")
            const intersectedObject = intersects[0].object;
            console.log("Intersections found here:", intersectedObject);
            if (drawnLines.includes(intersectedObject)) {
                // If the user clicked on a drawn line, remove it from the scene
                console.log("Clicked on the line. Removing...");
                scene.remove(intersectedObject);
                const index = drawnLines.indexOf(intersectedObject);
                console.log("Index of line clicked", index)
                if (index > -1) {
                    let uuid = drawnLines[index].uuid
                    console.log("UUID of the line being removed:", uuid);
                    console.log(typeof (uuid))
                    drawnLines.splice(index, 1);
                    // console.log("Elements array BEFORE - ", elements)
                    for (let i = 0; i < connections.length; i++) {
                        console.log(connections[i].id.uuid)
                        if (connections[i].id.uuid === uuid) {
                            const node1 = connections[i].node1
                            const node2 = connections[i].node2
                            console.log("Match found. Removing connection:", connections[i]);
                            connections.splice(i, 1)
                        }
                    }
                }
                console.log("Line removed.");
                console.log("Drawn Lines after deletions", drawnLines)
                console.log(connections)
            }

        }

    }

    if (readings) {
        noDraw = true
        const intersects = raycaster.intersectObjects([groupHRB, groupLRB, groupk2, groupk1], true);
        console.log("Hello", intersects)
        if (intersects.length > 0) {
            let object = intersects[0].object;
            while (object) {
                console.log("hellooooo", object.userData.customName)
                if (object.userData.customName === 'HRBGroup') {
                    console.log('Clicked on the high resistance box');
                    document.getElementById("modal-overlay-hrb").style.display = "block"
                    disableThreeJSInteraction()
                    return;
                } else if (object.userData.customName === 'LRBGroup') {
                    console.log('Clicked on the low resistance box');
                    document.getElementById("modal-overlay-lrb").style.display = "block"
                    disableThreeJSInteraction
                    return;
                }
                else if (object.userData.customName === 'key2Model') {
                    if (key2Open) {
                        object.position.y -= 0.5;
                        console.log('Clicked on the key2 model, Y position decreasedby 1');
                        const modalOverlayKey = document.getElementById('modal-overlay-key');
                        modalOverlayKey.style.display = "block"
                        modalOverlayKey.innerHTML = `
                        <div class="keyStatus">
                        <h3>Key 2 is Closed</h3>
			            <button class="continueButtonKey" id="keyStatusContinue">Continue</button>
		                </div>
                        `
                        key2Open = false
                        return;

                    }
                    else {
                        object.position.y += 0.5;
                        console.log('Clicked on the key2 model, Y position decreasedby 1');
                        key2Open = true
                        const modalOverlayKey = document.getElementById('modal-overlay-key');
                        modalOverlayKey.style.display = "block"
                        modalOverlayKey.innerHTML = `
                        <div class="keyStatus">
                        <h3>Key 2 is Open</h3>
			            <button class="continueButtonKey" id="keyStatusContinue">Continue</button>
		                </div>
                        `
                        return;
                    }

                }
                else if (object.userData.customName === 'key1Model') {
                    if (key1Open) {
                        object.position.y -= 0.5;
                        console.log('Clicked on the key1 model, Y position decreasedby 1');
                        const modalOverlayKey = document.getElementById('modal-overlay-key');
                        modalOverlayKey.style.display = "block"
                        modalOverlayKey.innerHTML = `
                        <div class="keyStatus">
                        <h3>Key 1 is Closed</h3>
			            <button class="continueButtonKey" id="keyStatusContinue">Continue</button>
		                </div>
                        `
                        key1Open = false
                        return;

                    }
                    else {
                        object.position.y += 0.5;
                        console.log('Clicked on the key1 model, Y position decreasedby 1');
                        const modalOverlayKey = document.getElementById('modal-overlay-key');
                        modalOverlayKey.style.display = "block"
                        modalOverlayKey.innerHTML = `
                        <div class="keyStatus">
                        <h3>Key 1 is Open</h3>
			            <button class="continueButtonKey" id="keyStatusContinue">Continue</button>
		                </div>
                        
                        `
                        key1Open = true
                        return;
                    }
                }
                object = object.parent;
            }
        }
    }

}

// Wire feedback

let elementNames = {
    'g': 'galvanometer',
    'b': 'battery',
    'h': 'high resistance box',
    'lRB': 'shunt resistance box',
    'k1': 'key 1',
    'k2': 'key 2',
}

let purpose = {
    'g': 'measure the current in the circuit',
    'b': 'supply power to the circuit',
    'h': 'limit the current flowing through the circuit',
    'lRB': 'divert current away from the galvanometer',
    'k1': 'switch the current on and off',
    'k2': 'switch the current on and off to the shunt resistance box',
}

// Loop 1 
let loop1 = ['b', 'h', 'k1']
let loop2 = ['lRB', 'k2']


function removeDuplicates(connections) {
    const uniqueConnections = new Set();
    const filteredConnections = [];

    connections.forEach(connection => {
        // Create a sorted string representation of the connection
        const connectionKey = [connection.node1, connection.node2].sort().join('-');

        // Check if the connection is unique
        if (!uniqueConnections.has(connectionKey) && connection.node1 != connection.node2) {
            uniqueConnections.add(connectionKey);
            filteredConnections.push(connection);
        }
    });

    return filteredConnections;
}

function getDirection(elements) {
    var connected = elements['b'].button1[0]
    console.log("First connected - ", connected)
    var elementName = connected.slice(0, -7)
    console.log("First element name - ", elementName)
    if (connected.slice(-1) == 1) {
        var elementButton = "button2"
    }
    else {
        var elementButton = "button1"
    }
    console.log("First element button - ", elementButton)
    while (elementName != 'g') {
        console.log('in while loop', elementName)
        connected = elements[elementName][elementButton][0]
        elementName = connected.slice(0, -7)
        if (connected.slice(-1) == 1) {
            var elementButton = "button2"
        }
        else {
            var elementButton = "button1"
        }
    }

    if (connected == "gbutton1") {
        var direction = "left"
    }
    else if (connected == "gbutton2") {
        var direction = "right"
    }

    return direction
}

function addElements(connections) {
    var elements = {
        'g': {
            button1: [],
            button2: [],
        },
        'h': {
            button1: [],
            button2: [],
        },
        'b': {
            button1: [],
            button2: [],
        },
        'k1': {
            button1: [],
            button2: [],
        },
        'k2': {
            button1: [],
            button2: [],
        },
        'lRB': {
            button1: [],
            button2: [],
        },
    }
    connections.forEach(connection => {
        const node1 = connection.node1
        const node2 = connection.node2
        const rubbish = node1.slice(0, -4)
        const rubbish2 = node2.slice(0, -4)

        let startElement = node1.slice(0, -11)
        let endElement = node2.slice(0, -11)
        let startButTemp = node1.slice(-11);
        let endButTemp = node2.slice(-11)
        let startBut = startButTemp.slice(0, -4)
        let endBut = endButTemp.slice(0, -4)

        console.log(startElement, endElement, startBut, endBut, rubbish, rubbish2)
        elements[startElement][startBut].push(node2.slice(0, -4));
        elements[endElement][endBut].push(node1.slice(0, -4))
    })
    return elements
}
const submitConnections = document.getElementById("submitConnections")

submitConnections.addEventListener('click', () => {
    console.log("After submitting initial connections are -, ", connections)
    connections = removeDuplicates(connections)
    console.log("Cleanup done, ", connections)
    const elements = addElements(connections)
    console.log("Elements Array", elements)

    const hints = []
    // If loop 1 to loop 2 connections exist
    let incorrectConnections = []
    for (let i = 0; i < connections.length; i++) {
        let validConnection = true;
        let current = connections[i];
        let element1 = connections[i].node1.slice(0, -10);
        let element2 = connections[i].node2.slice(0, -10);
        console.log(element1)
        console.log(element2)
        if (element1 == element2) {
            validConnection = false
        }
        if (loop1.includes(element1) && loop2.includes(element2)) {
            validConnection = false
        }
        else if (loop2.includes(element1) && loop1.includes(element2)) {
            validConnection = false
        }
        if (validConnection == false) {
            incorrectConnections.push(connections[i])
        }

    }
    console.log("Issues is connections - ", incorrectConnections)

    // Code for missing connections and too many connections
    let missingElements = []
    let tooManyElements = []
    for (let key in elements) {
        let element = elements[key]
        let validElement = true
        let missing = false
        let tooMany = false

        if (element.button1.length === 0 || element.button2.length === 0) {
            validElement = false
            missing = true
            // bothSide = true
        }
        if (key === 'g') {
            if (element.button1.length > 2 || element.button2.length > 2) {
                validElement = false
                tooMany = true
            }
        }
        else {
            if (element.button1.length > 1 || element.button2.length > 1) {
                validElement = false
                tooMany = true
            }
        }
        if (!validElement && missing) {
            missingElements.push(key);
        }
        else if (!validElement && tooMany) {
            tooManyElements.push(key)
        }
    }
    console.log("missing Elements are - ", missingElements)
    console.log("Too many elements", tooManyElements)

    // Disjointed Circuit -

    let validCircuit = true
    let nextElement = elements['b']
    let exploreNode = 1
    let connectedElementNode = ""
    let remainingElements = ['h', 'g', 'k1']


    if (missingElements.length == 0 && tooManyElements.length == 0) {
        while (remainingElements.length != 0) {
            console.log("remaining elements", remainingElements)
            if (exploreNode == 1) {
                connectedElementNode = nextElement.button1[0]
                if (loop2.includes(connectedElementNode.slice(0, -7))) {
                    connectedElementNode = nextElement.button1[1]
                }
            }
            else {
                connectedElementNode = nextElement.button2[0]
                if (loop2.includes(connectedElementNode.slice(0, -7))) {
                    connectedElementNode = nextElement.button2[1]
                }
            }

            let connectedElement = connectedElementNode.slice(0, -7)
            let indexRemove = remainingElements.indexOf(connectedElement);
            if (connectedElement == 'b') {
                break
            }
            remainingElements.splice(indexRemove, 1)

            if (connectedElementNode.slice(-1) == '1') {
                exploreNode = 2
            }
            else {
                exploreNode = 1
            }
            nextElement = elements[connectedElement]
        }
        if (remainingElements.length != 0) {
            validCircuit = false
        }
        if (!validCircuit) {
            console.log("Circuit is wrong")
        }
    }

    if (validCircuit && missingElements.length == 0 && tooManyElements.length == 0 && incorrectConnections.length == 0) {
        console.log("Great Job!")
        readings = true
        direction = getDirection(elements)
        console.log(direction)
        correctConnections(direction)
    }
    else {
        console.log("There's issues") // starter message here
        if (incorrectConnections.length != 0) {
            let invalidConnection = incorrectConnections[0]
            let loop2Element = ""
            if (loop2.includes(invalidConnection.node1)) {
                loop2Element = invalidConnection.node1.slice(0, -10)
            }
            else {
                loop2Element = invalidConnection.node2.slice(0, -10)
            }
            let otherLoop2Element = ""
            if (loop2Element == 'lRB') {
                otherLoop2Element = 'k2'
            }
            else {
                otherLoop2Element = 'lRB'
            }

            const hints = [`What is the purpose of the ${elementNames[loop2Element]}? What elements should it be connected to?`,
            `The purpose of the ${elementNames[loop2Element]} is to ${purpose[loop2Element]}. Do your wire connections support this purpose?`,
            `According to the circuit diagram, the ${elementNames[loop2Element]} should be connected to the galvanometer and the ${elementNames[otherLoop2Element]}.`,
            `Connect the ${elementNames[loop2Element]} to the galvanometer and the ${elementNames[otherLoop2Element]} so that it is in parallel with the galvanometer. Resubmit to see if you have addressed the issue.`]

            invalidConnectionFunction(hints)
        }

        else if (missingElements.length != 0) {
            let wrongElement = missingElements[0]
            console.log("Wrong element", wrongElement)
            if (loop2.includes(wrongElement)) {
                let otherLoop2Element = ""
                if (wrongElement == 'lRB') {
                    otherLoop2Element = 'k2'
                }
                else {
                    otherLoop2Element = 'lRB'
                }
                if (elements[wrongElement].button1.length === 0 && elements[wrongElement].button2.length === 0) {
                    const hints = [
                        `It looks like the ${elementNames[wrongElement]} is not connected to the circuit. Where should it be in the circuit?`,
                        `The purpose of the ${elementNames[wrongElement]} is to ${purpose[wrongElement]}. How should we connect it to the circuit?`,
                        `The ${elementNames[wrongElement]} and ${elementNames[otherLoop2Element]} should be connected in parallel with the galvanometer. Resubmit to see if you have addressed the issue.`
                    ]
                    invalidConnectionFunction(hints)
                }
                else {
                    const hints = [
                        `Are you able to trace the path of the current from the battery through the circuit, including the ${elementNames[wrongElement]}, and back to the battery?`,
                        `Make sure both terminals of the ${elementNames[wrongElement]} are connected to the circuit`,
                        `The purpose of the ${elementNames[wrongElement]} is to ${purpose[wrongElement]} . How should we connect it to the circuit?`,
                        `The ${elementNames[wrongElement]} and ${elementNames[otherLoop2Element]} should be connected in parallel with the galvanometer. Resubmit to see if you have addressed the issue.`
                    ]
                    invalidConnectionFunction(hints)
                }



            } else {
                if (elements[wrongElement].button1.length === 0 && elements[wrongElement].button2.length === 0) {
                    const hints = [
                        `It looks like the ${elementNames[wrongElement]} is not connected to the circuit. Where should it be in the circuit?`,
                        `The purpose of the ${elementNames[wrongElement]} is to ${purpose[wrongElement]}. How should we connect it to the circuit?`,
                        `The battery, galvanometer, high resistance box, and key 1 should be connected in series. Resubmit to see if you have addressed the issue.`
                    ]
                    invalidConnectionFunction(hints)
                }
                else {
                    const hints = [
                        `Are you able to trace the path of the current from the battery to every element in the circuit and back to the battery?`,
                        `Make sure both terminals of the ${elementNames[wrongElement]} are connected to the circuit.`,
                        `The purpose of the ${elementNames[wrongElement]} is to ${purpose[wrongElement]}. How should we connect it to the circuit?`,
                        `The battery, galvanometer, high resistance box, and key 1 should be connected in series. Resubmit to see if you have addressed the issue`
                    ]
                    invalidConnectionFunction(hints)
                }
            }
        }
        else if (tooManyElements.length != 0) {
            let tooMany = tooManyElements[0]
            const hints = [
                `It looks like there are extra connections between some of the circuit elements. How does an extra path affect the current flow?`,
                `Start by reviewing your wire connections for the ${elementNames[tooMany]}.`,
                `What is the purpose of the high resistance box, galvanometer, and key 1 in the circuit?`,
                `The high resistance box limits the current, the galvanometer measures the current, and the key 1 switches on and off the current. Ensure that these three elements are connected in series with the battery so that all the current flows through them without splitting.`,
                `Remove the extra connection for the ${elementNames[tooMany]}. Resubmit to see if you have addressed the issue.`
            ]
            invalidConnectionFunction(hints)

        }
        else if (!validCircuit) {
            let elementsText = ""
            let disconnectedElements = remainingElements
            if (disconnectedElements.includes('g')) {
                disconnectedElements.push('l', 'k2')
            }

            if (disconnectedElements.length == 2) {
                elementsText = `${elementNames[disconnectedElements[0]]} and ${elementNames[disconnectedElements[1]]}`
            }
            else if (disconnectedElements.length > 2) {
                elementsText = `${elementNames[disconnectedElements[0]]}, ${elementNames[disconnectedElements[1]]}, and ${elementNames[disconnectedElements[2]]}`
            }

            const hints = [
                `Are you able to trace the path of the current from the positive terminal of the battery through the circuit to the negative terminal?`,
                `Make sure that the current can flow from the battery to every other element in the circuit`,
                `It looks like the ${elementsText} are not connected to the same circuit as the battery. So, they cannot receive the current flowing from the battery. Resubmit to see if you have addressed the issue.`
            ]
            invalidConnectionFunction(hints)
        }
    }
})




camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    drawnLines.forEach(line => {
        if (!scene.children.includes(line)) {
            scene.add(line);
        }
    });
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
