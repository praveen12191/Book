import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function CircularProgressWithLabel(props) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', border: '2px solid rgba(0, 0, 0, 0.19)', borderRadius: '50%'}}>
    <CircularProgress
      variant="determinate"
      size={100} // Adjust the size of the circle
      thickness={4}
      
      {...props}
    />
      <Typography
        variant="caption"
        component="div"
        color="textSecondary"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {`${Math.round(props.value)}%`}
      </Typography>
    </div>
  );
}

function Progress() {
  const [progress, setProgress] = React.useState(0);

  return (
    <div>
      {/* Display the CircularProgressWithLabel component with dynamic progress value */}
      <CircularProgressWithLabel value={20} />
    </div>
  );
}

export default Progress;
