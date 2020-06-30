import { IsString, IsNotEmpty, IsPositive } from 'class-validator';

export default class CreateArticleBody {
    @IsPositive()
    authorId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
