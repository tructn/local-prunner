#!/usr/bin/env node

import { createCommand } from 'commander'
import command from './commands'
import cowsay from 'cowsay'

const cli = createCommand()
cli
    .description(cowsay.say({
        e: "oO",
        T: "U ",
        text: 'Delete merged branched in your local'
    }))
    .argument('[path]', 'Git directory')
    .action(command)
    .usage('prune [path]')

cli.parse(process.argv)