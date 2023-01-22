import gitUrlParse from 'git-url-parse';
import { simpleGit } from 'simple-git';

/**
 * Get repository, homepage, bugs, author from .git
 */
export async function getRepoInfo() {
  const git = simpleGit();
  let result: any = {};
  try {
    const remotes = await git.getRemotes(true);
    const { latest } = await git.log({ maxCount: 1 });
    const gitUrl = remotes.find((remote) => remote.name === 'origin')?.refs.fetch;
    if (gitUrl) {
      const gitUrlInfo = gitUrlParse(gitUrl);
      const httpsGitUrl = gitUrlInfo.toString('https');
      const homepage = httpsGitUrl.substring(0, httpsGitUrl.length - 4);
      result = {
        ...result,
        homepage: homepage + '#readme',
        bugs: {
          url: homepage + '/issues',
        },
        repository: { type: 'git', url: 'git+' + httpsGitUrl },
      };
    }
    if (latest) {
      result = {
        ...result,
        author: {
          name: latest.author_name,
          email: latest.author_email,
        },
      };
    }
  } catch (e) {
    // Not a Git repo
  }
  return result;
}
