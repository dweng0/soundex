interface ScoreDict {
  matches: string[];
  score: number;
}

/**
 * the vowels ....and y
 */
const vowelLikeCharacters: string[] = ["a", "e", "i", "o", "u", "y"];

/**
 * The phonetic scoring dictionary for 'place of articulation' similarity.
 */
const phoneticScoreDictionary: ScoreDict[] = [
  {
    matches: ["b", "f", "p", "v"],
    score: 1,
  },
  {
    matches: ["c", "g", "j", "k", "q", "s", "x", "z"],
    score: 2,
  },
  {
    matches: ["d", "t"],
    score: 3,
  },
  {
    matches: ["l"],
    score: 4,
  },
  {
    matches: ["m", "n"],
    score: 5,
  },
  {
    matches: ["r"],
    score: 6,
  },
];

/**
 * Finds the letter in our phonetic score dictionary, returning the found object.
 */
const findInDictionary = function (letter: string) {
  return phoneticScoreDictionary.find((phoneticLetters) => {
    return phoneticLetters.matches.find((character) => character === letter);
  });
};

/**
 * If two or more letters with the same number are adjacent in the original name,
 * only retain the first letter
 */
const stripAdjacentLetters = function (charactersArray: string[]) {
  return charactersArray.filter((char, index) => {
    if (index === 0) {
      // Always keep the first character
      return true;
    }
    // Keep the character only if it's not the same as the previous one
    return char !== charactersArray[index - 1];
  });
};

/**
 *  Rejects from the first array anything found in the second array
 */
function rejectFromArray(mainArray: string[], filterArray: string[]): string[] {
  return mainArray.filter((char) => !filterArray.includes(char));
}
/**
 * Returns the score for the string passed in
 */
export const soundexScore = function (word: string) {
  if (!word) {
    throw new Error("Word is missing...");
  }

  if (word.length < 2) {
    throw new Error(`No single letter words. Its score would be: ${word}000`);
  }

  const rawWordsAsArray = stripAdjacentLetters(
    word.trim().toLowerCase().split("")
  );

  const firstLetter = rawWordsAsArray[0];
  const restOfWord = rawWordsAsArray.slice(1);
  let wordStrippedOfVowels = rejectFromArray(restOfWord, vowelLikeCharacters);

  // If the first letter is vowel like (or is h or w), then:
  // Check if the first two letters have the same number, if so, they are coded once as the first letter (not a score)
  const vowelsPlusHW = vowelLikeCharacters.concat("h", "w");
  if (!vowelsPlusHW.find((vowel) => vowel === firstLetter.toLowerCase())) {
    if (
      findInDictionary(firstLetter)?.score ===
      findInDictionary(rejectFromArray(restOfWord, vowelsPlusHW)[0])?.score
    ) {
      //if the scores match, remove the offending letter from array;
      wordStrippedOfVowels = wordStrippedOfVowels.slice(1);
    }
  }

  //variables for tracking whether we have encountered the "h or w" condition:
  //...two letters with the same score separated by 'h' or 'w' are coded as a single number
  let previousScore = 0;
  let lastWasH_or_W = false;

  // Reduce array down to a phonetic score
  let result = wordStrippedOfVowels.reduce((accumulator, currentLetter) => {
    let match = findInDictionary(currentLetter);
    if (match && lastWasH_or_W && match.score === previousScore) {
      // "h or w" condition met, unset the match
      match = undefined;
    }

    if (currentLetter === "k" && previousScore === 2) {
      // "c" condition met, unset the match
      match = undefined;
    }

    // Update lastWasH_or_W and previousScore based on current letter and match
    lastWasH_or_W = currentLetter === "h" || currentLetter === "w";
    previousScore = match ? match.score : previousScore;

    // Return the updated accumulator
    return match && accumulator.length < 4
      ? accumulator + match.score
      : accumulator;
  }, firstLetter);

  let appender = 4 - result.length;
  for (var i = 0; i < appender; i++) {
    result += "0";
  }
  return result.toUpperCase();
};
