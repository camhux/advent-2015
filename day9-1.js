'use strict';
let fs = require('fs');

let input = fs.readFileSync(process.argv[2], {encoding: 'utf8'}).split('\n');

let parseLine = function(line) {
  let temp = line.split(' = ');
  let cities = temp[0].split(' to ');
  let distance = parseInt(temp[1], 10);

  return [cities, distance];
};

let Graph = function() {
  this.nodes = {};
};

Graph.prototype.addEdge = function(data) {
  let cityA = data[0][0];
  let cityB = data[0][1];
  let distance = data[1];

  this.nodes[cityA] = this.nodes[cityA] || {edges: {}};
  this.nodes[cityA].edges[cityB] = distance;

  this.nodes[cityB] = this.nodes[cityB] || {edges: {}};
  this.nodes[cityB].edges[cityA] = distance;
};

Graph.prototype.pathFrom = function(fromCity) {
  let visited = new Set();
  let dist = 0;
  let node = this.nodes[fromCity];

  visited.add(fromCity);

  while (visited.size < this.size) {
    let nearestEdge = getNearestUnvisitedEdge(node.edges, visited);
    dist += node.edges[nearestEdge];
    visited.add(nearestEdge);
    node = this.nodes[nearestEdge];
  }

  return dist;

};

function getNearestUnvisitedEdge(edges, visited) {
  let keys = Object.keys(edges).filter(key => !visited.has(key));
  let nearestEdge = keys[0];
  let leastDist = edges[keys[0]];

  for (let i = 1; i < keys.length; i++) {
    let key = keys[i];
    let dist = edges[key];

    if (dist < leastDist) {
      leastDist = dist;
      nearestEdge = key;
    }
  }

  return nearestEdge;
}

Object.defineProperty(Graph.prototype, 'size', {
  get() {
    return Object.keys(this.nodes).length;
  }
});

// main
let lines = input.map(parseLine);
let graph = new Graph();

lines.forEach(graph.addEdge.bind(graph));

let cities = Object.keys(graph.nodes);

let shortestPath = cities.reduce(function(leastDist, city) {
  let dist = graph.pathFrom(city);
  if (dist < leastDist) leastDist = dist;
  return leastDist;
}, Infinity);

process.stdout.write(shortestPath.toString());
