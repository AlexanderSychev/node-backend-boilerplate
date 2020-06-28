import ApplicationModule from './ApplicationModule';
import { container } from './ioc';

export default class Application {
    private entryModules: ApplicationModule[];

    public constructor(entryModules: ApplicationModule | ApplicationModule[]) {
        this.entryModules = Array.isArray(entryModules) ? entryModules : [entryModules];
    }

    public async bootstrap() {
        this.loadAllModules();
        await this.initAllModules();
    }

    private loadAllModules(): void {
        for (const entryModule of this.entryModules) {
            entryModule.load(container);
        }
    }

    private async initAllModules(): Promise<void> {
        for (const entryModule of this.entryModules) {
            await entryModule.init(container);
        }
    }
}
