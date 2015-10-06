# Welcome to napchart

Napchart is an online visualization tool for creating polyphasic sleep schedules. It lets you design your sleep patterns by creating sleep blocks and dragging them around. Hopefully, this tool will help making polyphasic sleep easier to experiement with, and maybe contribute to more research on the subject.

## How to install

To install napchart you will need the following:

* Node.js
* npm
* (optional) A MySQL server

1. Run `npm install` from the command line in the napchart directory
2. Start the server `node script`

You should now be able to access napchart from `localhost:3000`

### MySQL Configuration

If you want to enable chart saving, you will need to set up your MySQL configuration

1. Run `node script --setup` and enter your credentials. They will be saved in `config.json` in the project root, so you can edit this manually if you like.
2. Run `node script --create-tables` to create tables. If you want to, you can choose to delete existing tables first.

Chart saving should now be enabled and will show up on the site.

## How to contribute