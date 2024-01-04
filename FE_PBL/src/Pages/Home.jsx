import Convert from "./Convert";
import Zoom from "./Zoom";
import React from "react";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";
import './home.css'
function Home() {
  const serverUrl = 'https://323a-2001-ee0-293-22d4-8007-aa58-44a3-de97.ngrok-free.app';
  const processedImageUrl = `${serverUrl}/processed-image`;
  return (
    <>
      <div>
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

        <header id="hero-overlay" className="hero-overlay">
          <div className="centered-container w-container">
            <h1 className="heading">SRGAN</h1>
            <p className="paragraph">
              <strong>SRGAN</strong> is a generative adversarial network for single image super-resolution.
              Essentially we make a low resolution which looks bad into
              an image that looks absolutely <strong>AMAZING !!</strong>
            </p>
            <div>
              <Link className="button w-button" to="/convert">Try it Out</Link>
            </div>
          </div>
        </header>

        <section id="cards-section" className="cards-section">
          <div className="centered-container w-container">
            <h2 className="heading-2">What is SRGAN ?</h2>
            <p className="paragraph-3">
              Super-resolution GAN applies a deep network in combination with an adversary network to produce higher resolution images.
              As shown below, SRGAN is more appealing to a human with more details compared with the similar design without GAN (SRResNet).
              During the training, A high-resolution image (HR) is downsampled to a low-resolution image (LR).
              A GAN generator upsamples LR images to super-resolution images (SR).
              We use a discriminator to distinguish the HR images and backpropagate the GAN loss to train the discriminator and the generator.
            </p>
            <div className="w-layout-grid grid">
              <h4 className="heading-10">Low Resolution Images</h4>
              <h4 className="heading-11">Generated Using SRGAN from LR Images</h4>
              <img src="images/input2.PNG" loading="lazy" width="467" alt="" />
              <img src="images/output2.PNG" loading="lazy" width="461" alt="" />
              <img src="images/input.PNG" loading="lazy" width="555" alt="" />
              <img src="images/output.PNG" loading="lazy" width="580" alt="" className="image-4" />
            </div>
          </div>
        </section>

        <div className="container-2 w-container">
          <h1>How does it work?</h1>
          <div className="div-block">
            <img src="images/srgan.PNG" loading="lazy" width="860" sizes="(max-width: 479px) 87vw, (max-width: 767px) 88vw, (max-width: 991px) 698px, 860px" srcSet="images/srgan-p-500.png 500w, images/srgan.PNG 776w" alt="" className="image-2" />
          </div>
          <h3 className="heading-7">Generator Architecture:</h3>
          <p className="paragraph-2">
            <strong className="bold-text">
              The generator architecture contains a residual network instead of deep convolution networks because residual networks
              are easy to train and allow them to be substantially deeper to generate better results.
              This is because the residual network used a type of connections called skip connections.
              There are B residual blocks (16), originated by ResNet.
              Within the residual block, two convolutional layers are used, with small 3×3 kernels and 64 feature maps followed by batch-normalization layers
              and ParametricReLU as the activation function.
              The resolution of the input image is increased with two trained sub-pixel convolution layers.
              This generator architecture also uses parametric ReLU as an activation function which, instead of using a fixed value
              for a parameter of the rectifier (alpha) like LeakyReLU, adaptively learns the parameters of the rectifier and
              improves the accuracy at negligible extra computational cost.
            </strong>
          </p>
          <h3 className="heading-9">Discriminator Architecture:</h3>
          <p className="paragraph-4">
            The task of the discriminator is to discriminate between real HR images and generated SR images.
            The discriminator architecture used in this paper is similar to DC-GAN architecture with LeakyReLU as activation.
            The network contains eight convolutional layers with 3×3 filter kernels, increasing by a factor of 2 from 64 to 512 kernels.
            Strided convolutions are used to reduce the image resolution each time the number of features is doubled.
            The resulting 512 feature maps are followed by two dense layers and a LeakyReLU applied between and a final sigmoid activation
            function to obtain a probability for sample classification.
          </p>
        </div>

        <footer id="footer" className="footer">
          <div className="w-container">
            <div className="text-block">Data Science and Machine Learning Self Study @RV College of Engineering</div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home