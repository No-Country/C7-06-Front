import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("renders Hello World text", () => {
  render(<App />);
  const headingElement = screen.getByText(/Hello World/i);
  expect(headingElement).toBeInTheDocument();
});
