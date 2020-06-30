import { lazyInject } from '@core';
import { ArticleUseCases, UserUseCases } from '@domain/UseCases';
import {
    JsonController,
    Get,
    Post,
    Put,
    Param,
    Body,
    Delete,
    OnUndefined,
    HttpCode,
    OnNull,
} from 'routing-controllers';

import UsernameBody from './UsernameBody';

@JsonController('/user')
export default class UserController {
    @lazyInject(UserUseCases)
    private userUseCases: UserUseCases;

    @lazyInject(UserUseCases)
    private articleUseCases: ArticleUseCases;

    @Post('/')
    @HttpCode(201)
    public createNewUser(@Body() body: UsernameBody) {
        this.userUseCases.createNewUser(body.username);
    }

    @Get('/:id(\\d+)')
    public getUserById(@Param('id') id: number) {
        return this.userUseCases.getUserById(id);
    }

    @Put('/:id(\\d+)')
    public renameUser(
        @Param('id') id: number,
        @Body() body: UsernameBody
    ) {
        return this.userUseCases.renameUser(id, body.username);
    }

    @Delete('/:id(\\d+)')
    @OnNull(204)
    @OnUndefined(204)
    public removeUser(@Param('id') id: number) {
        return this.userUseCases.removeUser(id);
    }

    @Get('/:id(\\d+)/articles')
    public getUserArticles(@Param('id') id: number) {
        return this.articleUseCases.getArticlesByAuthor(id);
    }
}
