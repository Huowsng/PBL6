import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

export function Gallery() {
const onInit = () => {
    console.log('lightGallery has been initialized');
};
    return (
        <div className="App">
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                <a href="/image/bag.jpg">
                    <img alt="img1" src="/image/bag.jpg" />
                </a>
                <a href="/image/chim.jpg">
                    <img alt="img2" src="/image/chim.jpg" />
                </a>
            </LightGallery>
        </div>
    );
}
