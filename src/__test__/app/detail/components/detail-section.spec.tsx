import DetailSection from "@/app/detail/[id]/components/detail-section";
import { render } from "@testing-library/react";

describe("Detail Section Component", () => {
  it("should render detail section component", () => {
    const page = render(<DetailSection id="508" />);
    expect(page).toMatchSnapshot();
  });
});
