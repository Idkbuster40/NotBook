function saveDocument() {
    const content = textarea.value;
    localStorage.setItem('NotBookSaveData', content);
}

function loadDocument() {
    const content = localStorage.getItem('NotBookSaveData');
    if (content) {
        textarea.value = content;
    }
}

window.onload = loadDocument;
window.onbeforeunload = saveDocument;
