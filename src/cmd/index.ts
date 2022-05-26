import type { Arguments, CommandBuilder } from 'yargs'

type Options = {
    name: string
}

export const command: string = 'lp <name>'
export const desc: string = 'Prune your git local branches seamlessly'

export const builder: CommandBuilder<Options, Options> = yargs =>
    yargs
        .options({
            name: { type: 'string' },
        })
        .positional('name', { type: 'string', demandOption: true })

export const handler = (argv: Arguments<Options>): void => {
    const { name } = argv
    const greeting = `We are going to clean ${name}`

    process.stdout.write(greeting)
    process.exit(1)
}
