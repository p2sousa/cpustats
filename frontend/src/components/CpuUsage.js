import React, { useState } from 'react';

function HelloWorld() {
	const [result, setResult] = useState(null);

	window.wails.Events.On("cpu_usage", cpu_usage => {
    if (cpu_usage) {
      setResult(cpu_usage.avg)
    }
  })

	return (
		<div className="App">
      <p>uso de cpu {result}%</p>
		</div>
	);
}

export default HelloWorld;
