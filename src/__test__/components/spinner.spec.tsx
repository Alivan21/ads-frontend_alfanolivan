import Spinner from "@/components/spinner";
import { render } from "@testing-library/react";

describe("Spinner Component", () => {
  it("should render spinner component", () => {
    const page = render(<Spinner />);
    expect(page).toMatchSnapshot();
  });
});
