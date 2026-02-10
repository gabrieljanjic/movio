import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FollowComponent from "@/components/FollowComponent";
import { toast } from "react-toastify";
import * as userActions from "@/lib/actions/userActions";

vi.mock("@/lib/actions/userActions", () => ({
  followUser: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("FollowComponent", () => {
  it("calls followUser and shows success toast", async () => {
    vi.spyOn(userActions, "followUser").mockResolvedValue({
      success: true,
      message: "Followed successfully",
    });
    render(<FollowComponent userId="user1" myUsedId="myUserId" />);
    const button = screen.getByText(/Follow/);
    const user = userEvent.setup();

    await user.click(button);
    expect(userActions.followUser).toHaveBeenCalledWith("user1", "myUserId");
    expect(toast.success).toHaveBeenCalledWith("Followed successfully");
  });
});
