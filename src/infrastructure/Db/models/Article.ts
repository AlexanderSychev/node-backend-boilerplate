import { PrimaryColumn, Column, Entity, ManyToOne } from 'typeorm';

import User from './User';

@Entity({ name: 'articles' })
export default class Article {
    @PrimaryColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'title' })
    public title: string;

    @Column({ name: 'content' })
    public content: string;

    @Column({ name: 'created_at' })
    public createdAt: Date;

    @Column({ name: 'updated_at' })
    public updatedAt: Date;

    @Column({ name: 'author_id' })
    public authorId: number;

    @ManyToOne(_ => User, user => user.articles)
    public author: User;
}
