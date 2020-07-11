# is-merge-commit

[![Build Status](https://travis-ci.com/JPeer264/node-is-merge-commit.svg?branch=master)](https://travis-ci.com/JPeer264/node-is-merge-commit)
[![Build status](https://ci.appveyor.com/api/projects/status/ehj6762gbj1e2qyc?svg=true)](https://ci.appveyor.com/project/JPeer264/node-is-merge-commit)
[![Coverage Status](https://coveralls.io/repos/github/JPeer264/node-is-merge-commit/badge.svg?branch=master)](https://coveralls.io/github/JPeer264/node-is-merge-commit?branch=master)

Get synchronously the current branch name

## Installation

```sh
$ npm i is-merge-commit --save
```
or
```sh
$ yarn add is-merge-commit
```

## Usage

**isMergeCommit(commit[, options])**

Parameters:

- commit <String>: The git commit identifier
- options <Object> (optional)

Options:

- cwd <String>: Current working directory for the git execution

Returns:
- Boolean: Wether it is a merge commit or not

```js
const isMergeCommit = require('is-merge-commit');

isMergeCommit('8bc8ea6'); // true | false
isMergeCommit('8bc8ea6', { cwd: 'any/git/repo' }); // true | false
```

## LICENSE

MIT © [Jan Peer Stöcklmair](https://www.jpeer.at)
