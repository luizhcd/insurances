import { Model, DataType, Table, Column, Default, BeforeCreate, Unique } from "sequelize-typescript";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
@Table({
    timestamps: true,
    tableName: "users",
    modelName: "User"
})

class User extends Model {

    @Unique
    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare username: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare password: string

    @Default(true)
    @Column
    declare active: boolean

    @BeforeCreate
    static async encrypPassword(instance: User) {
        const salt = await bcrypt.genSalt(10)
        instance.password = await bcrypt.hash(instance.password, salt)
    }

    async comparePassword(canditatePassword) {
        const isMatch = await bcrypt.compare(canditatePassword, this.password)
        return isMatch
    }

    createJWT() {
        return jwt.sign(
            { userId: this.id, name: this.username },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_LIFETIME,
            }
        )
    }
}




export default User





