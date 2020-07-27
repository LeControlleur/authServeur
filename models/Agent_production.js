/* jshint indent: 2 */
const Sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes) {


	return sequelize.define('Agent_production', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nom_agent: {
			type: DataTypes.STRING(250),
			allowNull: true,
			unique: true
		},
		prenoms_agent: {
			type: DataTypes.STRING(250),
			allowNull: true,
			unique: true
		},
		responsable: {
			type: DataTypes.ENUM('0', '1'),
			allowNull: false,
			defaultValue: "0"
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
		tableName: 'Agent_production',
	});


};
