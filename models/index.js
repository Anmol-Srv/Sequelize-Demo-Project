const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sequelize_demo', 'demo_user', 'password123', {
  logging : false,
  host: 'localhost',
  dialect: 'postgres'  // Switch the dialect to 'postgres'
});

const User = require('./user')(sequelize, DataTypes);
const Profile = require('./profile')(sequelize, DataTypes);
const Post = require('./post')(sequelize, DataTypes);
const Tag = require('./tag')(sequelize, DataTypes);
const PostTag = require('./postTag')(sequelize, DataTypes);

// Associations
// Associations help describe how this model relates to other models in the application.

// One-to-One Relationship with Profile:
// - User.hasOne(Profile): Indicates that each User has one Profile.
// - foreignKey: 'userId' sets up the relationship, linking the Profile to the User.
// - Scenario:
//   - This setup allows each user to have additional details, like a bio, stored in a separate Profile table.
//   - We use Profile.belongsTo(User) on the Profile model to complete the association, allowing retrieval of user information along with their profile.
User.hasOne(Profile, { foreignKey: 'userId' });
// One-to-Many Relationship with Post:
// - User.hasMany(Post): Indicates that each User can have multiple Posts.
// - foreignKey: 'userId' links each post to a specific user, who acts as the post's author.
// - Scenario:
//   - This setup models a blogging platform or social media application where each user can create multiple posts.
//   - The Post model has Post.belongsTo(User) to complete this association, allowing us to retrieve posts along with the user details of the author.
User.hasMany(Post, { foreignKey: 'userId' });

// Associating Profile with User in a one-to-one relationship.
// - Profile.belongsTo(User): Indicates that each Profile is linked to exactly one User.
// - foreignKey: 'userId' ensures the userId field in Profile references the id field in User.
// Scenario:
// - This relationship lets us easily retrieve a user's profile information.
// - For example, when displaying a user's profile page, we can fetch the associated bio using this link.
Profile.belongsTo(User, { foreignKey: 'userId' });

// Associating the Post model with the User model in a one-to-many relationship.
// Scenario:
// - A user can create multiple posts, but each post is associated with only one user (the author).
// - This association is set up with `Post.belongsTo(models.User)`, meaning each post references a user.
Post.belongsTo(User, { foreignKey: 'userId' });
// Defining a many-to-many relationship between Post and Tag models through the join table 'PostTag'.
// Scenario:
// - Each post can be associated with multiple tags (e.g., categories or labels like 'Technology' or 'Programming').
// - Similarly, a tag can be linked to multiple posts, allowing for content categorization.
// - By defining `Post.belongsToMany(models.Tag)` and `Tag.belongsToMany(Post)`,
//   we enable the ability to add, remove, or query tags related to each post.
Post.belongsToMany(Tag, { through: PostTag, foreignKey: 'postId' });

// Associating Tag with Post in a many-to-many relationship, using the PostTag join table.
// - Tag.belongsToMany(models.Post): Indicates that each Tag can be linked to multiple Posts.
// - through: models.PostTag specifies that the relationship is managed by the PostTag table.
// - foreignKey: 'tagId' sets the key in the PostTag table that references the Tag.
// Scenario:
// - This association enables posts to be organized by multiple tags.
// - It also allows tags to group various posts under the same category, such as "Technology" or "Health".
Tag.belongsToMany(Post, { through: PostTag, foreignKey: 'tagId' });

// Initialize associations after all models are defined

module.exports = {
  sequelize,
  User,
  Profile,
  Post,
  Tag,
  PostTag
};
