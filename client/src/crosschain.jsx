import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo2";
import Footer from "./components/Footer";
import React from "react";

const Crosschain = () => {
    return(
        <EthProvider>
        <div id="App" >
          <div className="container">
            <Demo />
          </div>
        </div>
      </EthProvider>
    )
}

export default Crosschain;