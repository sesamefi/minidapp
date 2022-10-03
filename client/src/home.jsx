import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Demo from "./components/Demo1";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Intro />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default Home;
