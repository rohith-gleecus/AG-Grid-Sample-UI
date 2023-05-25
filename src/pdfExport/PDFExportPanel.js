import React, { useState, useEffect } from "react";
import { createPicker } from "./utils";
import printDoc from "./printDoc";

const PDFExportPanel = props => {
  const [PDF_PAGE_ORITENTATION, SET_PDF_PAGE_ORIENTATION] = useState(
    "landscape"
  );
  const [PDF_WITH_HEADER_IMAGE, SET_PDF_WITH_HEADER_IMAGE] = useState(true);
  const [PDF_WITH_FOOTER_PAGE_COUNT, SET_PDF_WITH_FOOTER_PAGE_COUNT] = useState(
    true
  );
  const [PDF_HEADER_HEIGHT, SET_PDF_HEADER_HEIGHT] = useState(25);
  const [PDF_ROW_HEIGHT, SET_PDF_ROW_HEIGHT] = useState(15);

  const [PDF_ODD_BKG_COLOR, SET_PDF_ODD_BKG_COLOR] = useState("#fcfcfc");
  const [PDF_EVEN_BKG_COLOR, SET_PDF_EVEN_BKG_COLOR] = useState("#fff");
  const [PDF_WITH_CELL_FORMATTING, SET_PDF_WITH_CELL_FORMATTING] = useState(
    true
  );
  const [PDF_WITH_COLUMNS_AS_LINKS, SET_PDF_WITH_COLUMNS_AS_LINKS] = useState(
    true
  );

  const [PDF_SELECTED_ROWS_ONLY, SET_PDF_SELECTED_ROWS_ONLY] = useState(false);

  const PDF_HEADER_COLOR = "#f8f8f8";
  const PDF_INNER_BORDER_COLOR = "#dde2eb";
  const PDF_OUTER_BORDER_COLOR = "#babfc7";
  const PDF_LOGO =
    "https://raw.githubusercontent.com/AhmedAGadir/ag-grid-todo-list-react-typescript/master/src/assets/new-ag-grid-logo.png";


  const submitFormHandler = event => {
    event.preventDefault();

    const printParams = {
      PDF_HEADER_COLOR,
      PDF_INNER_BORDER_COLOR,
      PDF_OUTER_BORDER_COLOR,
      PDF_LOGO,
      PDF_PAGE_ORITENTATION,
      PDF_WITH_HEADER_IMAGE,
      PDF_WITH_FOOTER_PAGE_COUNT,
      PDF_HEADER_HEIGHT,
      PDF_ROW_HEIGHT,
      PDF_ODD_BKG_COLOR,
      PDF_EVEN_BKG_COLOR,
      PDF_WITH_CELL_FORMATTING,
      PDF_WITH_COLUMNS_AS_LINKS,
      PDF_SELECTED_ROWS_ONLY
    };

    printDoc(printParams, props.gridApi, props.columnApi);
  };

  return (
    
      <button onClick={submitFormHandler}>
        Export to PDF
      </button>
    
  );
};

export default PDFExportPanel;
