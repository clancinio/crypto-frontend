import { render } from "@testing-library/react";
import App from "./App";

// Test that the Coin Component renders without crashing
describe("Coin", () => {
  test("renders Coin component", () => {
    render(<Coin />);
  });
});
