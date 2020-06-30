import { IsString, IsOptional } from 'class-validator';

export default class EditArticleBody {
    @IsOptional()
    @IsString()
    public title: string;

    @IsOptional()
    @IsString()
    public content: string;
}
