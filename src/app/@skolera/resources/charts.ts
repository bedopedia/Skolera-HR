export const Series: any = [{
    data: [],
    id: "series-6",
    color: "#ffcc80",
    fillColor: {
        stops: [
            [0, 'rgba(255,204,128,0.6)'],
            [1, 'rgba(255,204,128,0)']
        ]
    },
    name: "Parent",
}, {
    data: [],
    id: "series-5",
    color: "#4dd0e1",
    "fillColor": {
        "linearGradient": {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
        },
        "stops": [
            [0, 'rgba(77,208,225,0.5)'],
            [1, 'rgba(77,208,225,0)']
        ]
    },
    name: "Hod",
}, {
    data: [],
    id: "series-4",
    color: "#a058a1",
    "fillColor": {
        "linearGradient": {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
        },
        "stops": [
            [0, 'rgba(160, 88, 161, 0.5)'],
            [1, 'rgba(160, 88, 161, 0)']
        ]
    },
    name: "Student"
}, {
    data: [],
    id: "series-3",
    color: "#ff8a65",
    fillColor: {
        linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
        },
        stops: [
            [0, 'rgba(255, 138, 100,0.47)'],
            [1, 'rgba(255, 190, 158,0)']
        ]
    },
    name: "Teacher"
}];
export const UserStatistics: any = {
    chart: {
        type: 'areaspline',
        height: "300"
    },
    title: {
        text: ''
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    xAxis: {
        categories: [],
        title: {
            text: ''
        },
    },
    loading: false,
    style: {
        fontFamily: '"Lato", sans-serif',
        fontSize: '14px'
    },
    size: {
    },
    plotOptions: {
        series: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: []
            },
        }
    },
    series: Series,
    legend: false
}

export const AssignmentStatistics: any = {
    chart: {
        type: 'areaspline',
        height: "300"
    },
    title: {
        text: ''
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    xAxis: {
        categories: [],
        title: {
            text: ''
        },
    },
    loading: false,
    style: {
        fontFamily: '"Lato", sans-serif',
        fontSize: '14px'
    },
    size: {
    },
    plotOptions: {
        series: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: []
            },
        }
    },
    series: Series,
    legend: false
}


export const DailyActivities: any = {
    chart: {
        type: 'area',
        height: "200"
    },
    title: {
        text: ''
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    xAxis: {
        categories: [],
        title: {
            text: ''
        },
    },
    loading: false,
    style: {
        fontFamily: '"Lato", sans-serif',
        fontSize: '14px'
    },
    size: {
    },
    plotOptions: {

    },
    series: Series,
    legend: false
}
export const PieChart: any = {
    chart: {
        type: 'pie',
        height: "280"

    },
    loading: false,
    style: {
        fontFamily: '"Lato", sans-serif',
        fontSize: '14px',
    },
    size: {
    },
    title: {
        text: `
      <span class="number size-lead">6</span><br>
      <span class="size-tiny steel">Users</span>
    `,
        align: 'center',
        verticalAlign: 'middle',
        y: 0
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: false,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            size: '90%',
            colors: ["#a058a1", "#ffcc80", "#ff8a65", "#4dd0e1"],
            innerSize: '60%',

        },
        series: {
            name: '',
            events: {
                mouseOver: function (e) {
                },
                mouseOut: function () {
                }
            },
            showInLegend: true,
            dataLabels: {
                enabled: false
            },
            states: {
                hover: {
                    enabled: true
                }
            },
        },
    },
    tooltip: {
        useHTML: true,
        formatter: function () {
            return '<b>' + this.point.name + '</b>:' + this.point.y;
        }
    },
    series: [{
        data: []
    }],
    legend: false
}
export const TeacherPerformance: any = {
    chart: {
        type: 'column',
        height: "300"
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: [],
        max: 4
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: []
    },
    scrollbar: {
        enabled: true,
        barBackgroundColor: 'transparent',
        barBorderRadius: 0,
        barBorderWidth: 0,
        buttonBackgroundColor: '#eee',
        buttonBorderWidth: 0,
        buttonBorderRadius: 2,
        trackBackgroundColor: 'none',
        trackBorderWidth: 0,
        size: 20,
        trackBorderRadius: 0,
        trackBorderColor: '#ccc'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Quizzes',
        data: [],
        color: "#fff3e0"
    }, {
        name: 'Contents',
        data: [],
        color: "#7986cb"

    }, {
        name: 'Assignments',
        data: [],
        color: "#ff79a6"
    }],
    credits: {
        enabled: false
    }
}
export const TeacherProgress: any = {
    chart: {
        type: 'column',
        height: "300"
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: [],
        max: 4
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: []
    },
    scrollbar: {
        enabled: true,
        barBackgroundColor: 'transparent',
        barBorderRadius: 0,
        barBorderWidth: 0,
        buttonBackgroundColor: '#eee',
        buttonBorderWidth: 0,
        buttonBorderRadius: 2,
        trackBackgroundColor: 'none',
        trackBorderWidth: 0,
        size: 20,
        trackBorderRadius: 0,
        trackBorderColor: '#CCC'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Quizzes',
        data: [],
        color: "#fff3e0"
    }, {
        name: 'Contents',
        data: [],
        color: "#7986cb"

    }, {
        name: 'Assignments',
        data: [],
        color: "#ff79a6"
    }],
    credits: {
        enabled: false
    }
}