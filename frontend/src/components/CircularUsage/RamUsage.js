import React, {useState} from 'react'
import ProgressBar from "../ProgressBar/index.js";

// importing styles and constants
import "./styles.css";
import {ProgressBarCons} from '../../config/Constants.js'

const RamUsage = () => {
  const [memUsed, setMemUsed] = useState(null);
  const [memPercent, setMemPercent] = useState(null);

  const gbFact = 1073741824;

	window.wails.Events.On("cpu_stats", cpu_stats => {
    if (cpu_stats) {
      const total = (cpu_stats.Mem.total/gbFact).toPrecision(2);
      const used = (cpu_stats.Mem.used/gbFact).toPrecision(2);
      const percent = (cpu_stats.Mem.usedPercent).toPrecision(2);
      const usedString = `${used} / ${total} GB `;
      setMemUsed(usedString);
      setMemPercent(percent);
    }
  })

  return (
    <div className="CircularUsageWrapper">
      <div className="CircularUsageInfoContainer">
        <h1 className="PrimaryText CircularUsageTitle">RAM</h1>
        <p className="SecondaryText CircularUsageSubContent">{memUsed}</p>
      </div>
      <ProgressBar
        progress={memPercent}
        strokeWidth={ProgressBarCons.strokeWidth}
        strokeColor={ProgressBarCons.strokeColor}
        trackStrokeWidth={ProgressBarCons.trackStrokeWidth}
        trackStrokeColor={ProgressBarCons.trackStrokeColor}
      />
    </div>
  );
}

export default RamUsage;
