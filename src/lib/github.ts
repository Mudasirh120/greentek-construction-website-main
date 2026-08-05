const GITHUB_API = "https://api.github.com";

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || "Mudasirh120";
  const repo = process.env.GITHUB_REPO || "greentek-construction-website-main";
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token) {
    throw new Error(
      "GITHUB_TOKEN is not set. Admin saves commit directly to GitHub and need a personal access token with write access to this repo.",
    );
  }

  return { token, owner, repo, branch };
}

async function githubFetch(path: string, init?: RequestInit) {
  const { token } = getConfig();
  const res = await fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${body}`);
  }

  return res.json();
}

/**
 * Commits new content to a file in the repo. This is the only way admin
 * edits actually persist: the site is deployed on a serverless host with no
 * writable filesystem, so "saving" means pushing a commit and letting the
 * host's existing auto-deploy pick it up.
 */
export async function commitFile(
  filePath: string,
  content: string,
  message: string,
): Promise<string> {
  const { owner, repo, branch } = getConfig();
  const encoded = Buffer.from(content, "utf-8").toString("base64");

  let sha: string | undefined;
  try {
    const existing = await githubFetch(
      `/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
    );
    sha = existing.sha;
  } catch {
    // File doesn't exist yet on this branch — GitHub will create it.
  }

  const result = await githubFetch(`/repos/${owner}/${repo}/contents/${filePath}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: encoded,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  return result.commit.sha as string;
}
