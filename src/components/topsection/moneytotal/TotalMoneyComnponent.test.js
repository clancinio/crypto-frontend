import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TotalMoneyComponent from "./TotalMoneyComponent";

// Testin the correct content displays in component
describe("<TotalMoneyComponent />", () => {
  test("Renders <TotalMoneyComponent /> component correctly", () => {
    const { getByText } = render(<TotalMoneyComponent />);
    expect(getByText(/Total Capital/i)).toBeInTheDocument();
  });
});
