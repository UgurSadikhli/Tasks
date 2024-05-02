const list = document.querySelector('#cookieList');

document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    fetch('http://localhost:3000/addData', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); 
    })
    .then(message => {
        console.log(message); 
    })
    .catch(error => console.error('Error:', error));
});


document.getElementById('getButton').addEventListener('click', () => {
    fetch('http://localhost:3000/getCookie')
        .then(res => res.text())
        .then(data => {
            const cookieTextBox = document.getElementById('cookieData');
            cookieTextBox.value = data;
        })
        .catch(error => console.error('Error:', error));
});