import { describe, expect, it } from "vitest";

import { createUrlSlug } from "./create-url-slug";

describe("createUrlSlug", () => {
  it("lowercases the name and joins words with hyphens", () => {
    expect(createUrlSlug("Apple iPhone 15 Pro")).toBe("apple-iphone-15-pro");
  });

  it("turns symbols into a single hyphen", () => {
    expect(createUrlSlug('Samsung 55" QLED -- TV')).toBe("samsung-55-qled-tv");
  });

  it("trims hyphens from both ends", () => {
    expect(createUrlSlug("  !Sony WH-1000XM5!  ")).toBe("sony-wh-1000xm5");
  });

  it("leaves an existing slug unchanged", () => {
    expect(createUrlSlug("already-a-slug")).toBe("already-a-slug");
  });

  it("returns an empty string when there is nothing to keep", () => {
    expect(createUrlSlug("")).toBe("");
    expect(createUrlSlug("!!!")).toBe("");
  });
});
