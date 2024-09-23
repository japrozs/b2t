import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Hotel } from "./hotel";
import { User } from "./user";

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

    @Field()
    @Column({ default: "{}" })
    roomDetails: string;

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
