import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import getDocDefinition from "./docDefinition";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function printDoc(printParams, gridApi, columnApi) {
  console.log("Exporting to PDF...");
  const docDefinition = getDocDefinition(printParams, gridApi, columnApi);
  pdfMake.createPdf(docDefinition).download();
}

export default printDoc;
