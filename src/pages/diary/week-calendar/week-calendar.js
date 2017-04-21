var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
var WeekCalendarComponent = (function () {
    function WeekCalendarComponent() {
        this.selectedDay = new EventEmitter();
        this.buildWeek();
    }
    WeekCalendarComponent.prototype.select = function (day) {
        this.selected = day.date;
        this.selectedDay.emit(day);
    };
    ;
    WeekCalendarComponent.prototype.next = function () {
        var next = this.selected.clone();
        this.removeTime(next.week(next.week() + 1)).day(0);
        this.selected.week(this.selected.week() + 1);
        this.buildWeek(next);
    };
    ;
    WeekCalendarComponent.prototype.previous = function () {
        var next = this.selected.clone();
        this.removeTime(next.week(next.week() - 1)).day(0);
        this.selected.week(this.selected.week() - 1);
        this.buildWeek(next);
    };
    ;
    WeekCalendarComponent.prototype.removeTime = function (date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    };
    WeekCalendarComponent.prototype.buildWeek = function (start) {
        if (!start) {
            start = moment();
        }
        var first = this.removeTime(start);
        this.weekDays = [];
        var date = first.clone();
        for (var i = 0; i < 7; i++) {
            this.weekDays.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
    };
    return WeekCalendarComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], WeekCalendarComponent.prototype, "selected", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], WeekCalendarComponent.prototype, "selectedDay", void 0);
WeekCalendarComponent = __decorate([
    Component({
        selector: 'week-calendar',
        templateUrl: 'week-calendar.html'
    }),
    __metadata("design:paramtypes", [])
], WeekCalendarComponent);
export { WeekCalendarComponent };
//# sourceMappingURL=week-calendar.js.map