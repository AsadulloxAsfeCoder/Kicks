import Siteheader from '@/components/common/site-header';
import Categories from '@/components/landing/categories';
import Hero from '@/components/landing/hiro';
import NewDrops from '@/components/landing/new-drops';
import Reviews from '@/components/landing/reviews';
import Footer from '@/components/ui/footer';

const Home = () => {
  return (
    <main> 
      <Siteheader/>
      <Hero/>
      <NewDrops/>
      <Categories/>   
      <Reviews/> 
      <Footer/>         
    </main>
  );
};

export default Home;
