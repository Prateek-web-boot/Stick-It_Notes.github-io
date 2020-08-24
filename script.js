if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('service-worker.js');
  }

document.querySelector('.notes__list').addEventListener('click', removeNote);


let count = Number(window.localStorage.getItem('count'));
if(!count) {
    window.localStorage.setItem("count", "0");
}


let createNote = (noteTitle, noteContent) => {
    
    document.querySelector('.empty__field').classList.add('hidden');

    let liTag = document.createElement('li');
    let h2Tag = document.createElement('h2');
    let iTag = document.createElement('i');
    let pTag = document.createElement('p');
    let divTag = document.createElement('div');
    let ulTag = document.querySelector('.notes__list');
    
    liTag.classList.add('note__item');
    h2Tag.classList.add('note__title');
    divTag.classList.add('close__btn');
    iTag.classList.add('fa', 'fa-times');
    pTag.classList.add('note__content');

    let h2Text = document.createTextNode(noteTitle);
    let pText = document.createTextNode(noteContent);

    h2Tag.appendChild(h2Text);
    pTag.appendChild(pText);

    divTag.appendChild(iTag);

    liTag.appendChild(h2Tag);
    liTag.appendChild(divTag);
    liTag.appendChild(pTag);

    ulTag.appendChild(liTag);
    
};


let createNoteFromInput = (e) => {
    e.preventDefault();
    
    let noteTitle = document.querySelector('.input__title').value;
    let noteContent = document.querySelector('.input__content').value;

    document.querySelector('.input__title').value = " ";
    document.querySelector('.input__content').value = " ";

    count++;
    window.localStorage.setItem("count", count);

    while(window.localStorage.getItem(noteTitle)) {
        noteTitle += "-1";
    }
    window.localStorage.setItem(noteTitle, noteContent);

    createNote(noteTitle, noteContent);


};

function removeNote(e) {

    if(e.target.getElementsByClassName('close__btn')) {
        
        if (confirm('are you sure?')) {
            let li = e.target.parentElement.parentElement;
            let ul = document.querySelector('.notes__list');
            ul.removeChild(li);

            count -= 1;
            window.localStorage.setItem("count", count);

            window.localStorage.removeItem(e.target.previousElementSibling.innerText);
            
            if(count < 1) {
            document.querySelector('.empty__field').classList.remove('hidden');
            }
        }
    }
    

}

for(let i = 0; i < count; i++) {

    let noteTitle = window.localStorage.key(i);
    let noteContent = window.localStorage.getItem(noteTitle);

    if (noteTitle !== "count" && noteTitle !== 'randid' && noteTitle) {
        createNote(noteTitle, noteContent);
    }
}

document.querySelector('#form').addEventListener('submit', createNoteFromInput, false);






