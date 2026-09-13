import Navbar from '../../components/public/Navbar';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import Academics from '../../components/public/Academics';
import Facilities from '../../components/public/Facilities';
import Gallery from '../../components/public/Gallery';
import Contact from '../../components/public/Contact';
import Footer from '../../components/public/Footer';

export default function Home() {
  return (
    <div className="cursor-enabled">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Academics />
        <Facilities />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
