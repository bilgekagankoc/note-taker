

const noteHeader = document.querySelector("#note-header");
const textBox = document.querySelector("#text-box");
const addNoteButton = document.querySelector(".add-note");
const noteContainer = document.querySelector(".note-container");

//DomContentLoaded
window.addEventListener("DOMContentLoaded", function () {
    noteArr = getLocalStorage.getToLocalStorage();
    noteArr.forEach(element => {
        getNote.addUI(element.header, element.text);
    });
})

//Create noteTaker function
function noteTaker() {

}
noteTaker.prototype.addUI = function (header, text) {
    noteContainer.innerHTML += `<div class="show-note">
    <div class="note-header">
        <span>
            <h4>${header}</4>
        </span>
    </div>
    <div class="note-content">
        ${text}
    </div>
    <div class="note-detail">
        <button type="button" class="btn note-detail">View Detail</button>
    </div>
    <div class="delete-note">
                    <i class="ion-close-round delete-note"></i>
    </div>
</div>`

}

function localStorageProgress() {

}
localStorageProgress.prototype.getToLocalStorage = function () {
    var noteArr;
    if (localStorage.getItem("note") == null) {
        return noteArr = [];
    }
    else {
        return noteArr = JSON.parse(localStorage.getItem("note"));
    }
}
localStorageProgress.prototype.addToLocalStorage = function (header, text) {
    var noteObj;
    noteArr = this.getToLocalStorage();
    noteObj = { header: header, text: text };
    noteArr.push(noteObj);
    localStorage.setItem("note", JSON.stringify(noteArr));
}
localStorageProgress.prototype.removeLocalStorage = function (header, text) {
    headerNote = header.trim();
    textNote = text.trim();
    noteArr = this.getToLocalStorage();
    for (var i = 0; i < noteArr.length; i++) {
        if (noteArr[i].header == headerNote && noteArr[i].text == textNote) {
            noteArr.splice(i, 1);
        }
    }
    localStorage.setItem("note", JSON.stringify(noteArr));
}


//Define varriable
const getNote = new noteTaker();
const getLocalStorage = new localStorageProgress();


addNoteButton.addEventListener("click", function () {
    const headerNote = noteHeader.value;
    const textNote = textBox.value;
    getNote.addUI(headerNote, textNote);
    getLocalStorage.addToLocalStorage(headerNote, textNote);

    noteHeader.value = "";
    textBox.value = "";
})
//Remove note
noteContainer.addEventListener("click", function (e) {
    if (e.target.className == "ion-close-round delete-note") {
        var textNote = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        var headerNote = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        getLocalStorage.removeLocalStorage(headerNote, textNote);
        e.target.parentElement.parentElement.remove();
    }
})