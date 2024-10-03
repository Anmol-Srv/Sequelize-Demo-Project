module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    }, {
        hooks: {
            afterCreate: (user) => {
                console.log(`New user registered: ${user.firstName} ${user.lastName} (Email: ${user.email})`);
            }
        }
    });

    // Associations
    User.associate = function (models) {
        // One-to-One: User has one Profile
        User.hasOne(models.Profile, { foreignKey: 'userId' });
        models.Profile.belongsTo(User, { foreignKey: 'userId' });

        // One-to-Many: User has many Posts
        User.hasMany(models.Post, { foreignKey: 'userId' });
        models.Post.belongsTo(User, { foreignKey: 'userId' });
    };

    return User;
};
