import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Hotel } from "./hotel";

@ObjectType()
@Entity()
export class City extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: false })
    code: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    countryName: string;

    @Field()
    @Column()
    countryCode: string;

    @Field(() => [Hotel])
    @OneToMany(() => Hotel, (hotel) => hotel.city)
    hotels: Hotel[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
