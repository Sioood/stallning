/**
 * Git operations for repository management
 */

import { spawn } from 'node:child_process'
import { access, rm } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Check if directory has a git repository
 */
export async function hasGitRepo(dir: string): Promise<boolean> {
  try {
    await access(join(dir, '.git'))
    return true
  } catch {
    return false
  }
}

/**
 * Execute git command and return stdout
 */
async function gitExec(
  args: string[],
  cwd: string,
): Promise<{ success: boolean; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const proc = spawn('git', args, { cwd })
    let stdout = ''
    let stderr = ''

    proc.stdout?.on('data', (data) => {
      stdout += data.toString()
    })

    proc.stderr?.on('data', (data) => {
      stderr += data.toString()
    })

    proc.on('close', (code) => {
      resolve({ success: code === 0, stdout, stderr })
    })

    proc.on('error', () => {
      resolve({ success: false, stdout, stderr })
    })
  })
}

/**
 * Get the origin remote URL if it exists
 */
async function getOriginUrl(dir: string): Promise<string | null> {
  const result = await gitExec(['remote', 'get-url', 'origin'], dir)
  return result.success ? result.stdout.trim() : null
}

/**
 * Reset git history with fresh initial commit, preserving origin remote
 */
export async function resetGitHistory(
  dir: string,
  projectName: string,
): Promise<{ success: boolean; originPreserved?: boolean; error?: string }> {
  // Capture origin URL before wiping
  const originUrl = await getOriginUrl(dir)

  const gitDir = join(dir, '.git')

  // Remove existing .git directory
  try {
    await rm(gitDir, { recursive: true, force: true })
  } catch (error) {
    return {
      success: false,
      error: `Failed to remove .git directory: ${error}`,
    }
  }

  // Initialize new repo
  const initResult = await gitExec(['init'], dir)
  if (!initResult.success) {
    return { success: false, error: 'Failed to initialize git repository' }
  }

  // Restore origin remote if it existed
  if (originUrl) {
    const addOriginResult = await gitExec(['remote', 'add', 'origin', originUrl], dir)
    if (!addOriginResult.success) {
      return { success: false, error: 'Failed to restore origin remote' }
    }
  }

  // Configure git user if not already set
  const userNameResult = await gitExec(['config', 'user.name'], dir)
  if (!userNameResult.stdout.trim()) {
    await gitExec(['config', 'user.name', 'Project Init'], dir)
  }

  const userEmailResult = await gitExec(['config', 'user.email'], dir)
  if (!userEmailResult.stdout.trim()) {
    await gitExec(['config', 'user.email', 'init@localhost'], dir)
  }

  // Stage all files
  const addResult = await gitExec(['add', '.'], dir)
  if (!addResult.success) {
    return { success: false, error: 'Failed to stage files' }
  }

  // Create initial commit
  const commitResult = await gitExec(
    ['commit', '-m', `chore(init): initialize ${projectName}`],
    dir,
  )
  if (!commitResult.success) {
    return { success: false, error: 'Failed to create initial commit' }
  }

  return { success: true, originPreserved: !!originUrl }
}

/**
 * Add upstream remote and fetch
 */
export async function addUpstreamRemote(
  dir: string,
  upstreamUrl: string,
): Promise<{ success: boolean; alreadyExists?: boolean; error?: string }> {
  // Check if remote already exists
  const remoteResult = await gitExec(['remote', 'get-url', 'upstream'], dir)
  if (remoteResult.success) {
    return { success: true, alreadyExists: true }
  }

  // Add remote
  const addResult = await gitExec(['remote', 'add', 'upstream', upstreamUrl], dir)
  if (!addResult.success) {
    return { success: false, error: 'Failed to add upstream remote' }
  }

  // Fetch from upstream
  const fetchResult = await gitExec(['fetch', 'upstream'], dir)
  if (!fetchResult.success) {
    return { success: false, error: 'Added remote but failed to fetch from upstream' }
  }

  return { success: true }
}
