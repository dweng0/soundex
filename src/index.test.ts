import { soundexScore } from "./";

describe("soundexScore", () => {
  const testCases = [
    { word: "Robert", expected: "R163" },
    { word: "Rupert", expected: "R163" },
    { word: "Rubin", expected: "R150" },
    { word: "Ashcraft", expected: "A261" },
    { word: "Ashcroft", expected: "A261" },
    { word: "Tymczak", expected: "T522" },
    { word: "Pfister", expected: "P236" },
    { word: "Honeyman", expected: "H555" },
  ];

  testCases.forEach(({ word, expected }) => {
    it(`should return the correct soundex score for the word "${word}"`, () => {
      expect(soundexScore(word)).toBe(expected);
    });
  });
});
