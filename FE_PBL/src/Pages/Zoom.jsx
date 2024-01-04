import Magnifier from "react-magnifier";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";
import './zoom.css'


function Zoom() {
    const serverUrl = 'https://8023-2001-ee0-293-22d4-f8a1-fcd6-7790-6bf3.ngrok-free.app';

    const processedImageUrl = `${serverUrl}/processed-image`;
    return (
        <>
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
            <div className="container">
                <div className="magnifier_zone">
                    <Magnifier src={processedImageUrl} width={700} className="magnifier_item" />
                </div>
            </div>

        </>
    )
}

export default Zoom