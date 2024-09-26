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
  const div = document.querySelector('div');
  let db;

  // Open IndexedDB, which is aptly titled "NotBook_IndxDB".
  const request = indexedDB.open('NotBook_IndxDB', 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('notes')) {  //save under "notes"
      db.createObjectStore('notes', { keyPath: 'id' });
    }
  };

  request.onsuccess = (event) => {
    db = event.target.result;

    // Load saved data, please.
    const transaction = db.transaction(['notes'], 'readonly');
    const store = transaction.objectStore('notes');
    const getRequest = store.get(1);
    getRequest.onsuccess = () => {
      if (getRequest.result) {
        div.textContent = getRequest.result.content;
      }
    };
  };

  // Save data before unloading
  window.addEventListener('beforeunload', () => {
    const transaction = db.transaction(['notes'], 'readwrite');
    const store = transaction.objectStore('notes');
    store.put({ id: 1, content: div.textContent });
    console.log(db.transaction);
  });
});

console.log("v0.11.3");
