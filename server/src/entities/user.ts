import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    companyName: string;

    @Field()
    @Column()
    number: string;

    @Field()
    @Column()
    PANNumber: string;

    @Field()
    @Column()
    PANName: string;

    @Field()
    @Column()
    GSTNumber: string;

    @Field()
    @Column()
    address: string;

    @Field()
    @Column()
    country: string;

    @Field()
    @Column()
    state: string;

    @Field()
    @Column()
    city: string;

    @Field()
    @Column()
    pinCode: string;

    // @Field()
    // @Column({ default: false })
    // verified: boolean;

    // @Column()
    // verificationCode: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
