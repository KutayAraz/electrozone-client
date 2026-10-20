import { describe, expect, it } from "vitest";

import { createUrlSlug, getProductIdFromSlug } from "./create-url-slug";

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

  it("keeps accented letters as their plain version", () => {
    expect(createUrlSlug("Café Çay")).toBe("cafe-cay");
    expect(createUrlSlug("Işıklı Klavye Çantası")).toBe("isikli-klavye-cantasi");
    expect(createUrlSlug("Kablosuz Kulaklık Şarj Ünitesi")).toBe("kablosuz-kulaklik-sarj-unitesi");
  });

  it("leaves an existing slug unchanged", () => {
    expect(createUrlSlug("already-a-slug")).toBe("already-a-slug");
  });

  it("returns an empty string when there is nothing to keep", () => {
    expect(createUrlSlug("")).toBe("");
    expect(createUrlSlug("!!!")).toBe("");
  });
});

describe("getProductIdFromSlug", () => {
  it("reads the id after -p-", () => {
    expect(getProductIdFromSlug("apple-iphone-15-pro-p-42")).toBe(42);
  });

  it("uses the last -p- when the name contains one too", () => {
    expect(getProductIdFromSlug("lenovo-p-15-p-42")).toBe(42);
  });

  it("returns null when there is no valid id", () => {
    expect(getProductIdFromSlug("apple-iphone-15-pro")).toBeNull();
    expect(getProductIdFromSlug("apple-iphone-15-pro-p-")).toBeNull();
    expect(getProductIdFromSlug("apple-iphone-15-pro-p-abc")).toBeNull();
  });
});
