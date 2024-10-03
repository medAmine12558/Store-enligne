import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import image from '../../../../assets/image.png';

const SlideShow = () => {
    return (
        <Slide>
            <div className="each-slide-effect">
                <div style={{ backgroundImage: `url(${image})` }}>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ backgroundImage: `url(${image})` }}>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ backgroundImage: `url(${image})` }}>
                </div>
            </div>
        </Slide>
    );
};
export default SlideShow;