const express = require('express');
const controller = require('../controllers/APIController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/test', controller.api_test);

router.post('/Image/toSVG', upload.single('file'), (req, res) => {
    if (!req.file) {
        // return res.status(400).json({ message: 'No file uploaded.' });
        res.set('Content-Type', 'image/png');
        // return res.sendFile('/home/opc/workspace/works/nodejs/RadialPrinter/uploads/d2d9c51f1bb31b21cab70a10008b1bbb');
    }
    
    const originalFileName = req.file.originalname;
    const savedFileName = req.file.filename; 
    const fileExtension = req.file.mimetype.split('/')[1];
    
    console.log(originalFileName);
    console.log(savedFileName);
    console.log(fileExtension);
    console.log(req.file.mimetype);
  
    console.log('sussy');
    return res.status(200).json({ message: 'File uploaded successfully' });
    // res.sendFile('../uploads/1234.png');
});


module.exports = router;