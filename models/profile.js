module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    // Associations
    Profile.associate = function (models) {
        // Profile belongs to a User (One-to-One relationship)
        Profile.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Profile;
};
