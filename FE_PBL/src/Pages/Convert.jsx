import axios from 'axios';
import { useEffect } from 'react';
import './convert.css';
import './home.css';
//
import Magnifier from "react-magnifier";
import Zoom from './Zoom';
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";


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
      '<strong>' + '</strong>'
    );
    //encodeURI(file.name) + 
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

    // axios.post('https://8023-2001-ee0-293-22d4-f8a1-fcd6-7790-6bf3.ngrok-free.app/upload', form_data)
    //     .then((response) => {
    //         console.log(response.data);
    //         const res_div = document.getElementById("result-div");
    //         res_div.style.display = "block";
    //         const image = new Image();
    //         image.src = "data:image/png;base64, " + response.data.image_data;
    //         const url = image.src.replace(/^data:image\/[^;]+/, 'data:image/png;base64,');

    //         res_div.appendChild(image);
    //         console.log(image);
    //         res_div.innerHTML += "<a download='SRGAN_Output.png' href='" + url + "'>Download</a>";
    //     }, (error) => {
    //         console.log(error);
    //     });
    axios.post('https://8023-2001-ee0-293-22d4-f8a1-fcd6-7790-6bf3.ngrok-free.app/upload', form_data)
      .then((response) => {
        console.log(response.data);

        const res_div = document.getElementById("result-div");
        // Display the image from the response of the POST request
        const image = new Image();
        image.src = "data:image/png;base64, " + response.data.image_data;
        const url = image.src.replace(/^data:image\/[^;]+/, 'data:image/png;base64,');
        res_div.appendChild(image);
        //var src image
        console.log(image);
        // Download link for the image from the POST request
        // res_div.innerHTML += "<a download='SRGAN_Output.png' href='" + url + "'>Download</a>";

        // Request the processed image using axios.get
        axios.get('https://8023-2001-ee0-293-22d4-f8a1-fcd6-7790-6bf3.ngrok-free.app/processed-image', { responseType: 'blob' })
          .then((imageResponse) => {
            // Assuming the image data is directly the Blob data
            const processedImageBlob = imageResponse.data;

            // Create a download link for the processed image
            const processedImageUrl = URL.createObjectURL(processedImageBlob);
            res_div.innerHTML += `<br>`;
            res_div.innerHTML += `<br>`;
            res_div.innerHTML += `<a download='Processed_Image.png' href='${processedImageUrl}' class="button-3 w-button">Download Image</a>`;
          })
          .catch((error) => {
            console.log("Error fetching processed image:", error);
          });
      })
      .catch((error) => {
        console.log("Error with the POST request:", error);
      });

  }
  //processed
  // const serverUrl = 'https://8023-2001-ee0-293-22d4-f8a1-fcd6-7790-6bf3.ngrok-free.app';

  //   useEffect(() => {
  //     const processedImageUrl = `${serverUrl}/processed-image`;
  //     const processedImage = document.getElementById('processedImage');
  //     processedImage.src = processedImageUrl;
  //   }, []); 
  return (
    <>
      <div className='nav_convert'>
        <header id="nav" className="sticky-nav-2">
          <nav className="w-container">
            <ul role="list" className="nav-grid-2 w-list-unstyled">
              <li id="w-node-2fcc22990398-22990395">
                <Link className="nav-link-4 w--current" to="/">Home</Link>
              </li>
              <li id="w-node-2fcc22990398-22990395">
                <Link className="nav-link-4 w--current" to="/convert">Convert</Link>
              </li>
              <li id="w-node-2fcc22990398-22990395">
                <Link className="nav-link-4 w--current" to="/zoom">Zoom</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <div className="slogan">
        <h3>Image Super-Resolution</h3>
      </div>
      <div className="convert_form">
        <div className="upload_image">
          <p>Original</p>
          <form id="file-upload-form" className="uploader">
            <input id="file-upload" type="file" name="fileUpload" accept="image/*" />
            <label htmlFor="file-upload" id="file-drag">
              <img id="file-image" src="/image/file-upload.png" alt=" " className="hidden" />
              <div id="start">
                <i className="fa fa-download" aria-hidden="true"></i>
                <div id="notimage" className="hidden"></div>
                <span id="file-upload-btn" className="btn btn-primary"></span>
              </div>
              <div id="response" className="hidden">
                <div id="messages"></div>
              </div>
            </label>
          </form>
          <div className="convert_Btn">
            <button className="button-2 w-button" onClick={imageUpload}>Convert Image</button>
          </div>
        </div>
        <div className="processed_image">
          <div className="processed_form">
            <p>Super Resolve</p>
            <div className="processed_Image">
              {/* <img id="processedImage" src="" alt="Processed Image" />
                  <p>result</p> */}
              <div className="result" >
                <div id="result-div" >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Convert;