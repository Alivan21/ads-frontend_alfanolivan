import EditForm from "@/app/edit/[id]/components/edit-form";
import { render } from "@testing-library/react";

describe("Edit Form Component", () => {
  it("should render edit form component", () => {
    const page = render(<EditForm id="474" />);
    expect(page).toMatchSnapshot();
  });
});
