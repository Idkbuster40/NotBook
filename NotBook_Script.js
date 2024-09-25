// function saveDocument() {
//     const content = textarea.value;
//     window.localStorage.setItem('NotBookSaveData', content);
// }
//
// function loadDocument() {
//     const content = window.localStorage.getItem('NotBookSaveData');
//     if (content) {
//         textarea.value = content;
//     }
// }
//
// window.onload = loadDocument;
// window.onbeforeunload = saveDocument;

// IndexedDB, opens it if exists, creates if not.
window.addEventListener('load', () => {
  const textarea = document.querySelector('textarea');
  let db;

  // Open IndexedDB
  const request = indexedDB.open('myDB', 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('notes')) {
      db.createObjectStore('notes', { keyPath: 'id' });
    }
  };

  request.onsuccess = (event) => {
    db = event.target.result;

    // Load saved data
    const transaction = db.transaction(['notes'], 'readonly');
    const store = transaction.objectStore('notes');
    const getRequest = store.get(1);
    getRequest.onsuccess = () => {
      if (getRequest.result) {
        textarea.value = getRequest.result.content;
      }
    };
  };

  // Save data before unloading
  window.addEventListener('beforeunload', () => {
    const transaction = db.transaction(['notes'], 'readwrite');
    const store = transaction.objectStore('notes');
    store.put({ id: 1, content: textarea.value });
  });
});
