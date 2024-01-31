describe("search tests", function () {
  it("should find correct fruits that include user input value", () => {
    const str = "app";
    expect(search(str)).toEqual(["Apple", "Custard apple", "Pineapple"]);
  });
  it("should find correct fruits that include user input value regardless of casing", () => {
    const str = "aPp";
    expect(search(str)).toEqual(["Apple", "Custard apple", "Pineapple"]);
  });
  it("should find correct fruits even if backspace is used", () => {
    const str = "Appl";
    expect(search(str)).toEqual(["Apple", "Custard apple", "Pineapple"]);
  });
});

describe("findBold tests", function () {
  it("should bold each suggestion correctly", () => {
    const item = "Avocado 🥑";
    const inputVal = "voc";
    expect(findBold(item, inputVal)).toEqual([["A", "ado 🥑"], "voc"]);
  });
  it("should bold each suggestion correctly regardless of casing", () => {
    const item = "Avocado 🥑";
    const inputVal = "VOC";
    expect(findBold(item, inputVal)).toEqual([["A", "ado 🥑"], "voc"]);
  });
});
