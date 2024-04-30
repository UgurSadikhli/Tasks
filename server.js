const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('photos', 10), (req, res) => {
    try {
        res.redirect('/images');
    } catch (err) {
        res.sendStatus(400);
    }
});

app.get('/images', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return res.status(500).send({
                message: "Files couldn't upload."
            });
        }

        let fileList = files.map(file => `
            <div>
                <img src="/uploads/${file}" alt="Uploaded Image" style="width: auto; max-height: 200px; margin: 10px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);">
                <form action="/delete" method="POST">
                    <input type="hidden" name="filename" value="${file}">
                    <button type="submit" style="font-family: Arial, sans-serif; background-color: red; color: white; width:4rem;height:2rem;border-radius:10px;">Delete</button>
                </form>
            </div>
        `).join('');

        res.send(`
            <div style="font-family: Arial, sans-serif; background-color: #f0f2f5; color: #333; display: flex; justify-content: center; align-items: center; flex-direction: column; min-height: 100vh;">
                <h1 style="color: #4A90E2; margin-bottom: 20px;">Uploaded photos</h1>
                <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; max-width: 960px; margin: auto;">
                    ${fileList}
                </div>
            </div>
        `);
    });
});

app.post('/delete', (req, res) => {
    const filename = req.body.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send({
                message: "File deletion failed."
            });
        }
        res.redirect('/images');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});