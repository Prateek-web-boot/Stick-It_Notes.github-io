"use strict";

if ('serviceWorker' in navigator) {
  // register service worker
  navigator.serviceWorker.register('service-worker.js');
}

document.querySelector('.notes__list').addEventListener('click', removeNote);
var count = Number(window.localStorage.getItem('count'));

if (!count) {
  window.localStorage.setItem("count", "0");
}

var createNote = function createNote(noteTitle, noteContent) {
  document.querySelector('.empty__field').classList.add('hidden');
  var liTag = document.createElement('li');
  var h2Tag = document.createElement('h2');
  var iTag = document.createElement('i');
  var pTag = document.createElement('p');
  var divTag = document.createElement('div');
  var ulTag = document.querySelector('.notes__list');
  liTag.classList.add('note__item');
  h2Tag.classList.add('note__title');
  divTag.classList.add('close__btn');
  iTag.classList.add('fa', 'fa-times');
  pTag.classList.add('note__content');
  var h2Text = document.createTextNode(noteTitle);
  var pText = document.createTextNode(noteContent);
  h2Tag.appendChild(h2Text);
  pTag.appendChild(pText);
  divTag.appendChild(iTag);
  liTag.appendChild(h2Tag);
  liTag.appendChild(divTag);
  liTag.appendChild(pTag);
  ulTag.appendChild(liTag);
};

var createNoteFromInput = function createNoteFromInput(e) {
  e.preventDefault();
  var noteTitle = document.querySelector('.input__title').value;
  var noteContent = document.querySelector('.input__content').value;
  document.querySelector('.input__title').value = " ";
  document.querySelector('.input__content').value = " ";
  count++;
  window.localStorage.setItem("count", count);

  while (window.localStorage.getItem(noteTitle)) {
    noteTitle += "-1";
  }

  window.localStorage.setItem(noteTitle, noteContent);
  createNote(noteTitle, noteContent);
};

function removeNote(e) {
  if (e.target.getElementsByClassName('close__btn')) {
    if (confirm('are you sure?')) {
      var li = e.target.parentElement.parentElement;
      var ul = document.querySelector('.notes__list');
      ul.removeChild(li);
      count -= 1;
      window.localStorage.setItem("count", count);
      window.localStorage.removeItem(e.target.previousElementSibling.innerText);

      if (count < 1) {
        document.querySelector('.empty__field').classList.remove('hidden');
      }
    }
  }
}

for (var i = 0; i < count; i++) {
  var noteTitle = window.localStorage.key(i);
  var noteContent = window.localStorage.getItem(noteTitle);

  if (noteTitle !== "count" && noteTitle !== 'randid' && noteTitle) {
    createNote(noteTitle, noteContent);
  }
}

document.querySelector('#form').addEventListener('submit', createNoteFromInput, false);