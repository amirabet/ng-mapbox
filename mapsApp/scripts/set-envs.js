const { writeFileSync, mkdirSync } = require('fs');

require ('dotenv').config();

const targetPath='./src/environments/';
const targetFile='environment.ts';

const envFilecontent= `export const enviroment = {
    mapbox_key: "${ process.env['MAPBOX_KEY'] }",
};`;

mkdirSync(targetPath, { recursive: true });

writeFileSync( targetPath + targetFile, envFilecontent);