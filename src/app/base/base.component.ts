import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmailEditorComponent, UnlayerExport, UnlayerOptions } from 'src/app/email-editor/public_api';

import { DownloadService } from './download.service';

import { SampleDesign } from 'src/app/sample.design';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  ngOnInit() { }
  constructor() { }

  @ViewChild('export')
  editorExport: UnlayerExport;

  @ViewChild('editor')
  private editorComponent: EmailEditorComponent;

  options: UnlayerOptions = {};
  mergeKeys: String[] = [];


  loadPrudential() {
    this.editorComponent.editor.loadDesign(SampleDesign.designVacation);
  }

  loadBSL() {
    this.editorComponent.editor.loadDesign(SampleDesign.bslDesign);
  }

  editorLoaded(event) {
    this.editorComponent.editor.loadDesign(SampleDesign.bslDesign);
  }

  saveDesign() {
    this.editorComponent.editor.saveDesign(
      (data) => DownloadService.downloadFile(data, '.JSON')
    );
  }

  exportHtml() {
    let baseComponent: any = this;
    this.editorComponent.editor.exportHtml(
      (data: UnlayerExport, baseComponent) => {
        DownloadService.downloadFile(data.html as String, '.HTML');
      }
    );

  }

  exportedHtml: String;

  merge() {
    var self = this;
    self.editorComponent.editor.exportHtml(function (exported: UnlayerExport) {
      var json = exported.design; // design json
      var html = exported.html; // final html
      self.exportedHtml = html as String;


      var res = self.exportedHtml;
      var keys = [];

      for (let k in Merge.sampleData) {
        keys.push(k);
        console.log(Merge.sampleData[k]);
        console.log('{{' + k + '}}');
        res = res.replace('{{' + k + '}}', Merge.sampleData[k]);
      }
      DownloadService.downloadFile(res, '.HTML');
    });
  }

  //TODO: merge using callbacks
  // merge() {

  //   var json = data.design; // design json
  //       var html = data.html; // final html
  //         self.exportedHtml = html as String;
  //       var res = self.exportedHtml.replace("{{first_name}}", "Kanika");

  //   let self = this;

  //   this.editorComponent.editor.exportHtml(
  //     (data: UnlayerExport) => {

  //       var json = data.design; // design json
  //       var html = data.html; // final html

  //       let designString = data.html as String;
  //       for (let k in Merge.sampleData) {
  //         designString.replace(k, Merge.sampleData[k]);
  //       }

  //     }
  //   );


  // }
  // showPreview = function () {
  //   this.editorComponent.editor.exportHtml(
  //     function (exported: UnlayerExport) {

  //       let exportedDesign = exported.design as unknown as string;
  //       Merge.mergeData(exportedDesign, Merge.sampleData, (design) => this.loadDesign(design));
  //     }
  //   );
  //   this.editorComponent.editor.showPreview();
  // }

}

export interface SampleDataset {
  clnt_id,
  clnt_forename,
  clnt_surname,
  addr_street,
  addr_locality,
  addr_postcode,
  product
}

export class Merge {
  static sampleData: SampleDataset = {
    clnt_id: "BNHPG4756Q",
    clnt_forename: "John",
    clnt_surname: "Smith",

    addr_street: "4, Chapel Hill",
    addr_locality: "Heswall, BOURNEMOUTH",
    addr_postcode: "BH1 1AA",

    product: "SIPP (Accumulation)"
  }
  static mergeData(design: string, data: SampleDataset, cb) {
    let designString = design as String;
    for (let k in designString) {
      designString.replace(k, data[k]);
    }
    cb(designString);
  }
}