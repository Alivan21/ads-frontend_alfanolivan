import Detail from "@/app/detail/[id]/page";
import { render } from "@testing-library/react";

describe("Detail Page", () => {
  it("should render detail page", () => {
    const page = render(
      <Detail
        params={{
          id: "508",
        }}
      />
    );
    expect(page).toMatchSnapshot();
  });
});
