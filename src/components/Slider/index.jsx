import React, {
  memo,
  useEffect,
  useState,
} from 'react';
import Swiper from 'swiper';
import PropTypes from 'prop-types';
import {
  StyledSliderWrapper,
} from './styled';
import 'swiper/css/swiper.css';

const Slider = ({
  bannerList,
}) => {
  const [slider, setSlider] = useState(null);

  useEffect(() => {
    if (bannerList.length && !slider) {
      const sliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: true,
        autoplayDisableOnInteraction: false,
        pagination: {
          el: '.swiper-pagination',
        },
      });
      setSlider(sliderSwiper);
    }
    return () => {
      if (slider) {
        setSlider(null);
      }
    };
  }, [bannerList.length, slider]);

  return (
    <StyledSliderWrapper>
      <div className="before" />
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map((banner) => {
              return (
                <div className="swiper-slide" key={banner.imageUrl}>
                  <div className="slider-nav">
                    <img src={banner.imageUrl} alt="首页轮播图" width="100%" height="100%" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination" />
      </div>
    </StyledSliderWrapper>
  );
};

Slider.propTypes = {
  bannerList: PropTypes.arrayOf(PropTypes.shape({
    imageUrl: PropTypes.string,
  })),
};

Slider.defaultProps = {
  bannerList: [],
};

export default memo(Slider);
