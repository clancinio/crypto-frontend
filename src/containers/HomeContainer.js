import Container from "react-bootstrap/Container";
import TopNav from "../components/navbar/TopNav";
import TopSection from "../components/topsection/TopSection";
import PortfolioComponent from "../components/portfoliosection/PortfolioComponent";

function HomeContainer() {
  return (
    <>
      <TopNav />
      <Container>
        <TopSection />
        <PortfolioComponent />
      </Container>
    </>
  );
}

export default HomeContainer;
