const keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const intervals = ['1', '1#', '2', '2#', '3', '4', '4#', '5', '5#', '6', '6#', '7'];
const dropdown = document.getElementById('dropdown');
const keyVolumeControl = document.getElementById('keyVolumeControl');
const intervalCheckboxesContainer = document.getElementById('intervalCheckboxes');
const answer = document.getElementById('answer');
let interval = '1';
let selectedIntervals = [interval];
let key = 'C';
let note = key;
let droneAudio = new Audio(`drones/${key.replace("#", "%23")}.mp3`);
let noteAudio = new Audio(`notes/${note.replace("#", "%23")}4.mp3`);

// Handling Drone Logic
keys.forEach(val => {
    const option = document.createElement('option');
    [option.textContent, option.value] = [val, val];
    if (val === key) { option.selected = true; }
    dropdown.appendChild(option);
});

keyVolumeControl.addEventListener('input', () => { droneAudio.volume = keyVolumeControl.value; });

document.getElementById('playDroneButton').addEventListener('click', () => {
    key = dropdown.value;
    droneAudio.pause();
    droneAudio = new Audio(`drones/${key.replace("#", "%23")}.mp3`);
    droneAudio.volume = keyVolumeControl.value;
    droneAudio.play();
    setRandomNote();
});

document.getElementById('stopDroneButton').addEventListener('click', () => { droneAudio.pause() = 0; droneAudio.currentTime = 0; });

// Handling Note Logic
intervals.forEach(val => {
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.classList.add('form-check', 'form-check-inline', 'col-6', 'col-sm-4', 'col-md-3', 'col-lg-2');

    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    checkbox.classList.add('form-check-input');
    label.classList.add('form-check-label');
    
    [checkbox.type, checkbox.id, checkbox.value, label.htmlFor, label.textContent] = ['checkbox', val, val, val, val];
    
    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);
    intervalCheckboxesContainer.appendChild(checkboxWrapper);

    if (val === interval) { checkbox.checked = true; }
});


function setRandomNote() {
    key = dropdown.value;
    selectedIntervals = intervals.filter(val => document.getElementById(val)?.checked);
    interval = selectedIntervals.length ? selectedIntervals[Math.floor(Math.random() * selectedIntervals.length)] : null;
    note = keys[(keys.indexOf(key) + intervals.indexOf(interval)) % keys.length];
    noteAudio = new Audio(`notes/${note.replace("#", "%23")}${(Math.floor(Math.random() * 5) + 2).toString()}.mp3`);
    answer.textContent = '';
}

document.getElementById('changeNoteButton').addEventListener('click', () => { setRandomNote(); });
document.getElementById('playNoteButton').addEventListener('click', () => { noteAudio.currentTime = 0; noteAudio.play(); });

document.getElementById('showNoteButton').addEventListener('click', () => { 
    answer.textContent = `Interval: ${interval}, Note: ${note}`; 
    answer.style.display = 'block';
});
