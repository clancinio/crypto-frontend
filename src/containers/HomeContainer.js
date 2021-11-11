import Container from "react-bootstrap/Container";
import Nav from "../components/navbar/Navbar";
import TopSection from "../components/topsection/TopSection";

function HomeContainer() {
  return (
    <>
      <Nav />
      <Container>
        <TopSection />
      </Container>
    </>
  );
}

export default HomeContainer;
