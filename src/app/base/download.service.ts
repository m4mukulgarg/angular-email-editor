import { Injectable } from '@angular/core';


@Injectable()
export class DownloadService {

    public static downloadFile(data: object, ext: String) {
        let filename = prompt("Enter File Name");
        let blobData;
        
        ext === ".JSON" ? blobData = JSON.stringify(data) : blobData = data;

        let blob = new Blob(['\ufeff' + blobData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);

        dwldLink.setAttribute("download", filename + ext);
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }
}