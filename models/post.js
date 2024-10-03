module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'draft', 'archived'),
            defaultValue: 'draft'
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        scopes: {
            active: { where: { status: 'active' } },
            archived: { where: { status: 'archived' } },
            draft: { where: { status: 'draft' } }
        },
        hooks: {
            afterCreate: async (post) => {
                const user = await post.getUser();
                console.log(`New post created by ${user.firstName} ${user.lastName}: Title - "${post.title}", Status - ${post.status}`);
            }
        }
    });

    // Associations
    Post.associate = function (models) {
        // Post belongs to a User (One-to-Many)
        Post.belongsTo(models.User, { foreignKey: 'userId' });

        // Many-to-Many: Post belongs to many Tags, and Tag belongs to many Posts
        Post.belongsToMany(models.Tag, { through: models.PostTag, foreignKey: 'postId' });
        models.Tag.belongsToMany(Post, { through: models.PostTag, foreignKey: 'tagId' });
    };

    return Post;
};
