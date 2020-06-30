import { Container } from 'inversify';

export default abstract class ApplicationModule {
    public readonly name: string;

    /** The modules this module depends on - the will be loaded and initialized before this module */
    private dependencies: ApplicationModule[];

    private isLoaded: boolean = false;

    protected constructor(name: string, dependencies: ApplicationModule[] = []) {
        this.name = name;
        this.dependencies = dependencies;
    }

    /** Load module - async function to bind all IoC dependencies and load dependent modules */
    public async load(container: Container): Promise<void> {
        if (!this.isLoaded) {
            console.info(`Module "${this.name}" loading...`);
            for (const dependency of this.dependencies) {
                await dependency.load(container);
            }
            await this.loadInternal(container);
            this.isLoaded = true;
            console.info(`Module "${this.name}" loaded.`);
        } else {
            console.info(`Module "${this.name}" already loaded, skip it.`);
        }
    }

    /** Override this method to bind module's IoC dependencies */
    protected abstract loadInternal(container: Container): Promise<void>
}
