interface ScoreDict {
  matches: string[];
  score: number;
}

/**
 * I have written this script based on the wikipedia definition of soundex found here:
 * using the american soundex algorithm: https://en.wikipedia.org/wiki/Soundex
 */
const testWords: string[] = [
  "Robert",
  "Rupert",
  "Rubin",
  "Ashcraft",
  "Ashcroft",
  "Tymczak",
  "Pfister",
  "Honeyman",
];

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
    return phoneticLetters.matches.find(
      (character) => character.toLowerCase() === letter.toLowerCase()
    );
  });
};

/**
 * If two or more letters with the same number are adjacent in the original name,
 * only retain the first letter
 */
const stripAdjacentLetters = function (searchAsArray: string[]) {
  let previousLetter;
  return searchAsArray.filter(function (letter) {
    const matchesPreviousLetter = !!(letter === previousLetter);
    previousLetter = letter;
    return matchesPreviousLetter;
  });
};

/**
 *  Rejects from the first array anything found in the second array
 */
const rejectFromArray = function (
  arrayToRejectFrom: string[],
  rejectionCriteriaArray: string[]
) {
  return arrayToRejectFrom.filter(function (itemToTestAgainst) {
    return !!rejectionCriteriaArray.find(function (itemToTestFor) {
      return itemToTestFor === itemToTestAgainst;
    });
  });
};

/**
 * Returns the score for the string passed in
 */
const soundexScore = function (word: string) {
  if (!word) {
    throw new Error("Word is missing...");
  }

  if (word.length < 2) {
    throw new Error(`No single letter words. Its score would be: ${word}000`);
  }

  word.trim();
  word.toLowerCase();
  const rawWordsAsArray = stripAdjacentLetters(word.split(""));
  const firstLetter = rawWordsAsArray[0];
  const restOfWord = rawWordsAsArray.slice(1);
  let wordStrippedOfVowels = rejectFromArray(restOfWord, vowelLikeCharacters);

  // If the first letter is vowel like (or is h or w), then:
  // Check if the first two letters have the same number, if so, they are coded once as the first letter (not a score)
  const vowelsPlusHW = vowelLikeCharacters.concat("h", "w");
  if (!vowelsPlusHW.find((vowel) => vowel === firstLetter.toLowerCase())) {
    if (
      findInDictionary(firstLetter.toLowerCase())?.score ===
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

  //reduce array down to a phonetic score
  let result = wordStrippedOfVowels.reduce(function (memo, letter) {
    let match = findInDictionary(letter);
    if (match && lastWasH_or_W && match.score === previousScore) {
      // "h or w" condition met... unset the match
      match = undefined;
    }

    lastWasH_or_W = letter === "h" || letter === "w";
    if (match) {
      previousScore = match.score;
    }
    return match && memo.length < 4 ? memo + match.score : memo;
  }, firstLetter);

  let appender = 4 - result.length;
  for (var i = 0; i < appender; i++) {
    result += "0";
  }
  console.log(result);
  return result;
};

//test each word in the testwords array
testWords.forEach(soundexScore);
