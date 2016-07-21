import { Component, ChangeDetectorRef } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { BreezeBridgeAngular2 } from 'breeze-bridge-angular2';
import { DataService} from './data-service';
import { CollectionPoint } from './models/breeze-models';
import {DataTable, Dialog, Header, Footer, Button} from 'primeng/primeng';
import {Column} from 'primeng/primeng';

@Component({
    selector: 'my-app',
    template: `


    <p-dataTable [value]="points" selectionMode="single" [(selection)]="selectedPoint" (onRowSelect)="onRowSelect($event)" [paginator]="true" rows="5" [responsive]="true" [totalRecords]="totalRecords" (onLazyLoad)="loadPointsLazy($event)" [lazy]="true">
        <p-column field="Id" header="Id" [sortable]="true"></p-column>
        <p-column field="Name" header="Name" [editable]="true" [sortable]="true" [filter]="true" filterMatchMode="contains"></p-column>
        <p-column field="Latitiude" header="Latitiude" [sortable]="true"></p-column>
        <p-column field="Longitude" header="Longitude" [sortable]="true"></p-column>
        <p-column field="Status" header="Status" [sortable]="true" [filter]="true" filterMatchMode="startsWith"></p-column>
        <footer>
            <div class="ui-helper-clearfix" style="width:100%">
                <button type="button" pButton icon="fa-plus" style="float:left" (click)="showDialogToAdd()" label="Add"></button>
                <button type="button" pButton icon="fa-floppy-o" style="float:right" (click)="saveChanges()" label="Save Changes"></button>
            </div>
        </footer>
    </p-dataTable>

    <h3>Changes</h3>
    Has Changes: {{hasChanges()}} | Change Count: {{getChangesCount()}}

    <p-dialog header="Details" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true" (onAfterHide)="dialog_onAfterHide($event)">
        <div class="ui-grid ui-grid-responsive ui-fluid" *ngIf="point">
            <div class="ui-grid-row">
                <div class="ui-grid-col-4"><label for="Name">Name</label></div>
                <div class="ui-grid-col-8"><input pInputText id="Name" [(ngModel)]="point.Name" /></div>
            </div>
            <div class="ui-grid-row">
                <div class="ui-grid-col-4"><label for="Status">Status</label></div>
                <div class="ui-grid-col-8"><input pInputText id="Status" [(ngModel)]="point.Status" /></div>
            </div>
        </div>
        <footer>
            <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
                <button type="button" pButton icon="fa-close" (click)="delete()" label="Delete"></button>
                <button type="button" pButton icon="fa-check" (click)="save()" label="Save"></button>
            </div>
        </footer>
    </p-dialog>

    `,
    providers: [
        BreezeBridgeAngular2,
        HTTP_PROVIDERS,
        DataService
    ],
    directives: [DataTable, Column, Dialog, Header, Footer, Button]
})
export class AppComponent {

    public points: Array<CollectionPoint> = [];
    public selectedPoint: CollectionPoint;
    public displayDialog: boolean;
    public point: CollectionPoint;
    public newPoint: boolean;
    public totalRecords: number = 0;

    constructor(
        bridge: BreezeBridgeAngular2,
        private _dataService: DataService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {

    }


    loadPointsLazy(event): void {
        console.log('loadPointsLazy event', event);
        this._dataService.getPagedCollectionPoints(event.first, +event.rows, event.filters).then((pagedCollectionPoints) => {
            this.points = pagedCollectionPoints.results;
            this.totalRecords = pagedCollectionPoints.inlineCount;
            console.log('pagedCollectionPoints', pagedCollectionPoints);
        });
    }

    checkChanges(): void {
        console.log('has changes', this.hasChanges());
        console.log('changes count', this.getChangesCount());
    }

    hasChanges(): boolean {
        return this._dataService.hasChanges();
    }

    getChangesCount(): number {
        return this._dataService.getChangesCount();
    }


    showDialogToAdd() {
        this.newPoint = true;
        this.point = this._dataService.newCollectionPoint();
        this.displayDialog = true;
    }

    save() {
        if (this.newPoint)
            this.points.push(this.point);
        else
            this.points[this.findSelectedPointIndex()] = this.point;

        this.point = null;
        this.displayDialog = false;
    }

    delete() {
        this.point.entityAspect.setDeleted();
        this.points.splice(this.findSelectedPointIndex(), 1);
        this.point = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newPoint = false;
        this.point = event.data;
        //this.point = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    findSelectedPointIndex(): number {
        return this.points.indexOf(this.selectedPoint);
    }

    dialog_onAfterHide(event) {
        console.log('dialog_onAfterHide', event);
        if (this.newPoint)
            this.point.entityAspect.setDetached();
        else
            this.point.entityAspect.rejectChanges();
    }

    saveChanges() {
        this._dataService.saveAllChanges()
            .then((result) => console.log('SAVE OK', result))
            .catch((error) => console.log('SAVE ERROR', error));
    }
}
