# soundex

Phonetic algorithm for indexing names by sound as pronounced in English.

I have written this script based on the wikipedia definition of soundex (American) found here:
https://en.wikipedia.org/wiki/Soundex

It has one dependency on underscorejs. That you'll need to pull in yourself

There is currently a bunch of test words at the top of the script that should match the score defined at wikipedia...

## Purpose

[Readers be advised, This next bit contains some strong language]

This project will be used in part of a group of projects to build a smart profanity filter system. Scoring words based on how close they are to a profane word (if users put sh1t a futhermucker). Points will be scaled up or down based on how close to a profane word the given word is.

As an example: A points based system will mean that, should person named futhermucker be reported for a profane word as a username the weight behind the reporting will include its profanity score. prioritising profanity reports for admins/moderators and game masters, efficiently increasing reaction times and reducing their workload accordingly.

## Usage

Import the `soundexScore` function from the project, and call it with a name as its argument:

```typescript
import { soundexScore } from "./path/to/your/soundex";

const name = "Erick";
const score = soundexScore(name);

console.log(score); // Output: E620
```

## Test coverage 100%

![100% test coverage](/resources/testcoverage.png)

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
   2.Create a new branch in your fork with a descriptive name, such as fix-issue-123 or add-new-feature.
2. Make your changes in the new branch, ensuring that your code follows the project's coding style and standards.
3. Commit your changes and push the new branch to your fork.
4. Create a pull request from your new branch to the main repository.
5. Before submitting your pull request, make sure to test your changes and update the documentation if necessary. We'll review your pull request and provide feedback as soon as possible.

## License

MIT License

Copyright (c) 2023 Jay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
