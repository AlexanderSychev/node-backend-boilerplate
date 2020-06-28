import { resolve as pathResolve, join as pathJoin } from 'path';
import { constants, promises } from 'fs';
import { Document, parseDocument } from 'yaml';

const { F_OK } = constants;
const { access, readFile } = promises;
const ENV = process.env.NODE_ENV;
const CONFIG_DIR = pathResolve(__dirname, '../../../config');

export default class YamlLoader {
    private readonly envConfigPath: string = pathJoin(CONFIG_DIR, `${ENV}.yml`);

    private readonly defaultConfigPath: string = pathJoin(CONFIG_DIR, 'default.yml');

    public async load(): Promise<Document.Parsed> {
        let content: string;
        
        if (await this.exists(this.envConfigPath)) {
            content = await readFile(this.envConfigPath, 'utf-8');
        } else if (await this.exists(this.defaultConfigPath)) {
            content = await readFile(this.defaultConfigPath, 'utf-8');
        } else {
            throw new Error('No configuration file. At least "default.yml" file must exist.')
        }

        return parseDocument(content);
    }

    private async exists(path: string): Promise<boolean> {
        let exists: boolean;

        try {
            await access(path, F_OK);
            exists = true;
        } catch (err) {
            exists = false;
        }

        return exists;
    }
}
