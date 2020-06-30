import { IsBoolean } from 'class-validator';

export default class GetArticleByIdQuery {
    @IsBoolean()
    withAuthor: boolean;
}
