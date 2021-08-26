
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  generateExcel(excellData) {
    const title = excellData.title
    const header = excellData.header
    const data = excellData.data

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(title);

    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: excellData.fileName, family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]);
    worksheet.addRow([]);
    //Add Header Row
    let headerRow 
    excellData.header.forEach(singleHeader => {
        headerRow = worksheet.addRow(singleHeader);
        headerRow.alignment = { wrapText: true };
        headerRow.getCell
    });

    data.forEach(d => {
        let row = worksheet.addRow(d);
        row.alignment = { wrapText: true };
      });

    worksheet.getColumn(1).width = 30;
    for (let i = 2; i <= excellData.data.length+1; i++) {
        worksheet.getColumn(i).width = 20;
        worksheet.getColumn(i).height = 20;
    }


    // worksheet.mergeCells('A4:A6');
    // worksheet.mergeCells('B4:C4');
    // worksheet.mergeCells('D4:AA4');

    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, excellData.fileName +'.xlsx');
    })
  }
}