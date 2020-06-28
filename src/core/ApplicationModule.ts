import { Container } from 'inversify';

export default abstract class ApplicationModule {
    public readonly name: string;

    /** The modules this module depends on - the will be loaded and initialized before this module */
    private dependencies: ApplicationModule[];

    private isLoaded: boolean = false;

    private isInitialized: boolean = false;

    protected constructor(name: string, dependencies: ApplicationModule[] = []) {
        this.name = name;
        this.dependencies = dependencies;
    }

    /** Load module - sync function to bind all IoC dependencies and load dependent modules */
    public load(container: Container): void {
        if (!this.isLoaded) {
            for (const dependency of this.dependencies) {
                dependency.load(container);
            }
            this.loadInternal(container);
            this.isLoaded = true;
        }
    }

    public async init(container: Container): Promise<void> {
        if (this.isLoaded && !this.isInitialized) {
            for (const dependency of this.dependencies) {
                await dependency.init(container);
            }
            await this.initInternal(container);
            this.isInitialized = true;
        } else if (!this.isLoaded) {
            throw new Error(`Can't initialize module "${this.name}" before it not loaded`);
        }
    }

    /** Override this method to bind module's IoC dependencies which not requires async operations */
    protected loadInternal(_: Container): void {}

    /**
     * Override this method to bind module's IoC dependencies which requires async operations
     * or to do some async initializations
     */
    protected async initInternal(_: Container): Promise<void> {}
}
