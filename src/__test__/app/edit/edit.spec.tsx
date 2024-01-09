import EditPage from "@/app/edit/[id]/page";
import { render } from "@testing-library/react";

describe("Edit Page", () => {
  it("should render edit page", () => {
    const page = render(
      <EditPage
        params={{
          id: "474",
        }}
      />
    );
    expect(page).toMatchSnapshot();
  });
});
