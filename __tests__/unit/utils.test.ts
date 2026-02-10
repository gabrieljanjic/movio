import { formatDate, formatTime, formatYear, formRating } from "@/lib/utils";

describe("formatDate", () => {
  it("should return string in proper format", () => {
    const date = "2025-12-6";
    const result = formatDate(date);
    expect(result).toBe("6. 12. 2025");
  });
  it("should return - if value is empty string", () => {
    const date = "";
    const result = formatDate(date);
    expect(result).toBe("-");
  });
  it("should return - for null", () => {
    const date = null;
    const result = formatDate(date);
    expect(result).toBe("-");
  });
});

describe("formatTime", () => {
  it("should return only minutes", () => {
    const time = 54;
    const result = formatTime(time);
    expect(result).toBe("54min");
  });
  it("should return full time", () => {
    const time = 154;
    const result = formatTime(time);
    expect(result).toBe("2h 34min");
  });
});

describe("formatYear", () => {
  it("should return correct year", () => {
    const date = "2025-12-6";
    const result = formatYear(date);
    expect(result).toBe("2025");
  });
});

describe("formRating", () => {
  it("should multiply rating by 10", () => {
    const rating = 8.5;
    const result = formRating(rating);
    expect(result).toBe("85");
  });
  it("should return 0", () => {
    const rating = 0;
    const result = formRating(rating);
    expect(result).toBe("0");
  });
});
