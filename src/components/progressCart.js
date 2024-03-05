import React from 'react';
import Progress from './progress';
import '../css/progress.css';
import { Box } from '@mui/system';

const ProgressCart = () => {
  return (
    <div className="progress-cart">
      <Box sx={{ml:2}}>
        <p>Name</p>
      </Box>
      <Box sx={{ml:8}}>
        <Progress />
      </Box>

    </div>
  );
};

export default ProgressCart;
