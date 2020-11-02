let storedNodes = JSON.parse(localStorage.getItem("notes"));
let notes = storedNodes ? storedNodes : [];
let list = document.getElementById("list");

showNotes();

// Add Button Click Event Listener
document.getElementById("add-btn").addEventListener('click', function(){
    
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    if(title === ""){
        alert("please enter the title of the note");
    }else{
        notes.push({title: title, description: description});
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    }
        
    showNotes();
});


// Sort Button click Event Listener
document.getElementById("sort-btn").addEventListener('click', function(){
    notes.sort(function(x,y){
        let a = x.title;
        let b = y.title;
        return a == b ? 0 : a > b ? 1 : -1;
    });
    console.log(notes);
    showNotes();
});


// show notes function
function showNotes(){

    list.innerHTML = "";

    notes.map(function(note, i){

        let listItem = document.createElement("LI");

        let divTitle = document.createElement("DIV");
        divTitle.textContent = note.title;

        let divDescription = document.createElement("DIV");
        divDescription.textContent = note.description;

        // Delete Button
        let deleteNoteBtn = document.createElement("BUTTON");
        let deleteBtnText = document.createTextNode("Delete");
        deleteNoteBtn.setAttribute('id', 'delete-btn');
        deleteNoteBtn.appendChild(deleteBtnText);

        deleteNoteBtn.addEventListener('click', function(){
            let confirmationResult = confirm("Are you sure you want to delete this note");

            if(confirmationResult){
                notes.splice(i, 1);
                showNotes();
            }
        });

        // Edit Button
        let editNoteBtn = document.createElement("button");
        let editBtnText = document.createTextNode("Edit");
        editNoteBtn.setAttribute('id', 'edit-btn');
        editNoteBtn.appendChild(editBtnText);

        editNoteBtn.addEventListener('click', function(){
            listItem.removeChild(divTitle);
            listItem.removeChild(divDescription);
            listItem.removeChild(deleteNoteBtn);
            listItem.removeChild(editNoteBtn);

            // edit title input
            let editTitle = document.createElement('input');
            editTitle.setAttribute('type', 'text');
            editTitle.setAttribute('placeholder', 'Edit title');
            editTitle.setAttribute('id', 'editTitle');

            // edit description textarea
            let editDescription = document.createElement('textarea');
            editDescription.setAttribute('id', 'editDescription');
            editDescription.setAttribute('placeholder', 'Edit Description');
            editDescription.setAttribute('cols', 60);
            editDescription.setAttribute('rows', 8);

            // confirm button
            let confirmEditBtn = document.createElement('button');
            let confirmEditBtnText = document.createTextNode('Confirm');
            confirmEditBtn.setAttribute('id', 'confirm-btn');
            confirmEditBtn.appendChild(confirmEditBtnText);

            confirmEditBtn.addEventListener('click', function(){
                if(document.getElementById('editTitle').value == "")
                {
                    alert("Please enter the editing title");
                }
                else{
                    let confirmEditResult = confirm("Are you sure you want to edit this note?");

                    if(confirmEditResult){
                        note.title = document.getElementById('editTitle').value;
                        if(document.getElementById('editDescription').value != ""){
                            note.description = document.getElementById('editDescription').value;
                        }
                        showNotes();
                    }
                }
                           
            });


            // cancel button
            let cancelEditBtn = document.createElement('button');
            let cancelEditBtnText = document.createTextNode('Cancel');
            cancelEditBtn.setAttribute('id', 'cancel-btn');
            cancelEditBtn.appendChild(cancelEditBtnText);

            cancelEditBtn.addEventListener('click', function(){
                showNotes();
            });

            listItem.appendChild(editTitle);
            listItem.appendChild(editDescription);
            listItem.appendChild(confirmEditBtn);
            listItem.appendChild(cancelEditBtn);
        });

        listItem.appendChild(divTitle);
        listItem.appendChild(divDescription);
        listItem.appendChild(deleteNoteBtn);
        listItem.appendChild(editNoteBtn);

        list.appendChild(listItem);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}