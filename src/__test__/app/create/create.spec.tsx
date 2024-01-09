import Create from "@/app/create/page";
import { render } from "@testing-library/react";

describe("Create Page", () => {
  it("should render create page", () => {
    const page = render(<Create />);
    expect(page).toMatchSnapshot();
  });
});
