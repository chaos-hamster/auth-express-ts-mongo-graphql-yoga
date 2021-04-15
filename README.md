# node-ts

start in terminal in PARENT folder run 
git clone git@github.com:chaos-hamster/node-ts.git
cd node-ts
npm init -y
npm i -D typescript tslint
npm i express
npm i -D @types/express
tsc --init

// I had to run npm install -g typescript to get tsc to work


./node_modules/.bin/tslint --init

update tslint.json:

{
  "defaultSeverity": "error",
  "extends": ["tslint:recommended"],
  "jsRules": {},
  "rules": {
    "no-console": false
  },
  "rulesDirectory": []
}

By default, the TypeScript linter prevents the use of debugging using console statements, hence the need to explicitly tell the linter to revoke the default no-console rule.

Add a src folder and src/app.ts

    npm start