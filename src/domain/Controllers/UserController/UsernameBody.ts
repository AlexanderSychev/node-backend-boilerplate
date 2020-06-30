import { IsString, IsNotEmpty } from 'class-validator';

export default class UsernameBody {
    @IsString()
    @IsNotEmpty()
    public username: string;
}
