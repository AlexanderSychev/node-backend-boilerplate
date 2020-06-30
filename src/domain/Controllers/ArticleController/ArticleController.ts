import { lazyInject } from '@core';
import { ArticleUseCases } from '@domain/UseCases';
import {
    JsonController,
    Post,
    Put,
    Delete,
    Get,
    Body,
    HttpCode,
    OnUndefined,
    OnNull,
    Param,
    QueryParams
} from 'routing-controllers';

import CreateArticleBody from './CreateArticleBody';
import GetArticleByIdQuery from './GetArticleByIdQuery';
import EditArticleBody from './EditArticleBody';

@JsonController('/article')
export default class ArticleController {
    @lazyInject(ArticleUseCases)
    private articleUseCases: ArticleUseCases;

    @Post('/')
    @HttpCode(201)
    public createArticle(@Body() body: CreateArticleBody) {
        return this.articleUseCases.createNewArticle(body.title, body.content, body.authorId);
    }

    @Get('/:id(\\d+)')
    public getArticleById(@Param('id') id: number, @QueryParams() query: GetArticleByIdQuery) {
        return this.articleUseCases.getArticleById(id, query.withAuthor);
    }

    @Put('/:id(\\d+)')
    public editArticle(@Param('id') id: number, @Body() body: EditArticleBody) {
        return this.articleUseCases.editArticle(id, body)
    }

    @Delete('/:id(\\d+)')
    @OnNull(204)
    @OnUndefined(204)
    public removeArticle(@Param('id') id: number) {
        return this.articleUseCases.removeArticle(id);
    }
}
