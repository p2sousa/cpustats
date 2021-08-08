import React, {useState} from 'react'
import ProgressBar from "../ProgressBar/index.js";

// importing styles and constants
import "./styles.css";
import {ProgressBarCons} from '../../config/Constants.js'

const CpuUsage = () => {
  const [cpuPercent, setCpuPercent] = useState(null);

	window.wails.Events.On("cpu_stats", cpu_stats => {
    if (cpu_stats) {
      setCpuPercent(cpu_stats.Usage)
    }
  })

  return (
    <div className="CircularUsageWrapper">
      <div className="CircularUsageInfoContainer">
        <h1 className="PrimaryText CircularUsageTitle">CPU</h1>
        <p className="SecondaryText CircularUsageSubContent">{cpuPercent}%</p>
      </div>
      <ProgressBar
        progress={cpuPercent}
        strokeWidth={ProgressBarCons.strokeWidth}
        strokeColor={ProgressBarCons.strokeColor}
        trackStrokeWidth={ProgressBarCons.trackStrokeWidth}
        trackStrokeColor={ProgressBarCons.trackStrokeColor}
      />
    </div>
  );
}

export default CpuUsage;
