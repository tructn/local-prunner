#!/usr/bin/env node

import { createCommand } from 'commander'
import lp from './commands'
import cowsay from 'cowsay'

const cli = createCommand()
cli
    .command('lp')
    .name('lp')
    .description(cowsay.say({
        e: "oO",
        T: "U ",
        text: 'Delete merged branched in your local'
    }))
    .argument('[path]', 'Git directory')
    .action(lp)
    .usage('lp <path>')

cli.parse(process.argv)