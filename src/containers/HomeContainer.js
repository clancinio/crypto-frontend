import Container from "react-bootstrap/Container";
import TopNav from "../components/navbar/TopNav";
import TopSection from "../components/topsection/TopSection";
import PortfolioComponent from "../components/portfoliosection/PortfolioComponent";
import Footer from "../components/footer/Footer";

function HomeContainer() {
  return (
    <>
      <TopNav />
      <Container>
        <TopSection />
        <PortfolioComponent />
      </Container>
      <Footer />
    </>
  );
}

export default HomeContainer;
