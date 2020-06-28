import { JsonController, Get } from 'routing-controllers';

@JsonController('/hello')
export default class HelloController {
    @Get()
    public sayHello() {
        return { message: 'Hello, World' };
    }
}
