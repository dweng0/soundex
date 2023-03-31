import { soundexScore } from "./";

describe("edge cases", () => {
  it("should throw an error if the word is empty", () => {
    expect(() => soundexScore("")).toThrowError("Word is missing...");
  });

  it("should throw an error if the word is a single letter", () => {
    expect(() => soundexScore("a")).toThrowError(
      "No single letter words. Its score would be: a000"
    );
  });

  it("Should throw an error if the word is not alphabetical", () => {
    expect(() => soundexScore("a1")).toThrowError(
      "Only alphabetical characters are allowed, please use substitution for non alphabetical words: a1"
    );
  });
});

describe("soundexScore tests", () => {
  const testCases = [
    { word: "Robert", expected: "R163" },
    { word: "Rupert", expected: "R163" },
    { word: "Rubin", expected: "R150" },
    { word: "Ashcraft", expected: "A261" },
    { word: "Ashcroft", expected: "A261" },
    { word: "Tymczak", expected: "T522" },
    { word: "Pfister", expected: "P236" },
    { word: "Honeyman", expected: "H555" },
    { word: "Erick", expected: "E620" },
  ];

  testCases.forEach(({ word, expected }) => {
    it(`should return the correct soundex score for the word "${word}"`, () => {
      expect(soundexScore(word)).toBe(expected);
    });
  });
});
