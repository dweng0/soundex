# soundex
Phonetic algorithm for indexing names by sound as pronounced in English.

I have written this script based on the wikipedia definition of soundex (American) found here:
https://en.wikipedia.org/wiki/Soundex

It has one dependency on underscorejs. That you'll need to pull in yourself

There is currently a bunch of test words at the top of the script that should match the score defined at wikipedia...

### Use case
call `soundexScore(word)` passing in the word you want to score.

### Purpose
[Readers be advised, This next bit contains some strong language]
This project will be used in part of a group of projects to build a smart profanity filter system. Scoring words based on how close they are to a profane word (if users put sh1t a futhermucker). Points will be scaled up or down based on how close to a profane word the given word is.

As an example: A points based system will mean that, should person named futhermucker be reported for a profane word as a username the weight behind the reporting will include its profanity score. prioritising profanity reports for admins/moderators and game masters accordingly.
