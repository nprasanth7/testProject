// Code goes here

angular.module('myApp', [])
        .controller('MainController', function($scope, $http){
            $scope.showDirective = false;
            $http.get('weather.json').then(function(response){
                $scope.chartData = response.data.weather;
                $scope.showDirective = true;
            });
        })
        .directive('myChart', function(){
            return {
                restrict: 'E',
                scope: {
                  data: '='
                },
                template: '<div>{{test}}</div><div id="container"></div>',
                link: function(scope, elm, attr){
                    Highcharts.chart('container', {
                        chart: {
                            type: 'line'
                        },
                        xAxis: {
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        },
                        legend: {
                            layout: 'vertical',
                            floating: true,
                            backgroundColor: '#FFFFFF',
                            align: 'right',
                            verticalAlign: 'top',
                            y: 60,
                            x: -60
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    this.x + ': ' + this.y;
                            }
                        },
                        series: scope.data
                    });
                }
            }
        });