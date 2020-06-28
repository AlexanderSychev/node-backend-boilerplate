import './bootstrap';

import { Application, container } from '@core';
import Http, { Server, IServer } from '@infrastructure/Http';

function onSuccess() {
    const server = container.get<IServer>(Server)
    server.start();
}

function onFailure(err: any) {
    console.error(err);
    process.exit(1);
}

const app = new Application(Http);
app.bootstrap().then(onSuccess, onFailure);
