import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import FeaturedEvents from "../components/FeaturedEvents/FeaturedEvents";
import ForOrganizers from "../components/ForOrganizers/ForOrganizers";
import Footer from "../components/Footer/Footer";


const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <FeaturedEvents />
      <ForOrganizers />
      <Footer />
    </>
  );
};

export default HomePage;