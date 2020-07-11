import execa from 'execa';
import isGit from 'is-git-repository';

export interface IsMergeCommitOptions {
  cwd?: string;
}

const isMergeCommit = (commit: string, options: IsMergeCommitOptions = {}): boolean => {
  let stdout;

  const { cwd = process.cwd() } = options;

  if (!isGit(cwd)) {
    return false;
  }

  try {
    stdout = execa.commandSync(`git cat-file -p ${commit}`, { cwd }).stdout;
  } catch (e) {
    return false;
  }

  const parents = (stdout.match(/parent/ig) || []).length;

  return parents >= 2;
};

export default isMergeCommit;
