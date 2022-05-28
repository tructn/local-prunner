#!/usr/bin/env node

import { createCommand } from 'commander'
import lp from './commands'
import cowsay from 'cowsay'

const cli = createCommand()
cli
    .command('prune')
    .name('prune')
    .description(cowsay.say({
        e: "oO",
        T: "U ",
        text: 'Delete merged branched in your local'
    }))
    .argument('[path]', 'Git directory')
    .action(lp)
    .usage('prune [path]')

cli.parse(process.argv)