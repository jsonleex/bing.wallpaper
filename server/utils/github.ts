export async function commitFilesToGithub (
  files: { filename: string, content: string }[],
  message: string
) {
  const config = useRuntimeConfig()

  if (!config.GITHUB_TOKEN) {
    throw new Error('No GITHUB_TOKEN provided.')
  }

  const OWNER = 'jsonleex'
  const REPO = 'leex.wallpaper'

  const github = $fetch.create({
    baseURL: `https://api.github.com/repos/${OWNER}/${REPO}`,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${config.GITHUB_TOKEN}`,
    }
  })

  const { sha: base_tree } = await github<{ sha: string }>(`/git/trees/main`)

  const tree = await github<{ sha: string }>(`/git/trees`, {
    method: 'POST',
    body: {
      base_tree,
      tree: files.map((file) => ({
        type: 'blob',
        mode: '100644',
        path: `archive/${file.filename}`,
        content: file.content
      }))
    }
  })

  const commit = await github<{ sha: string }>(`/git/commits`, {
    method: 'POST',
    body: {
      message,
      tree: tree.sha,
      author: { name: 'leex', email: 'jsonleex@163.com' },
      parents: [base_tree]
    }
  })

  await github<{ ref: string }>(`/git/refs/heads/main`, {
    method: 'PATCH',
    body: { sha: commit.sha, force: true }
  })

  return commit.sha
}
