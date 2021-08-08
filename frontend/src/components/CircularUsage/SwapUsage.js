import React, {useState} from 'react'
import ProgressBar from "../ProgressBar/index.js";

// importing styles and constants
import "./styles.css";
import {ProgressBarCons} from '../../config/Constants.js'

const SwapUsage = () => {
  const [swapUsed, setSwapUsed] = useState(null);
  const [swapPercent, setSwapPercent] = useState(null);

  const gbFact = 1073741824;

	window.wails.Events.On("cpu_stats", cpu_stats => {
    if (cpu_stats) {
      const total = (cpu_stats.Swap.total/gbFact).toPrecision(2);
      const used = (cpu_stats.Swap.used/gbFact).toPrecision(2);
      const percent = (cpu_stats.Swap.usedPercent).toPrecision(2);
      const usedString = `${used} / ${total} GB `;
      setSwapUsed(usedString);
      setSwapPercent(percent);
    }
  })

  return (
    <div className="CircularUsageWrapper">
      <div className="CircularUsageInfoContainer">
        <h1 className="PrimaryText CircularUsageTitle">SWAP</h1>
        <p className="SecondaryText CircularUsageSubContent">{swapUsed}</p>
      </div>
      <ProgressBar
        progress={swapPercent}
        strokeWidth={ProgressBarCons.strokeWidth}
        strokeColor={ProgressBarCons.strokeColor}
        trackStrokeWidth={ProgressBarCons.trackStrokeWidth}
        trackStrokeColor={ProgressBarCons.trackStrokeColor}
      />
    </div>
  );
}

export default SwapUsage;
