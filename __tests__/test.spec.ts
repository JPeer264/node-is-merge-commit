import fs from 'fs';
import { homedir } from 'os';
import path from 'path';
import gitCommitCount from 'git-commit-count';

import isMergeCommit from '../index';

const fixtures = path.join(process.cwd(), '__tests__', 'fixtures');
const folders = [
  'merge_ff',
  'merge_no_ff',
  'master',
];

beforeAll(() => {
  folders.map((folder) => fs.renameSync(path.join(fixtures, folder, 'git'), path.join(fixtures, folder, '.git')));
});

afterAll(() => {
  folders.map((folder) => fs.renameSync(path.join(fixtures, folder, '.git'), path.join(fixtures, folder, 'git')));
});

it('should fail with no git repo', () => {
  expect(isMergeCommit('no-commit', { cwd: homedir() })).toBe(false);
  expect(isMergeCommit('no-commit')).toBe(false);
});

it('should fail on execution', () => {
  const cwd = path.join(fixtures, 'master');

  expect(isMergeCommit('no-commit', { cwd })).toBe(false);
});

it('should have check merge conflict', () => {
  const cwd = path.join(fixtures, 'master');

  expect(gitCommitCount(cwd)).toBe(4);
  expect(isMergeCommit('8bc8ea68a2fe27d1247d6ef08ba0055124e1ff08', { cwd })).toBe(true);
  expect(isMergeCommit('41ede7cbe6e7b852ee31db7776aab05bd0c17e6e', { cwd })).toBe(false);
  expect(isMergeCommit('764800f3966d433d4b52d90ad2de1be47f322a90', { cwd })).toBe(false);
});

it('should check merge commit --no-ff', () => {
  const cwd = path.join(fixtures, 'merge_no_ff');

  expect(gitCommitCount(cwd)).toBe(3);
  expect(isMergeCommit('f954910fd663806ed23c9570402e57e8ff765dbe', { cwd })).toBe(true);
  expect(isMergeCommit('42c6e5456b8f4daffaa09ef97a8e925847bef877', { cwd })).toBe(false);
  expect(isMergeCommit('94274a41323daa4f57ddd6d680f6d10ff3b80af8', { cwd })).toBe(false);
});

it('should fail on --ff merge', () => {
  const cwd = path.join(fixtures, 'merge_ff');

  expect(gitCommitCount(cwd)).toBe(2);
  expect(isMergeCommit('30e98b999f562618ffa8492feceb695c246d666c', { cwd })).toBe(false);
  expect(isMergeCommit('bf85c5ebc6bb7dc64d5f2feacf8c529bb4588415', { cwd })).toBe(false);
});
