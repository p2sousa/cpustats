import React, { useState, useEffect } from 'react';

function ProgressBar(props) {
  const [animationInited, setAnimationInited] = useState(false);

  useEffect(() => {
    initAnimation();
  });

  const initAnimation = () => {
    if (!animationInited) {
      setAnimationInited(true);
    }
  }

  const getProgress = () => {
    const { progress } = props

    return !animationInited ? 0 : progress
  }

  const getStrokeDashoffset = strokeLength => {
    const progress = getProgress()
    const progressLength = (strokeLength / 100) * (100 - progress)
    return progressLength
  }

  const getStrokeDashArray = (strokeLength, circumference) => {
    return `${strokeLength}, ${circumference}`
  }

  const getTrackStrokeDashArray = (strokeLength, circumference) => {
    const { initialAnimation } = props

    if (initialAnimation && !animationInited) return `0, ${circumference}`
    return `${strokeLength}, ${circumference}`
  }

  const width = window.innerWidth * 0.20 > 200 ? 220 : window.innerWidth * 0.20;
  const radius = ( width / 2 ) - props.strokeWidth;

  const circumference = 2 * Math.PI * radius;
  const strokeLength = (circumference / 360) * (360)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <svg
        width={width}
        height={width}
        viewBox={`0 0 ${width} ${width}`}
        style={{ transform: `rotate(90deg)` }}
      >
        {props.trackStrokeWidth > 0 && (
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={props.trackStrokeColor}
            strokeWidth={props.trackStrokeWidth}
            strokeDasharray={getTrackStrokeDashArray(
              strokeLength,
              circumference
            )}
            strokeLinecap={props.trackStrokeLinecap}
            style={{ transition: props.trackTransition }}
          />
        )}
        {props.strokeWidth > 0 && (
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={props.strokeColor}
            strokeWidth={props.strokeWidth}
            strokeDasharray={getStrokeDashArray(
              strokeLength,
              circumference
            )}
            strokeDashoffset={getStrokeDashoffset(
              strokeLength
            )}
            strokeLinecap={props.strokeLinecap}
            // style={{ transition }}
          />
        )}
      </svg>
    </div>
  )
}

ProgressBar.defaultProps = {
  progress: 0,
  strokeWidth: 10,
  strokeColor: 'indianred',
  strokeLinecap: 'round',
  transition: '0.3s ease',
  trackStrokeColor: '#e6e6e6',
  trackStrokeWidth: 10,
  trackStrokeLinecap: 'round',
  trackTransition: '.3s ease',
}

export default ProgressBar
