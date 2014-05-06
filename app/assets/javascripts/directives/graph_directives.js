var graphDirectives = angular.module('graphDirectives', []);

graphDirectives.directive('barchart', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      val: '='
    },
    link: function(scope, element, attrs) {
      var svgW = 300;
      var svgH = 650;
      var svg = d3.select(element[0])
        .append("svg")
        .attr("width", svgW)
        .attr("height", svgH);

      scope.$watch('val', function(newVal, oldVal) {

        if (!newVal) {
          return;
        }

        var dataSet = newVal;
        var scale = d3.scale.linear()
          .domain([0, d3.max(dataSet, function(d) {
            return d.value
          })])
          .range([0, svgW]);

        var yMargin = 25,
          xMargin = 43;
        var barchart = svg.selectAll('rect')
          .data(dataSet)
          .enter()
          .append('rect')
          .attr({
            x: xMargin,
            y: function(d, i) {
              return i * 13 + yMargin
            },
            width: function(d) {
              return scale(d.value)
            },
            height: 10
          })
          .attr("fill", function(d) {
            return "#656D78";
            // if (d.key == "東京都") {
            //   return "#DA4453";
            // } else {
            //   return "#656D78";
            // }
          });

        svg.selectAll("text")
          .data(dataSet)
          .enter()
          .append("text")
          .text(function(d) {
            return d.key;
          })
          .attr("y", function(d, i) {
            return i * 13 + yMargin + 10;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "8px")
          .attr("fill", "#434A54");

        var xAxisCall = d3.svg.axis()
          .scale(scale)
          .ticks(5)
          .orient('top');

        var xAxis = svg.append('g')
          .attr({
            "class": "axis",
            "transform": "translate(" + xMargin + "," + 20 + ")"
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "8px")
          .attr("fill", "#434A54")
          .call(xAxisCall);

      });
    }
  }
});
