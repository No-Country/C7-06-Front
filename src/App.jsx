import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { Store } from "./Redux/store";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Navbar />
        <Banner />
        <Intro />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
