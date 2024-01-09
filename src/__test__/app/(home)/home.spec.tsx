import Home from "@/app/(home)/page";
import { render } from "@testing-library/react";

describe("Home Page", () => {
  it("should render home page", () => {
    const page = render(<Home />);
    expect(page).toMatchSnapshot();
  });
});
