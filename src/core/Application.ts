import ApplicationModule from './ApplicationModule';
import { container } from './ioc';

export default class Application {
    private entryModules: ApplicationModule[];

    public constructor(entryModules: ApplicationModule | ApplicationModule[]) {
        this.entryModules = Array.isArray(entryModules) ? entryModules : [entryModules];
    }

    public async bootstrap() {
        console.info('Application bootstrap..');
        for (const entryModule of this.entryModules) {
            await entryModule.load(container);
        }
        console.log('Application ready to work');
    }
}
