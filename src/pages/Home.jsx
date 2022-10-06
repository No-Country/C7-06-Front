import { Navbar, Banner, Intro, Animals, Footer, About } from "../components";

const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Intro />
      <Animals />
      <About />
      <Footer />
    </div>
  );
};
export default Home;
