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
import { City } from "./city";

@ObjectType()
@Entity()
export class Hotel extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    code: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    body: string;

    @Field()
    @Column()
    details: string;

    @Field(() => City)
    @ManyToOne(() => City, (city) => city.hotels)
    city: City;

    @Field()
    @Column()
    cityId: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
