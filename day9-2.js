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

Graph.prototype.walkPaths = function() {
  let visited = new Set();
  let distances = [];

  let subroutine = (city, sum) => {
    sum = sum == null ? 0 : sum;
    let options = this.getUnvisitedEdges(city, visited);
    if (Object.keys(options).length === 0) {
      distances.push(sum);
    } else {
      visited.add(city);
      for (let toCity in options) {
        subroutine(toCity, sum + options[toCity]);
      }
      visited.delete(city);
    }
  };

  let cities = Object.keys(this.nodes);
  cities.forEach(city => {
    subroutine(city);
  });

  return distances;
};

Graph.prototype.getUnvisitedEdges = function(city, visited) {
  return filterObj(this.nodes[city].edges, (dist, toCity) => {
    return !visited.has(toCity);
  });
};

function mapObj(obj, fn) {
  let keys = Object.keys(obj);
  return keys.map(key => {
    fn(obj[key], key);
  });
}

function filterObj(obj, fn) {
  let keys = Object.keys(obj);
  let out = {};
  for (let key of keys) {
    if (fn(obj[key], key)) out[key] = obj[key];
  }
  return out;
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

let distances = graph.walkPaths();
let longestPath = distances.reduce(function(largest, dist) {
  return Math.max(largest, dist);
}, 0);

process.stdout.write(longestPath.toString());
