// Load messages
fetch('/lang/messages/en/lab3Messages.json')
  .then((response) => response.json())
  .then((messages) => {
    document.getElementById('appendButton').addEventListener('click', () => {
      const text = document.getElementById('textInput').value;

      if (!text) {
        alert(messages.enterTextToAppend);
        return;
      }

      fetch(`/writeFile?text=${encodeURIComponent(text)}`)
        .then((response) => response.text())
        .then((data) => {
          alert(data);
        })
        .catch((error) => {
          console.error(messages.errorOccurred.replace('%s', error));
        });
    });

    document.getElementById('readButton').addEventListener('click', () => {
      fetch('/readFile/file.txt')
        .then((response) => response.text())
        .then((data) => {
          document.getElementById('fileContent').innerHTML = data;
        })
        .catch((error) => {
          console.error(messages.errorOccurred.replace('%s', error));
        });
    });
  })
  .catch((error) => {
    console.error('Error loading messages:', error);
  });
