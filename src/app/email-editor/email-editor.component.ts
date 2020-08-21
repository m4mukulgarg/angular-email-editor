import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { loadScript } from './loadScript';
import { SampleDesign } from 'src/app/sample.design';

export declare module unlayer {
  function init(object);
  function createEditor(object);
  function loadDesign(object);
  function saveDesign(Function);
  function exportHtml(Function);
  function showPreview(object);
}

export interface UnlayerExport {
  design?: JSON;
  html?: object;
}

export interface UnlayerOptions {
  projectId?: number;
  tools?: object;
  appearance?: object;
  locale?: string;
  customJS?: string;
  safeHtml?: boolean
}

let lastEditorId = 0;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.css']
})
export class EmailEditorComponent implements OnInit, AfterViewInit {
  [x: string]: any;

  @Input() editorId: string;
  @Input() options: UnlayerOptions = {};
  @Input() projectId: number;
  @Input() tools: object;
  @Input() appearance: object;
  @Input() locale: string;

  @Input() minHeight = '500px';

  @Output() loaded = new EventEmitter();

  editor: any;

  constructor() {
    this.editorId = `editor-${++lastEditorId}`;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    loadScript(this.loadEditor.bind(this));
  }

  protected loadEditor() {
    const options: UnlayerOptions = this.options || {};

    if (this.projectId) {
      options.projectId = this.projectId;
    }

    if (this.tools) {
      options.tools = this.tools;
    }

    if (this.appearance) {
      options.appearance = this.appearance;
    }

    if (this.locale) {
      options.locale = this.locale;
    }

    this.editor = unlayer.createEditor({
      ...options,
      id: this.editorId,
      displayMode: 'email',
      source: {
        name: "Angular-EmailEditor",
        version: '0.0.1',
      },
      appearance: {
        theme: 'dark',
        panels: {
          tools: {
            dock: 'left'
          }
        }
      },
      mergeTags: {
        clnt: {
          name: 'Client',
          mergeTags: {

            clnt_Id: {
              name: "Client Id",
              value: "{{clnt_id}}"
            },
            clnt_forename: {
              name: "Client Forename",
              value: "{{clnt_forename}}"
            },
            clnt_surname: {
              name: "Client Surname",
              value: "{{clnt_surname}}"
            }
          }
        },

        addr: {
          name: "Address",
          mergeTags: {
            street: {
              name: "Street",
              value: "{{addr_street}}"
            },
            locality: {
              name: "Locality",
              value: "{{addr_locality}}"
            },
            postcode: {
              name: "Postcode",
              value: "{{addr_postcode}}"
            },
          }
        },

        aclk: {
          name: "Account",
          mergeTags: {
            acc_number: {
              name: "Account No.",
              value: "{{acc_number}}"
            },
            product: {
              name: "Product Name",
              value: "{{product}}"
            },
            baln_amount: {
              name: "Balance Amount",
              value: "{{baln_amount}}"
            }
          }
        }
      }
    });

    this.loaded.emit({});
  }

  public loadDesign(data: object) {
    this.editor.loadDesign(data);
  }

  public saveDesign(cb: (data: object) => void) {
    this.editor.saveDesign(cb);
  }

  public exportHtml(cb: (data: object) => void) {
    this.editor.exportHtml(cb);
  }


}