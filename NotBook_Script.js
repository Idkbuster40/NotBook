//START_OF_CODE
//This handles the word count.
const editor = document.getElementById('editor');
const wordCountDisplay = document.getElementById('word-count');

editor.addEventListener('input', () => {
    const text = editor.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    wordCountDisplay.textContent = `Words: ${words}`;
});

// Save to local storage, only 1 document supported for now. Can be found under "NotBookSaveData"
function saveDocument() {
    const content = editor.value;
    localStorage.setItem('NotBookSaveData', content);
}

function loadDocument() {
    const content = localStorage.getItem('NotBookSaveData');
    if (content) {
        editor.value = content;
    }
}
//loading and saving.
window.onload = loadDocument;
window.onbeforeunload = saveDocument;
//END_OF_CODE
