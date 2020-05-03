let allNotes = []; // The notes array.
let index = Math.floor(Math.random() * 100000); // Uniqe ID.
let byID = id => document.getElementById(id); // Shortcut to get elements by ID.
let formValid = Boolean; // variable for the form validation.
displayOnLoad(); // Retrieve data from previous usage.



// Validate function - make sure the form is valid.
function validate() {

    // Invalid form - exectued only if form is not valid, prevents any further action until fixed.
    function validation(inputName) {
        if (inputName.value === '' || undefined) {
            inputName.style.backgroundColor = 'coral';
            formValid = false;
            setTimeout(function () {
                inputName.style.backgroundColor = 'white';
            }, 2000)
        }
    }

    // Executing 'validation' function on the inputs.
    validation(byID('titleInput'));
    validation(byID('messageInput'));
}



// Creation function - create notes array + add them to the session storage.
function createNote() {
    formValid = true;
    validate();

    if (formValid === true) {
        let note = {
            id: index,
            title: byID('titleInput').value,
            message: byID('messageInput').value
        };
        byID('titleInput').value = '';
        byID('messageInput').value = '';
        index++;
        allNotes.push(note);
        sessionStorage.setItem('allNotes', JSON.stringify(allNotes));
        console.log('Note created...');
        displayNotes();
    } else {
        alert('Make sure the form is filled');
    }
}



// Display function - display all the notes.
function displayNotes() {
    let container = byID('container'); // Getting the notes container.
    container.innerHTML = '';

    for (let item of allNotes) {
        let div = document.createElement('div'); // Creates main div, Contains all the other divs. 
        div.classList.remove("fadeIn");

        let titleDiv = document.createElement('div'); // Creates div for the title.
        titleDiv.innerHTML = `<h3> ${item.title} </h3>`; // Inserts title to the note.

        let textDiv = document.createElement('div'); // Creates div for the text.
        textDiv.innerHTML = `<p> ${item.message} <p>`; // Inserts message to the note.
        textDiv.className = "textDiv";

        let deleteBtn = document.createElement('img'); // Creates delete button.
        deleteBtn.id = item.id; // Giving the button ID.
        deleteBtn.onclick = deleteNote; // Giving it onclick function
        deleteBtn.src = '/assets/images/delete.png'; // Giving it the image source.
        div.append(titleDiv);
        div.append(textDiv);
        div.append(deleteBtn);
        container.append(div);
    }
    console.log('Displays the notes');
}



// Delete function - Deletes the desired note.
function deleteNote() {
    for (let i = 0; i < allNotes.length; i++) {
        if (allNotes[i].id === +this.id) {
            allNotes.splice(i, 1);
            console.log(`Deleted note...`);
        }
    }
    sessionStorage.setItem('allNotes', JSON.stringify(allNotes)); // Updating session storage.
    displayNotes();
}



// Retrieving data function - retrieving notes from past usage.
function displayOnLoad() {
    let retrieveStorage = sessionStorage.getItem("allNotes");
    if (retrieveStorage) {
        allNotes = JSON.parse(retrieveStorage);
        console.log('Retrieved notes from past usage...');
        byID('container').className = 'fadeIn';
        displayNotes();
    }
}