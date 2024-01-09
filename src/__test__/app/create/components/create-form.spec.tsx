import CreateForm from "@/app/create/components/create-form";
import { render } from "@testing-library/react";

describe("Create Form Component", () => {
  it("should render create form component", () => {
    const page = render(<CreateForm />);
    expect(page).toMatchSnapshot();
  });
});
