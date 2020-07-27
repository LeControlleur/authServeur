/* jshint indent: 2 */
const Sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('commercial', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nom_commercial: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		prenoms_commercial: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		code_commercial: {
			type: DataTypes.STRING(45),
			allowNull: true,
			unique: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		sequelize,
		tableName: 'commercial'
	});
};
