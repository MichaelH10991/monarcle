# monarcle.io

Its a game like Wordle, but for English kings and queens, particularly medieval ones. Its entirely UI driven which means it doesnt have a dependency on a database or any kind of backend. It works by cycling through a predefined list of monarchs depending on what day it is. Its not the best solution but its simple.

# Development

## Versions

- node: 18.20.8
- npm: 16.14.2

# Start ui

- Start monarcle: `npm start`
- Start a different game: `npm run start:<name>`

# Start a specfic flavour

`npm start:app "monarcle"`

# Build ui

`npm run build`

# Deploy ui

- Deploy `npm run deploy`
- Deploy a specific game `npm run deploy:<name>`

# Contributing

- Checkout `develop`
- Make the change.
- Commit the changes.
- Push the changes to `develop`.
