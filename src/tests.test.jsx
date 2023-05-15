import { render } from "@testing-library/react";
import test from "@jest/globals";
import Alert from "./components/Notifications/Alert";

test("checks if app renders", () => {
  render(<Alert />);
});
