import { useGetUserProfile } from "@api/queries/user.queries";
import { render, screen } from "@testing-library/react";
import { UserProfile } from "./UserProfile";

jest.mock("@api/queries/user.queries");

describe("UserProfile", () => {
  test("Renders user profile information", () => {
    const mockedUser = {
      name: "Adam",
      active: true,
      role: "Admin",
      posts: 10,
      likes: 20,
      comments: 30,
      createdAt: "2023-02-24",
      lastLogin: "2023-02-24",
    };

    const mockedGetUserProfile = useGetUserProfile as jest.Mock;
    mockedGetUserProfile.mockImplementation(() => ({
      data: mockedUser,
    }));

    render(<UserProfile user="Adam" />);

    expect(screen.getByText("Adam")).toBeInTheDocument();
    expect(screen.getByText("Active: true")).toBeInTheDocument();
    expect(screen.getByText("Registered: Feb 24, 2023")).toBeInTheDocument();
    expect(screen.getByText("Posts: 10")).toBeInTheDocument();
    expect(screen.getByText("Posts liked: 20")).toBeInTheDocument();
    expect(screen.getByText("Comments: 30")).toBeInTheDocument();
  });

  test("User Avatar is shown", () => {
    render(<UserProfile user="Adam" />);
    expect(screen.queryByAltText("avatar")).toBeInTheDocument();
  });
});
