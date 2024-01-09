import BookTable from "@/app/(home)/components/book-table";
import { render } from "@testing-library/react";

describe("Book Table Component", () => {
  it("should render book table component", () => {
    const page = render(<BookTable />);
    expect(page).toMatchSnapshot();
  });
});
