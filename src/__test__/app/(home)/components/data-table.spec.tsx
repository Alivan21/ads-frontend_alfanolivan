import { columns } from "@/app/(home)/components/columns";
import { DataTable } from "@/app/(home)/components/data-table";
import { render } from "@testing-library/react";

describe("Data Table Component", () => {
  it("should render data table component", () => {
    const page = render(<DataTable columns={columns} data={[]} />);
    expect(page).toMatchSnapshot();
  });
});
