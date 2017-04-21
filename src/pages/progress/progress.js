var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';
import Chart from 'chart.js';
import { ProfileData } from '../../providers/profile-data';
import { WeightService } from '../../providers/weight-service';
var ProgressPage = (function () {
    function ProgressPage(navCtrl, profileData, weightService, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.profileData = profileData;
        this.weightService = weightService;
        this.alertCtrl = alertCtrl;
        this.data = new Array();
        this.labels = new Array();
        this.weightLogs = this.weightService.getWeightLogs();
        this.weightLogs.subscribe(function (data) {
            _this.weightLogsArray = data;
            console.log(_this.weightLogsArray);
            _this.actualWeight(_this.weightLogsArray);
            _this.prepareChartData(_this.weightLogsArray);
            _this.buildGraph(_this.data, _this.labels);
        });
        this.profileData.getProfileOnce()
            .then(function (prof) { return _this.profile = prof.val(); });
    }
    ProgressPage.prototype.ionViewDidLoad = function () {
    };
    ProgressPage.prototype.logWeight = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Registra tu peso",
            inputs: [{
                    name: "log",
                    type: "number"
                }],
            buttons: [
                { text: 'Cancelar' },
                { text: 'Guardar',
                    handler: function (data) {
                        if (data.log) {
                            _this.weightService.push(data.log, moment().format())
                                .then(function (ret) { return console.log('weight logged', ret.key); }, function (err) { return console.log('error', err); });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    ProgressPage.prototype.actualWeight = function (array) {
        if (data.length) {
            console.log(data.length);
            this.actual = +array[array.length - 1].log;
        }
    };
    ProgressPage.prototype.buildGraph = function (data, labels) {
        if (data.length && labels.length) {
            this.chart = new Chart(this.lineCanvas.nativeElement, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Log de peso",
                            fill: true,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: data,
                            spanGaps: false,
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    }
                }
            });
        }
    };
    ProgressPage.prototype.prepareChartData = function (data) {
        var _this = this;
        this.data = [];
        this.labels = [];
        if (data.length) {
            console.log(data.length);
            data.forEach(function (log) {
                _this.data.push(log.log);
                _this.labels.push(moment(log.timestamp).format('D/M'));
            });
            console.log(this.data, this.labels);
        }
    };
    return ProgressPage;
}());
__decorate([
    ViewChild('lineCanvas'),
    __metadata("design:type", Object)
], ProgressPage.prototype, "lineCanvas", void 0);
ProgressPage = __decorate([
    Component({
        selector: 'page-progress',
        templateUrl: 'progress.html'
    }),
    __metadata("design:paramtypes", [NavController,
        ProfileData,
        WeightService,
        AlertController])
], ProgressPage);
export { ProgressPage };
//# sourceMappingURL=progress.js.map