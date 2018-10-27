var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./UploadedImage");
    },
    __filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

var upload = multer({
    storage: storage
}).array("imgUploader", 3);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    //res.send('Hi, there!')
})

app.post("/api/Upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.end("Something went wrong!");
        }
        return res.end("File upload sucessfully!.")
    })
})

app.listen(2000, function(a) {
    console.log("Listening to port 2000")
});