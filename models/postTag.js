module.exports = (sequelize, DataTypes) => {
    const PostTag = sequelize.define('PostTag', {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return PostTag;
};
