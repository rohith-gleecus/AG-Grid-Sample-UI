import React from 'react';
import Header from './Header';
import Grid from './Grid';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Header className="header"/>
      <div className="ag-theme-alpine" style={{height: 400, width: "100%"}}>
        <Grid className="grid"/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
