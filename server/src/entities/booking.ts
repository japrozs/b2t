import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./user";
import { Hotel } from "./hotel";

@ObjectType()
@Entity()
export class Booking extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ default: "{}" })
    details: string;

    @Field()
    @Column({ default: false })
    cancelled: boolean;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.bookings)
    creator: User;

    @Field()
    @Column()
    creatorId: number;

    @Field(() => Hotel)
    @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
    hotel: Hotel;

    @Field()
    @Column()
    hotelId: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
