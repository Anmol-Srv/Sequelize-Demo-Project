const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sequelize_demo', 'demo_user', 'password123', {
  host: 'localhost',
  dialect: 'postgres'  // Switch the dialect to 'postgres'
});

const User = require('./user')(sequelize, DataTypes);
const Profile = require('./profile')(sequelize, DataTypes);
const Post = require('./post')(sequelize, DataTypes);
const Tag = require('./tag')(sequelize, DataTypes);
const PostTag = require('./postTag')(sequelize, DataTypes);

// Associations
User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.belongsToMany(Tag, { through: PostTag, foreignKey: 'postId' });
Tag.belongsToMany(Post, { through: PostTag, foreignKey: 'tagId' });

module.exports = {
  sequelize,
  User,
  Profile,
  Post,
  Tag,
  PostTag
};
