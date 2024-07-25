var urlPath = $("#urlPath").val();
var donutData = {
    labels: [
        'Chrome',
        'IE',
        'FireFox',
        'Safari',
        'Opera',
        'Navigator',
    ],
    datasets: [
        {
            data: [700, 500, 400, 600, 300, 100],
            backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
        }
    ]
}
var pieData = {}
$(document).ready(function () {
    $("#ddYear").val(new Date().getFullYear())
    console.log(new Date().getMonth() + 1)
    $("#ddMonth").val(new Date().getMonth() + 1)
    $("#ddSite").val($("#site").val())

    thumbnail();
    getGraphStatus();

    var areaChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Digital Goods',
                backgroundColor: 'rgba(60,141,188,0.9)',
                borderColor: 'rgba(60,141,188,0.8)',
                pointRadius: false,
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data: [28, 48, 40, 19, 86, 27, 90]
            },
            {
                label: 'Electronics',
                backgroundColor: 'rgba(210, 214, 222, 1)',
                borderColor: 'rgba(210, 214, 222, 1)',
                pointRadius: false,
                pointColor: 'rgba(210, 214, 222, 1)',
                pointStrokeColor: '#c1c7d1',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
        ]
    }


    //-------------
    //- DONUT CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var donutChartCanvas = $('#donutChart').get(0).getContext('2d')

    var donutOptions = {
        maintainAspectRatio: false,
        responsive: true,
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    new Chart(donutChartCanvas, {
        type: 'doughnut',
        data: donutData,
        options: donutOptions
    })

    //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas = $('#barChart').get(0).getContext('2d')
    var barChartData = $.extend(true, {}, areaChartData)
    var temp0 = areaChartData.datasets[0]
    var temp1 = areaChartData.datasets[1]
    barChartData.datasets[0] = temp1
    barChartData.datasets[1] = temp0

    var barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        datasetFill: false
    }

    new Chart(barChartCanvas, {
        type: 'bar',
        data: barChartData,
        options: barChartOptions
    })

})

$("#btnSearch").click(function () {
    getGraphStatus()
})

function thumbnail() {
    $.ajax({
        url: urlPath + "/itsm/api/home/getthumbnail",
        type: 'POST',
        dataType: "json",
        cache: false,
        //data: JSON.stringify({ model: S_DATA }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            console.log(res);
            document.getElementById("assetValue").innerHTML = res.responseJSON.Value.total_asset;
            document.getElementById("reqValue").innerHTML = res.responseJSON.Value.total_request_outstanding;
            document.getElementById("licenseValue").innerHTML = res.responseJSON.Value.license_exp;
        }
    })
}

function getGraphStatus() {

    $.ajax({
        url: urlPath + "/itsm/api/home/get/graph/status",
        type: 'POST',
        dataType: "json",
        cache: false,
        data: JSON.stringify({
            site: $("#ddSite").val(),
            year: $("#ddYear").val(),
            month: $("#ddMonth").val()
        }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            console.log(res);
            //pieData = {
            //    labels: res.responseJSON.Value.status_desc,
            //    datasets: [
            //        {
            //            data: res.responseJSON.Value.total_status,
            //            backgroundColor: ['#FA8072', '#DC143C', '#FF8C00', '#DA70D6', '#7CFC00', '#4682B4', '#D2B48C', '#A9A9A9'],
            //        }
            //    ]
            //}

            ////-------------
            ////- PIE CHART -
            ////-------------
            //// Get context with jQuery - using jQuery's .get() method.
            //var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
            //var pieOptions = {
            //    maintainAspectRatio: false,
            //    responsive: true,
            //}
            ////Create pie or douhnut chart
            //// You can switch between pie and douhnut using the method below.
            //new Chart(pieChartCanvas, {
            //    type: 'pie',
            //    data: pieData,
            //    options: pieOptions
            //})

            pieChart = echarts.init(document.getElementById('pieChart'))

            option = {
                //title: {
                //    text: 'Status Aset ' + res.responseJSON.Value.site_status + " " + res.responseJSON.Value.year_status + "-" + res.responseJSON.Value.month_name,
                //    left: 'center'
                //},
                tooltip: {
                    show: true,
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    top: '15%'
                },
                series: [
                    {
                        name: 'Status Aset',
                        left: '20%',
                        top: '5%',
                        type: 'pie',
                        radius: '70%',
                        data: res.responseJSON.Value.statusVal.map(obj => {
                            return { value: obj.total_status, name: obj.status_desc };
                        }),
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                    }
                ],
                textStyle: {
                    fontSize: 8
                }
            };
            pieChart.setOption(option, true);

            new ResizeObserver(() => pieChart.resize()).observe(container);
        }
    })
}

