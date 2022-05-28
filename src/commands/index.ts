import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node'
import fs from 'fs'
import chalk from 'chalk'
import prompts from 'prompts'

export default async function (dir: string) {
    const remoteUrl = await git.getConfig({
        fs,
        dir,
        path: 'remote.origin.url',
    })

    try {
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
    }
    catch (e: any) {
        if (e.data.statusCode === 401) {
            console.log(chalk.red('⛑  Unforunately, currently we are not supporting private repository at the moment!'))
            process.exit(1)
        }
    }

    const localBranches = await git.listBranches({ fs, dir })
    const remoteBranches = await git.listBranches({
        fs,
        dir,
        remote: 'origin',
    })

    const { confirmation } = await prompts({
        type: 'confirm',
        name: 'confirmation',
        message: 'Are you sure you want to prune all completed branches in your local ?',
        initial: true
    })

    if (!confirmation) {
        console.log(chalk.green('😁 Ok, we will not do it. See you again!'))
        process.exit(0)
    }

    localBranches
        .filter(ref => !remoteBranches.includes(ref))
        .forEach(async (ref) => {
            await git.deleteBranch({
                fs,
                dir,
                ref
            })
            console.log(chalk.green(`Pruning ${ref} completed`))
        })

    console.log(chalk.bgGreen('🚀 All good my friends!'))
}
