import CreatePostComponent from "@/components/CreatePostComponent";
import { User, WholeContent } from "@/types/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as postActions from "@/lib/actions/postActions";

vi.mock("@/lib/actions/postActions", () => ({
  createPostActions: vi.fn(),
}));

describe("CreatePostComponent", () => {
  const contentId = "1";
  const mockUser: User = {
    _id: "user123",
    firstName: "Ivan",
    lastName: "Horvat",
    email: "ivan@gmail.com",
    userName: "ivan",
    createdAt: "2024-01-01T12:00:00Z",
  };
  const contentType = "movie";
  const mockWholeContent: WholeContent = {
    id: 101,
    title: "Inception",
    poster_path: "/inception.jpg",
    release_date: "2010-07-16",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology.",
    vote_average: 8.8,
  };
  it("should createPost if everything is valid", async () => {
    render(
      <CreatePostComponent
        contentId={contentId}
        user={mockUser}
        contentType={contentType}
        wholeContent={mockWholeContent}
      />,
    );
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Rating (1-10)"), "8");
    await user.type(
      screen.getByPlaceholderText("Write your post..."),
      "Great movie",
    );
    await user.click(button);
    expect(postActions.createPostActions).toHaveBeenCalledTimes(1);
    expect(postActions.createPostActions).toHaveBeenCalledWith({
      wholeContent: mockWholeContent,
      contentId: "1",
      contentType: "movie",
      postContent: "Great movie",
      rating: 8,
      spoiler: false,
      createdBy: "user123",
    });
  });

  it("should be able to check checkbox", async () => {
    render(
      <CreatePostComponent
        contentId={contentId}
        user={mockUser}
        contentType={contentType}
        wholeContent={mockWholeContent}
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    userEvent.setup();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
