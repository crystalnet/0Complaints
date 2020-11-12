import {Component, ElementRef, OnInit, QueryList, ViewChild} from '@angular/core';
import {TaskService} from '../../services/task/task.service';
import {Task} from '../../model/task';
import Chart from 'chart.js';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'app-admin-dashboard-analytics',
    templateUrl: './admin-dashboard-analytics.page.html',
    styleUrls: ['./admin-dashboard-analytics.page.scss'],
})
export class AdminDashboardAnalyticsPage implements OnInit {

    constructor(private taskService: TaskService, private userService: UserService) {
        this.generateData1();
        this.generateData2();
        console.log('sdf');
    }

    @ViewChild('chart1') chart1Element: ElementRef;
    @ViewChild('chart2') chart2Element: ElementRef;
    @ViewChild('chart3') chart3Element: ElementRef;
    @ViewChild('chart4') chart4Element: ElementRef;

    chart1: any;
    chart2: any;
    chart3: any;
    chart4: any;

    ngOnInit() {
    }

    generateData1() {
        this.userService.getUsergroup().then(group => {
            this.taskService.getAllAvailableTasks(group).subscribe(tasks => {
                const typeLabels = Object.keys(Task.types);
                const completed = new Array(typeLabels.length).fill(0);
                const open = new Array(typeLabels.length).fill(0);
                for (const task of tasks) {
                    const index = typeLabels.indexOf(task.type);
                    if (task.done) {
                        completed[index] += 1;
                    } else {
                        open[index] += 1;
                    }
                }
                this.plot1(typeLabels, open, completed);
            });
        });
    }

    plot1(labels, values1, values2) {
        if (this.chart1) {
            this.chart1.destroy();
        }

        const ctx = this.chart1Element.nativeElement;

        this.chart1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Open',
                        data: values1,
                        backgroundColor: '#F61067', // array should have same number of elements as number of dataset
                        borderColor: '#F61067', // array should have same number of elements as number of dataset
                        borderWidth: 1,
                        cubicInterpolationMode: 'monotone'
                    },
                    {
                        label: 'Done',
                        data: values2,
                        backgroundColor: '#6DECAF', // array should have same number of elements as number of dataset
                        borderColor: '#6DECAF', // array should have same number of elements as number of dataset
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Task Type'
                        },
                        /*type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'DD'
                            }
                        },*/
                        barPercentage: 0.9,
                        gridLines: {
                            display: false
                        },
                        stacked: true
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Frequency'
                        },
                        stacked: true
                    }]
                }
            }
        });
        this.chart1.update();
    }

    generateData2() {
        this.userService.getUsergroup().then(group => {
            this.taskService.getAllFinishedTasks(group).subscribe(tasks => {
                const typeLabels = Object.keys(Task.types);
                const values = new Array(typeLabels.length).fill(0);
                for (const task of tasks) {
                    const index = typeLabels.indexOf(task.type);
                    values[index] += 1;
                }
                this.plot2(typeLabels, values);
            });
        });
    }

    plot2(labels, values) {
        if (this.chart2) {
            this.chart2.destroy();
        }

        const ctx = this.chart2Element.nativeElement;

        this.chart2 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Finished tasks',
                        data: values,
                        backgroundColor: '#F61067', // array should have same number of elements as number of dataset
                        borderColor: '#F61067', // array should have same number of elements as number of dataset
                        borderWidth: 1,
                        cubicInterpolationMode: 'monotone'
                    },
                    // {
                    //     label: 'vigorous',
                    //     data: this.progressChartData.via,
                    //     backgroundColor: '#6DECAF', // array should have same number of elements as number of dataset
                    //     borderColor: '#6DECAF', // array should have same number of elements as number of dataset
                    //     borderWidth: 1
                    // }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Task Type'
                        },
                        /*type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'DD'
                            }
                        },*/
                        barPercentage: 0.9,
                        gridLines: {
                            display: false
                        },
                        stacked: true
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Frequency'
                        },
                        stacked: true
                    }]
                }
            }
        });
        this.chart1.update();
    }
}
