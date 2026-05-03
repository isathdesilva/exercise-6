const drawScatterplot = data => {

  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%");

  innerChartS = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  xScaleS
    .domain([d3.min(data, d => d.star) - 0.5, d3.max(data, d => d.star) + 0.5])
    .range([0, innerWidth]);

  yScaleS
    .domain([0, d3.max(data, d => d.energyConsumption)])
    .nice()
    .range([innerHeight, 0]);

  innerChartS.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScaleS));

  innerChartS.append("g")
    .call(d3.axisLeft(yScaleS));

  innerChartS.append("text")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 42)
    .attr("text-anchor", "middle")
    .text("Star Rating");

  innerChartS.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", -55)
    .attr("text-anchor", "middle")
    .text("Labeled Energy Consumption (kWh/year)");

  innerChartS.selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx",   d => xScaleS(d.star))
      .attr("cy",   d => yScaleS(d.energyConsumption))
      .attr("r", 5)
      .attr("fill", d => colorScale(d.screenTech));

  // Legend inside SVG — top right corner
  const legend = innerChartS.append("g")
    .attr("transform", `translate(${innerWidth - 100}, ${margin.top})`);

  colorScale.domain().forEach((tech, i) => {
    const legendRow = legend.append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    legendRow.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", colorScale(tech));

    legendRow.append("text")
      .attr("x", 14)
      .attr("y", 10)
      .style("font-size", "11px")
      .text(tech);
  });
};
