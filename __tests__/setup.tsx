import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  },
}));
