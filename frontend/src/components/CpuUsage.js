import React, { useState } from 'react';

function HelloWorld() {
	const [result, setResult] = useState(null);

	window.wails.Events.On("cpu_stats", cpu_stats => {
    if (cpu_stats) {
      setResult(cpu_stats.Mem.total)
    }
  })

	return (
		<div className="App">
      <p>uso de cpu {result}%</p>
		</div>
	);
}

export default HelloWorld;
