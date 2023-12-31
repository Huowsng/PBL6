const fileupload = require("express-fileupload");
const express = require("express");
const bodyparser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const SERVER_PORT = 4000;
const input_file_path = "../LR-input/lr_image.png";
const output_file_path = "../SR-output/sr_image.png";
const py_cmd = "python ../client.py "
  .concat(input_file_path + " ")
  .concat(output_file_path);

var app = express();
app.use(bodyparser.json());
app.use(fileupload());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.listen(SERVER_PORT, () =>
  console.log("Server running in port " + SERVER_PORT)
);

app.post("/upload", (req, res) => {
  console.log("Image type: " + req.files.image.type);
  fs.writeFile(input_file_path, req.files.image.data, function (err) {
    if (err) {
      console.log("Failed to save file in system");
    }
    console.log("The file has been successfully saved");
  });


  exec(py_cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
    if (stderr) {
      console.log(stderr);
    }
    console.log(stdout);
    sendImageBack(res);
  });
});

app.get("/original-image", (req, res) => {
  const imagePath = path.resolve(__dirname, originalImagePath);
  res.sendFile(imagePath);
})

// load anh https://323a-2001-ee0-293-22d4-8007-aa58-44a3-de97.ngrok-free.app/processed-image
app.get("/processed-image", (req, res) => {
  const imagePath = path.resolve(__dirname, output_file_path);
  res.sendFile(imagePath);
});

app.get("/getNewImage", (req, res) => {
  // Đường dẫn của file mới sau khi xử lý
  const processedFilePath = path.resolve(__dirname, output_file_path);

  // Trả về đường dẫn của ảnh mới
  res.json({
    success: true,
    outputFilePath: processedFilePath
  });
});
function sendImageBack(res) {
  fs.readFile(output_file_path, function (err, data) {
    if (!err) {
      image_data = Buffer.from(data).toString("base64");
      res.send({ image_data: image_data });
    }
  });
}
