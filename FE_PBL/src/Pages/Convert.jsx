import axios from 'axios';
import { useEffect } from 'react';
import './convert.css';
function Convert() {

useEffect(() => {
    console.log("Upload Initialised");
    const fileSelect = document.getElementById('file-upload');
    const fileDrag = document.getElementById('file-drag');

    fileSelect.addEventListener('change', fileSelectHandler, false);
    fileDrag.addEventListener('dragover', fileDragHover, false);
    fileDrag.addEventListener('dragleave', fileDragHover, false);
    fileDrag.addEventListener('drop', fileSelectHandler, false);

    // Check for the various File API support.
    if (!(window.File && window.FileList && window.FileReader)) {
        document.getElementById('file-drag').style.display = 'none';
    }
}, []);
    
function fileDragHover(e) {
    const fileDrag = document.getElementById('file-drag');
    e.stopPropagation();
    e.preventDefault();
    fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
}

function fileSelectHandler(e) {
    const files = e.target.files || e.dataTransfer.files;
    fileDragHover(e);
    for (let i = 0, f; (f = files[i]); i++) {
        parseFile(f);
    }
}

function output(msg) {
    const m = document.getElementById('messages');
    m.innerHTML = msg;
}
    
function parseFile(file) {
    console.log(file.name);
    output(
        '<strong>' + encodeURI(file.name) + '</strong>'
    );
    const imageName = file.name;
    const isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
    if (isGood) {
        document.getElementById('start').classList.add("hidden");
        document.getElementById('response').classList.remove("hidden");
        document.getElementById('notimage').classList.add("hidden");
        document.getElementById('file-image').classList.remove("hidden");
        document.getElementById('file-image').src = URL.createObjectURL(file);
    } else {
        document.getElementById('file-image').classList.add("hidden");
        document.getElementById('notimage').classList.remove("hidden");
        document.getElementById('start').classList.remove("hidden");
        document.getElementById('response').classList.add("hidden");
        document.getElementById("file-upload-form").reset();
    }
}

function imageUpload() {
    const element = document.getElementsByName("fileUpload")[0];
    const files = element.files[0];

    const form_data = new FormData();
    console.log(files);
    form_data.append("image", files);
    form_data.append("data1", "hello");
    console.log(form_data.get('image'));

    axios.post('http://localhost:4000/upload', form_data)
        .then((response) => {
            console.log(response.data);
            const res_div = document.getElementById("result-div");
            res_div.style.display = "block";
            const image = new Image();
            image.src = "data:image/png;base64, " + response.data.image_data;
            const url = image.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');

            res_div.appendChild(image);
            console.log(image);
            res_div.innerHTML += "<a download='SRGAN_Output.png' href=" + url + ">Download</a>";
        }, (error) => {
            console.log(error);
        });
}
//processed
const serverUrl = 'http://localhost:4000';

useEffect(() => {
  // Đường dẫn của ảnh đã xử lý trên máy chủ
  const processedImageUrl = `${serverUrl}/processed-image`;
  const processedImage = document.getElementById('processedImage');

  // Gán đường dẫn ảnh vào thuộc tính src của thẻ <img>
  processedImage.src = processedImageUrl;
}, []); // Thêm mảng trống để đảm bảo useEffect chỉ chạy một lần
  return (
    <div className="convert_form">
      <div className="upload_image">
        <p>Original</p>
        <form id="file-upload-form" className="uploader">
            <input id="file-upload" type="file" name="fileUpload" accept="image/*" />
            <label htmlFor="file-upload" id="file-drag">
              <img id="file-image" src="/image/file-upload.png" alt="Preview" className="hidden" />
              <div id="start">
                <i className="fa fa-download" aria-hidden="true"></i>
                <div id="notimage" className="hidden"></div>
                <span id="file-upload-btn" className="btn btn-primary"></span>
              </div>
              <div id="response" className="hidden">
                <div id="messages">aaa</div>
              </div>
            </label>
          </form>
          <div className="convert_Btn">
            <button className="button-2 w-button" onClick={imageUpload}>Convert Image</button>
            <div id="result-div">
                
            </div>
          </div>
      </div>

      <div className="processed_image">
        <div className="processed_form">
            <p>Super Resolve</p>
            <div>
                <img id="processedImage" src="" alt="Processed Image" />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Convert;