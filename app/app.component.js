"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var breeze_bridge_angular2_1 = require('breeze-bridge-angular2');
var data_service_1 = require('./data-service');
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var AppComponent = (function () {
    function AppComponent(bridge, _dataService, _changeDetectorRef) {
        this._dataService = _dataService;
        this._changeDetectorRef = _changeDetectorRef;
        this.points = [];
        this.totalRecords = 0;
    }
    AppComponent.prototype.loadPointsLazy = function (event) {
        var _this = this;
        console.log('loadPointsLazy event', event);
        this._dataService.getPagedCollectionPoints(event.first, +event.rows, event.filters).then(function (pagedCollectionPoints) {
            _this.points = pagedCollectionPoints.results;
            _this.totalRecords = pagedCollectionPoints.inlineCount;
            console.log('pagedCollectionPoints', pagedCollectionPoints);
        });
    };
    AppComponent.prototype.checkChanges = function () {
        console.log('has changes', this.hasChanges());
        console.log('changes count', this.getChangesCount());
    };
    AppComponent.prototype.hasChanges = function () {
        return this._dataService.hasChanges();
    };
    AppComponent.prototype.getChangesCount = function () {
        return this._dataService.getChangesCount();
    };
    AppComponent.prototype.showDialogToAdd = function () {
        this.newPoint = true;
        this.point = this._dataService.newCollectionPoint();
        this.displayDialog = true;
    };
    AppComponent.prototype.save = function () {
        if (this.newPoint)
            this.points.push(this.point);
        else
            this.points[this.findSelectedPointIndex()] = this.point;
        this.point = null;
        this.displayDialog = false;
    };
    AppComponent.prototype.delete = function () {
        this.point.entityAspect.setDeleted();
        this.points.splice(this.findSelectedPointIndex(), 1);
        this.point = null;
        this.displayDialog = false;
    };
    AppComponent.prototype.onRowSelect = function (event) {
        this.newPoint = false;
        this.point = event.data;
        //this.point = this.cloneCar(event.data);
        this.displayDialog = true;
    };
    AppComponent.prototype.findSelectedPointIndex = function () {
        return this.points.indexOf(this.selectedPoint);
    };
    AppComponent.prototype.dialog_onAfterHide = function (event) {
        console.log('dialog_onAfterHide', event);
        if (this.newPoint)
            this.point.entityAspect.setDetached();
        else
            this.point.entityAspect.rejectChanges();
    };
    AppComponent.prototype.saveChanges = function () {
        this._dataService.saveAllChanges()
            .then(function (result) { return console.log('SAVE OK', result); })
            .catch(function (error) { return console.log('SAVE ERROR', error); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\n\n    <p-dataTable [value]=\"points\" selectionMode=\"single\" [(selection)]=\"selectedPoint\" (onRowSelect)=\"onRowSelect($event)\" [paginator]=\"true\" rows=\"5\" [responsive]=\"true\" [totalRecords]=\"totalRecords\" (onLazyLoad)=\"loadPointsLazy($event)\" [lazy]=\"true\">\n        <p-column field=\"Id\" header=\"Id\" [sortable]=\"true\"></p-column>\n        <p-column field=\"Name\" header=\"Name\" [editable]=\"true\" [sortable]=\"true\" [filter]=\"true\" filterMatchMode=\"contains\"></p-column>\n        <p-column field=\"Latitiude\" header=\"Latitiude\" [sortable]=\"true\"></p-column>\n        <p-column field=\"Longitude\" header=\"Longitude\" [sortable]=\"true\"></p-column>\n        <p-column field=\"Status\" header=\"Status\" [sortable]=\"true\" [filter]=\"true\" filterMatchMode=\"startsWith\"></p-column>\n        <footer>\n            <div class=\"ui-helper-clearfix\" style=\"width:100%\">\n                <button type=\"button\" pButton icon=\"fa-plus\" style=\"float:left\" (click)=\"showDialogToAdd()\" label=\"Add\"></button>\n                <button type=\"button\" pButton icon=\"fa-floppy-o\" style=\"float:right\" (click)=\"saveChanges()\" label=\"Save Changes\"></button>\n            </div>\n        </footer>\n    </p-dataTable>\n\n    <h3>Changes</h3>\n    Has Changes: {{hasChanges()}} | Change Count: {{getChangesCount()}}\n\n    <p-dialog header=\"Details\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\" (onAfterHide)=\"dialog_onAfterHide($event)\">\n        <div class=\"ui-grid ui-grid-responsive ui-fluid\" *ngIf=\"point\">\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"Name\">Name</label></div>\n                <div class=\"ui-grid-col-8\"><input pInputText id=\"Name\" [(ngModel)]=\"point.Name\" /></div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"Status\">Status</label></div>\n                <div class=\"ui-grid-col-8\"><input pInputText id=\"Status\" [(ngModel)]=\"point.Status\" /></div>\n            </div>\n        </div>\n        <footer>\n            <div class=\"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix\">\n                <button type=\"button\" pButton icon=\"fa-close\" (click)=\"delete()\" label=\"Delete\"></button>\n                <button type=\"button\" pButton icon=\"fa-check\" (click)=\"save()\" label=\"Save\"></button>\n            </div>\n        </footer>\n    </p-dialog>\n\n    ",
            providers: [
                breeze_bridge_angular2_1.BreezeBridgeAngular2,
                http_1.HTTP_PROVIDERS,
                data_service_1.DataService
            ],
            directives: [primeng_1.DataTable, primeng_2.Column, primeng_1.Dialog, primeng_1.Header, primeng_1.Footer, primeng_1.Button]
        }), 
        __metadata('design:paramtypes', [breeze_bridge_angular2_1.BreezeBridgeAngular2, data_service_1.DataService, core_1.ChangeDetectorRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map