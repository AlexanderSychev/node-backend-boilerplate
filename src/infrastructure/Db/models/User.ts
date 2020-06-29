import { PrimaryColumn, Column, Entity, OneToMany } from 'typeorm';

import Article from './Article';

@Entity({ name: 'users' })
export default class User {
    @PrimaryColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'created_at' })
    public createdAt: Date;

    @OneToMany(_ => Article, article => article.author)
    public articles: Article[];
}
