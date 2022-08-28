class Note{
    constructor(title, desc, importance){
        
        if(title !== ""){
            this.title = title;
        }else{
            this.title = "New note"
        }

        if(desc !== ""){
            this.description = desc;
        }else{
            this.description = "No description"
        }

        if(importance !== ""){
            this.importance = importance;
        }else{
            this.importance = "#00FF19"
        }
    }
}


let Notes = [];



$(document).ready( function() {
    const MainContainer = document.getElementById('main');

    let formIsOpen = false;
    let mainIcon = document.querySelector(".main-create-icon");
    let mainWrapper = document.querySelector(".create-form");
    let formWrapper = document.querySelector(".create-wrapper");
    let closeIcon = document.querySelector(".close-icon");

    function closeCreateWindow(){
        mainWrapper.classList.remove('form-active');
        formWrapper.classList.add("ds-none");
        closeIcon.classList.add("ds-none");
        mainIcon.setAttribute("name", "add-outline");
        formIsOpen = false;
    }

    function clearCreateWindow(){
        document.getElementById('new-note-title').value = "";
        document.getElementById('new-note-desc').value = "";
        for( let el of document.getElementsByClassName("radio-input")){
            if(el.checked){
                el.checked = false;
            }
        }
        document.getElementsByClassName("radio-input")[0].checked = true;
    }

    function clearNoteList(){
        for(let childNote of $('.note-wrapper')){
            childNote.parentNode.removeChild(childNote);
        }
    }

    function fillNoteList(targetArray){
        for(let note of targetArray){
            let newNoteEl = document.createElement("div");
            MainContainer.appendChild(newNoteEl);
            newNoteEl.classList.add("note-wrapper");
            newNoteEl.innerHTML = '<div class="note-txt"><div class="importance-marker" style="background-color:' + note.importance+';"></div><span class="note-title">' + note.title + '</span><p class="note-desc">' + note.description + '</p></div>';
        }
    }

    

    function emptyNoteAppend(){
        if(Notes.length == 0){
            document.querySelector(".no-results").classList.add("ds-none");
            let emptyNoteEl = document.createElement("div");
            MainContainer.appendChild(emptyNoteEl);
            emptyNoteEl.classList.add("note-wrapper");
            emptyNoteEl.classList.add("emty-list-wrapper");
            emptyNoteEl.innerHTML = '<div class="note-txt"><span class="note-title">You do not have any notes yet :(</span><p class="note-desc">To start using the app and create your first note <label class="create-link" id="create-link">click here</label></p></div>'
            emptyNoteEl.addEventListener("click", function(){
                mainIcon.setAttribute("name", "checkmark-outline");
                formWrapper.classList.remove("ds-none");
                closeIcon.classList.remove("ds-none");
                mainWrapper.classList.add('form-active');
                formIsOpen = true;
            })
        }
    }

    $(".main-create-icon").on("click", function(){
        if(formIsOpen === false){
            mainIcon.setAttribute("name", "checkmark-outline");
            formWrapper.classList.remove("ds-none");
            closeIcon.classList.remove("ds-none");
            mainWrapper.classList.add('form-active');
            formIsOpen = true;
        }else{
            closeCreateWindow();

            let newTiltleValue = document.getElementById('new-note-title').value;
            let newDescValue = document.getElementById('new-note-desc').value;
            let newRadioValue;
            let radioArr = document.getElementsByClassName("radio-input");
            for( let el of radioArr){
                if(el.checked){
                    newRadioValue = el.value
                }
            }

            let newNote = new Note(newTiltleValue, newDescValue, newRadioValue);
            Notes.unshift(newNote);

            clearCreateWindow();

            clearNoteList();
            
            fillNoteList(Notes);
        }
    })


    document.getElementById("create-link").addEventListener("click", function(){
        mainIcon.setAttribute("name", "checkmark-outline");
        formWrapper.classList.remove("ds-none");
        closeIcon.classList.remove("ds-none");
        mainWrapper.classList.add('form-active');
        formIsOpen = true;
    })

    $(".close-icon").on("click", function(){
        closeCreateWindow();
        clearCreateWindow();
    })

    $(".switch-wrapper").on("click", function(){
        document.body.classList.toggle("light-theme");
    })

    let searchInput = document.getElementById("search-input");
    let closeSearchBtn = document.querySelector('.close-search');
    $(".search-input").on("input", function(){
        let SearchedNotes = [];

        closeSearchBtn.classList.remove("ds-none");

        for(let note of Notes){
            if(note.title.toLowerCase().includes(searchInput.value.toLowerCase())){
                SearchedNotes.push(note);
            }
        }

        clearNoteList()
        if(SearchedNotes.length == 0){
            document.querySelector(".no-results").classList.remove("ds-none");
        }else{
            fillNoteList(SearchedNotes);
            document.querySelector(".no-results").classList.add("ds-none");
        }

        if(searchInput.value == ""){
            closeSearchBtn.classList.add("ds-none");
        }

        emptyNoteAppend();
        
    })

    closeSearchBtn.addEventListener('click', function(){
        searchInput.value = "";
        searchInput.focus = false;
        closeSearchBtn.classList.add("ds-none");
    })
})