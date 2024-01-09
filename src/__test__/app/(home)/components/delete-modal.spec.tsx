import DeleteModal from "@/app/(home)/components/delete-modal";
import { render } from "@testing-library/react";

describe("Delete Modal Component", () => {
  it("should render delete modal component", () => {
    const page = render(<DeleteModal id={474} />);
    expect(page).toMatchSnapshot();
  });
});
