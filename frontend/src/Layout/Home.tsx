import BestSellerVarieties from "../components/BestSellerVarieties";
import Collections from "../components/Collections";
import Header from "../components/Header";
import PlantJourney from "../components/PlantJourney";
import ProductCatalog from "../components/ProductCatalog";
import PlantTypes from "../components/PlantTypes";

const Home = () => {
  return <div>
      <Header />
    
      <PlantJourney />
      <BestSellerVarieties />
     
      <Collections /> <PlantTypes />
      <ProductCatalog />
  </div>;
};

export default Home;