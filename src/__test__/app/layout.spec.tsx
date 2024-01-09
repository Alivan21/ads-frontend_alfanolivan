import Create from "@/app/create/page";
import RootLayout from "@/app/layout";
import { render } from "@testing-library/react";

describe("Layout", () => {
  it("should render layout create page", () => {
    const page = render(
      <RootLayout>
        <Create />
      </RootLayout>
    );
    expect(page).toMatchSnapshot();
  });
});
