import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import PDFExportPanel from "./pdfExport/PDFExportPanel.js";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './index.css'

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};

const Grid = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'athlete',
      minWidth: 200,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
      hide: true,
    },
    { field: 'age', hide: false },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: 'Group',
      minWidth: 200,
      field: 'athlete',
      valueGetter: (params) => {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
      wrapText: true,     // <-- HERE
      autoHeight: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

    const toggleColumn = (field) => {
      const newColumns = columnDefs.map((column) => {
        if(column.field == field){
          const hide = !column.hide;
          console.log("field matched", hide);
          return {...column, hide };
        }
        return column;
      });
      console.log(newColumns);
      setColumnDefs(newColumns);
    }

    const downloadCSV = () => {
      gridRef.current.api.exportDataAsCsv();
    }

  return (
    <div style={containerStyle} className="container-fluid">
    <div className="grid-check">
    {columnDefs.map((column) => <div style={{marginRight: 10}}><input type="checkbox" onChange={e => toggleColumn(column.field)} id={column.field} name={column.field} checked={!column.hide} />
<label for={column.field}>{column.field}</label></div>)}
    </div>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          autoGroupColumnDef={autoGroupColumnDef}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          suppressBrowserResizeObserver = {true}
          // groupSelectsChildren={true}
          rowSelection={'multiple'}
          // rowGroupPanelShow={'always'}
          // pivotPanelShow={'always'}
          pagination={true}
          onGridReady={onGridReady}
        ></AgGridReact>
        <div className="buttons">
          <button onClick={downloadCSV}>Download CSV</button>
        <PDFExportPanel gridApi={gridApi} columnApi={columnApi} />
        </div>
      </div>
    </div>
  );
};

export default Grid;