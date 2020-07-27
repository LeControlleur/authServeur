/* jshint indent: 2 */
const bcrypt = require("bcrypt")
const Sequelize = require("sequelize")



module.exports = function (sequelize, DataTypes) {
	return sequelize.define('connexion', {
		idconnexion: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		login: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},
		mot_de_passe: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: "User@123"
		},
		Agent_production_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
			references: {
				model: {
					tableName: 'Agent_production',
				},
				key: 'id'
			}
		},
		commercial_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
			references: {
				model: {
					tableName: 'commercial',
				},
				key: 'id'
			}
		},
		logged: {
			type: DataTypes.ENUM('0', '1'),
			allowNull: false,
			defaultValue: "0"
		},
		idprofils: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
			references: {
				model: {
					tableName: 'profils',
				},
				key: 'id'
			}
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
		tableName: 'connexion',
		hooks: {
			beforeCreate: (user, options) => {
				user.mot_de_passe = bcrypt.hashSync(user.mot_de_passe, bcrypt.genSaltSync(8))
			},
			beforeUpdate: (user, options) => {
				user.mot_de_passe = bcrypt.hashSync(user.mot_de_passe, bcrypt.genSaltSync(8))
			}
		}

	});
};
