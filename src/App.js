import React, { Component } from 'react';
import * as d3 from "d3";
import { birthData } from "./birthData2011";

import './App.css';

class App extends Component {

	componentDidMount(){
		const height = 600;
		const width = 600;
		const padding = 50;

		const yScale = d3.scaleLinear()
		                 .domain(d3.extent(birthData, d => d.lifeExpectancy))
										 .range([height-padding, padding])

	  const xScale = d3.scaleLinear()
		                 .domain(d3.extent(birthData, d => d.births / d.population))
										 .range([padding, width-padding])

		const colorScale = d3.scaleLinear()
		                     .domain(d3.extent( birthData, d => d.population / d.area))
												 .range(["#08b7ff", "#ff3333"])

		const radiusScale = d3.scaleLinear()
		                      .domain(d3.extent(birthData, d => d.births))
													.range([3, 45])

    const xAxis = d3.axisBottom(xScale)
		                .tickSize(-height + 2 * padding)
										.tickSizeOuter(0)

		const yAxis = d3.axisLeft(yScale)
										.tickSize(-width + 2 * padding)
										.tickSizeOuter(0)

		d3.select("svg")
		  .append("g")
			  .attr("transform", `translate(0, ${ height - padding })`)
			  .call(xAxis);

		d3.select("svg")
		  .append("g")
			.attr("transform", `translate(${ padding }, 0)`)
			.call(yAxis)

    d3.select("svg")
		    .attr("width", width)
			  .attr("height", height)
				// .style("border", "1px solid")
			.selectAll("circle")
			.data(birthData)
			.enter()
			.append("circle")
			  .attr("cx", d => xScale(d.births / d.population))
				.attr("cy", d => yScale(d.lifeExpectancy))
				.attr("r", d => radiusScale(d.births))
				.attr("fill", d => colorScale(d.population / d.area))
				.attr("opacity", .7)

		// x axis label
		d3.select("svg")
		  .append("text")
			  .attr("x", width / 2)
				.attr("y", height - padding)
				.attr("dy", "2rem")
				.style("text-anchor", "middle")
				.text("Birth per Capita")

		// y axis label
		d3.select("svg")
		  .append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("x", -height / 2)
				.attr("y", 0)
				.attr("dy", "1.5rem")
				.style("text-anchor", "middle")
				.text("Life Expectancy")

		// Title of the graph
		d3.select("svg")
		  .append("text")
			  .attr("x", width / 2)
				.attr("y", 0)
				.attr("dy", "1.5rem")
				.style("text-anchor", "middle")
				.text("Data on Births by Country in 2011")
				.style("font-size", "1.4rem")
				.style("font-weight", "bold")
	}

  render() {
    return (
      <div className="container">
				<h1>D3.JS</h1>
				<svg></svg>
      </div>
    );
  }
}

export default App;
