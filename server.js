const express = require('express');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use('/static',express.static('public'))
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/addData', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const fileData = req.file.buffer.toString(); 
    console.log(fileData);

    res.cookie('fileData', fileData, { maxAge: 100000, httpOnly: false,signed:false });
    
    res.send('File data added to cookie successfully');
});


app.get('/getCookie', (req, res) => {
    if (req.cookies && req.cookies['fileData']) {
        let fileData = req.cookies['fileData'];
        res.send(fileData);
    } else {
        res.send('No file data found in cookie');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
