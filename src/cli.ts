#!/usr/bin/env node

import { createCommand } from 'commander'
import lp from './commands/lp'
import cowsay from 'cowsay'

const cli = createCommand()
cli
    .command('lp')
    .name('lp')
    .description(cowsay.say({
        e: "oO",
        T: "U ",
        text: 'You want to prune your completed local branches ?'
    }))
    .argument('[path]', 'Your local git workspace')
    .option('-v, --verbose', "Show all the log")
    .action(lp)
    .usage('lp <path> [-v,--verbose]')

cli.parse(process.argv)