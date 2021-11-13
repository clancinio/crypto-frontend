import { render } from "@testing-library/react";
import App from "./App";

// Test that the App Component renders without crashing
describe("App", () => {
  test("renders App component", () => {
    render(<App />);
  });
});
