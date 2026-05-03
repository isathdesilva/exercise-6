const drawHistogram = data => {

  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%");

  const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const bins = binGenerator(data);

  const minEng = bins[0].x0;
  const maxEng = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);

  console.log(minEng, maxEng, binsMaxLength);
  console.log(bins);

  xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

  yScale
    .domain([0, binsMaxLength])
    .nice()
    .range([innerHeight, 0]);

  innerChart.selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("class", "hist-bar")
      .attr("x",      d => xScale(d.x0))
      .attr("y",      d => yScale(d.length))
      .attr("width",  d => xScale(d.x1) - xScale(d.x0))
      .attr("height", d => innerHeight - yScale(d.length))
      .attr("stroke", bodyBackgroundColor)
      .attr("stroke-width", 2);

  innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));

  innerChart.append("g")
    .call(d3.axisLeft(yScale));

  innerChart.append("text")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 42)
    .attr("text-anchor", "middle")
    .text("Labeled Energy Consumption (kWh/year)");

  innerChart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", -55)
    .attr("text-anchor", "middle")
    .text("Frequency");
};
