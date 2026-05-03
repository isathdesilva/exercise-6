d3.csv("data/Ex6_TVdata_withStar.csv", d => {
  return {
    brand:             d.brand,
    model:             d.model,
    screenSize:        +d.screenSize,
    screenTech:        d.screenTech,
    star:              +d.star,
    energyConsumption: +d.energyConsumption
  };
}).then(data => {

  console.log(data);

  colorScale
    .domain([...new Set(data.map(d => d.screenTech))])
    .range(d3.schemeCategory10);

  drawHistogram(data);
  populateFilters(data);
  drawScatterplot(data);
  createTooltip();
  handleMouseEvents();

}).catch(error => {
  console.error("Error loading the CSV file:", error);
});
