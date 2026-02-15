import {
  formatDate,
  formatTime,
  formatYear,
  formRating,
  getColorByPercentage,
  getTimeAgo,
} from "@/lib/utils";

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
  it("should multiply rating by $number", () => {
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

describe("getColorByPercentage", () => {
  const allObjects = [92, 82, 72, 62, 52, 42, 32, 22, 12, 2].map((num) => ({
    number: num,
    expected: `border-rating-${num - 2}`,
  }));
  it.each([...allObjects])(
    "should return '$expected' for number $number",
    ({ number, expected }) => {
      const res = getColorByPercentage(number);
      expect(res).toMatch(expected);
    },
  );
});

describe("getTimeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-05T18:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it.each([
    { dateString: "2025-01-05T17:59:55Z", expected: "just now" },
    { dateString: "2025-01-05T17:55:00Z", expected: "5m ago" },
    { dateString: "2025-01-05T16:30:00Z", expected: "1h ago" },
    { dateString: "2025-01-04T16:00:00Z", expected: "1d ago" },
    { dateString: "2024-01-06T16:00:00Z", expected: "06. 01. 2024." },
  ])("should render $dateString as $expected", ({ dateString, expected }) => {
    const date = new Date(dateString);
    const res = getTimeAgo(date);
    expect(res).toBe(expected);
  });
});
