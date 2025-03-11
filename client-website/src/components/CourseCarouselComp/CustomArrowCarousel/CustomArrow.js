import React from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';


const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'rgb(27 59 88)', borderRadius: '50%', padding: '10px' }}
      onClick={onClick}
    >
      <ArrowForwardIos sx={{ color: '#fff', fontSize: {xs: 16, md: 21} }} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'rgb(27 59 88)', borderRadius: '50%', padding: '10px' }}
      onClick={onClick}
    >
      <ArrowBackIos sx={{ color: '#fff', fontSize: {xs: 16, md: 21} }} />
    </div>
  );
};

export { NextArrow, PrevArrow };