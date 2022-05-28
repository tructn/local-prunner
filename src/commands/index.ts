import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node'
import fs from 'fs'
import cowsay from 'cowsay'
import chalk from 'chalk'

export default async function (dir: string) {
    const remoteUrl = await git.getConfig({
        fs,
        dir,
        path: 'remote.origin.url',
    })

    await git.fetch({
        fs,
        http,
        dir,
        url: remoteUrl,
        ref: 'main',
        depth: 1,
        singleBranch: true,
        tags: false,
        prune: true,

    })

    const localBranches = await git.listBranches({ fs, dir })
    const remoteBranches = await git.listBranches({
        fs,
        dir,
        remote: 'origin',
    })

    localBranches
        .filter(ref => !remoteBranches.includes(ref))
        .forEach(async (ref) => {
            await git.deleteBranch({
                fs,
                dir,
                ref: ref
            })
        })

    process.stdout.write(chalk.bgGreen('Prune completed!'))
}
