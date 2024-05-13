const button = document.getElementById('addButton');
button.addEventListener('click', function() {
    fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Object added successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error adding object.');
        });
});