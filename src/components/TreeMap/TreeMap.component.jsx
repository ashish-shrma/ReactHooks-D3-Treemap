import {
  select,
  scaleLinear,
  scaleOrdinal,
  hierarchy,
  treemapResquarify,
  treemap,
} from 'd3';
import React, { useRef, useEffect } from 'react';

function TreeMap({ width, height, data }) {
  const ref = useRef();

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const svg = select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .style('border', '1px solid black');

    // Give the data to this cluster layout:
    // var root = d3.hierarchy(data).sum(function (d) {
    //   return d.value;

    // });

    let dataAggregated = hierarchy(data)
      .sum((d) => d.value)
      .sort(function (a, b) {
        return b.height - a.height || b.value - a.value;
      });

    let layout = treemap()
      .tile(treemapResquarify)
      .size([width, height])
      .paddingInner(3);

    let rootWithLayout = layout(dataAggregated);

    let x = scaleLinear().domain([0, width]).range([0, width]);

    let y = scaleLinear().domain([0, height]).range([50, height]);

    let color = scaleOrdinal().range([
      '#17A398',
      '#9BBDF9',
      '#B95A89',
      '#3C4F76',
      '#F19953',
      '#D4DF9E',
    ]);

    const update = () => {
      let selparent = dataAggregated;

      let nodes = svg.selectAll('.node').data(rootWithLayout.leaves());
      console.log(selparent.children);

      nodes
        .enter()
        .append('rect')
        .attr('class', 'node')
        .merge(nodes)
        .on('click', function (event, d) {
          selparent = d.parent.parent; //remove?
          x.domain([d.parent.x0, d.parent.x0 + d.parent.x1 - d.parent.x0]);
          y.domain([d.parent.y0, d.parent.y0 + d.parent.y1 - d.parent.y0]);
          update();
        }) /// might not be working because d3 changed shit
        .transition()
        .duration(750)
        .attr('x', (d) => x(d.x0))
        .attr('y', (d) => y(d.y0))
        .attr('width', (d) => x(d.x1) - x(d.x0))
        .attr('height', (d) => y(d.y1) - y(d.y0))
        .attr('title', (d) => d.name)
        // .style('fill', (d) => c(d.parent ? d.parent.data.name : d.data.name));
        .style('fill', (d) =>
          color(d.parent ? d.parent.data.name : d.data.name)
        );

      let parent = svg.selectAll('#parent').data(['']);

      parent
        .enter()
        .append('rect')
        .attr('id', 'parent')
        .merge(parent)
        .on('click', function () {
          x.domain([selparent.x0, selparent.x1 - selparent.x0]);
          y.domain([selparent.y0, selparent.y1 - selparent.y0]);
          update();
        })
        .style('fill', '#363736')
        .transition()
        .duration(750)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', y.range()[0] - 1);
    };
    update();
  };

  return (
    <div className="chart">
      <svg ref={ref}>
        <g></g>
      </svg>
    </div>
  );
}

export default TreeMap;
