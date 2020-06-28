import { Container } from 'inversify';
import inversifyInjectDecorators from 'inversify-inject-decorators'

export const container = new Container({ defaultScope: 'Singleton' });

export const { lazyInject } = inversifyInjectDecorators(container, true);
