import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import getDbConnection from '../db-connection';

export interface OrderModelFields
  extends Model<
    InferAttributes<OrderModelFields>,
    InferCreationAttributes<OrderModelFields>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  deliveryAddress: string;
  externalIdentifier: string;
  userId: number;
  productId: number;
  paymentTermsInDays: number;
}

export function getOrderModel() {
  const orderModel = getDbConnection().define<OrderModelFields>(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      externalIdentifier: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      paymentTermsInDays: {
        type: DataTypes.INTEGER,
      },
      productId: {
        type: DataTypes.INTEGER,
      },
    },
    { freezeTableName: true }
  );

  orderModel.belongsTo(getCountryModel(), {
    foreignKey: {
      name: 'countryId',
    },
  });

  return orderModel;
}

export function getCountryModel() {
  return getDbConnection().define(
    'Country',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
}
