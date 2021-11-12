import Container from "react-bootstrap/Container";
import TopNav from "../components/navbar/TopNav";
import TopSection from "../components/topsection/TopSection";

function HomeContainer() {
  return (
    <>
      <TopNav />
      <Container>
        <TopSection />
      </Container>
    </>
  );
}

export default HomeContainer;
