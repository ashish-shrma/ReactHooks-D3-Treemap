import React, { useRef, useEffect } from 'react';
import { select } from 'd3';
import './Legend.styles.scss';
const Legend = ({ height }) => {
  const ref = useRef();
  const categoryList = [
    'Work',
    'Recreation',
    'Socializing',
    'Health',
    'Chores',
    'Learning',
  ];

  let color = [
    '#17A398',
    '#9BBDF9',
    '#B95A89',
    '#3C4F76',
    '#F19953',
    '#D4DF9E',
  ];
  useEffect(() => {
    const svg = select(ref.current).attr('height', height);
    categoryList.map((category, idx) => {
      svg
        .append('text')
        .attr('x', 30)
        .attr('y', (idx + 1) * 30)
        .text(category)
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');
      svg
        .append('circle')
        .attr('cx', 10)
        .attr('cy', (idx + 1) * 30)
        .attr('r', 6)
        .style('fill', color[idx]);
    });
  }, []);
  return <svg ref={ref}></svg>;
};
export default Legend;
