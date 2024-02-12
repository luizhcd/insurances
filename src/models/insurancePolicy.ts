import { Model, DataType, Table, Column, Default } from "sequelize-typescript";
@Table({
    timestamps: true,
    tableName: "insurancePolicies",
    modelName: "InsurancePolicy"
})

class InsurancePolicy extends Model {

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare name: string

    @Default(true)
    @Column
    declare active: boolean

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    declare description: string

}

export default InsurancePolicy





