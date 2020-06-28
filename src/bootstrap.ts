/**
 * @fileoverview Application bootstrapping - attach path aliases, init reflection metadata and source mapping
 */

import 'reflect-metadata';
import 'source-map-support/register';
import { register } from 'tsconfig-paths';

const tsconfig = require('../tsconfig.json');

register({
    baseUrl: __dirname,
    paths: tsconfig.compilerOptions.paths
});
