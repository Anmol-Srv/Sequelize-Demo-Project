module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Associations
    Tag.associate = function (models) {
        // Tag belongs to many Posts (Many-to-Many relationship through PostTag)
        Tag.belongsToMany(models.Post, { through: models.PostTag, foreignKey: 'tagId' });
    };

    return Tag;
};
