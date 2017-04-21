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
var ElasticTextarea = (function () {
    function ElasticTextarea() {
        this.content = "";
        this.lineHeight = "22px";
    }
    ElasticTextarea.prototype.ngAfterViewInit = function () {
        this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
        this.txtArea.style.height = this.lineHeight + "px";
    };
    ElasticTextarea.prototype.onChange = function (newValue) {
        this.txtArea.style.height = this.lineHeight + "px";
        this.txtArea.style.height = this.txtArea.scrollHeight + "px";
    };
    ElasticTextarea.prototype.clearInput = function () {
        this.content = "";
        this.txtArea.style.height = this.lineHeight + "px";
    };
    return ElasticTextarea;
}());
__decorate([
    ViewChild('ionTxtArea'),
    __metadata("design:type", Object)
], ElasticTextarea.prototype, "ionTxtArea", void 0);
ElasticTextarea = __decorate([
    Component({
        selector: 'elastic-textarea',
        inputs: ['placeholder', 'lineHeight'],
        template: "\n  <ion-textarea class=\"textArea\" #ionTxtArea\n    placeholder='{{placeholder}}'\n    [(ngModel)]=\"content\"\n    (ngModelChange)='onChange($event)'>\n  </ion-textarea>\n  ",
        styles: ["\n    .textArea {\n      background-color: white;\n      border-radius: 10px;\n    }\n    \n    textarea {\n      height: 22px;\n      padding-left: 1vh;\n      padding-top: 0.5vh;\n      margin-top: 1vh;\n      margin-bottom: 1vh;\n      margin-left: 8px;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [])
], ElasticTextarea);
export { ElasticTextarea };
//# sourceMappingURL=elastic-text-area.component.js.map