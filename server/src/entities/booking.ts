import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class Booking extends BaseEntity {
    @Field()
    @PrimaryColumn()
    id: string;

    @Field()
    @Column()
    details: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.bookings)
    creator: User;

    @Field()
    @Column()
    creatorId: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
