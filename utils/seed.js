// Importing the User, Profile, Post, and Tag models from the models directory.
// These models represent tables in our database, and allow us to create records (rows) for each resource.
const { User, Profile, Post, Tag } = require('../models');

// Defining an async function to seed the database with initial data.
// We use an async function here because we need to wait for the data to be created in the database sequentially.
async function seedData() {
    try {
        // Creating users in the database.
        // Each user has basic details like first name, last name, and email.
        // This setup allows us to test user-specific functionality and relationships with other models.
        const user1 = await User.create({ firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com' });
        const user2 = await User.create({ firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com' });
        const user3 = await User.create({ firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com' });
        const user4 = await User.create({ firstName: 'Diana', lastName: 'Doe', email: 'diana@example.com' });
        const user5 = await User.create({ firstName: 'Eve', lastName: 'Adams', email: 'eve@example.com' });

        // Creating profiles for each user.
        // Profile has a one-to-one relationship with User, so each profile is linked to a specific user through the userId field.
        // This lets us simulate a scenario where each user has personal information associated with them.
        await Profile.create({ bio: 'Alice is a web developer', userId: user1.id });
        await Profile.create({ bio: 'Bob is a software engineer', userId: user2.id });
        await Profile.create({ bio: 'Charlie is a data scientist', userId: user3.id });
        await Profile.create({ bio: 'Diana is a project manager', userId: user4.id });
        await Profile.create({ bio: 'Eve is a UI/UX designer', userId: user5.id });

        // Creating posts for each user, simulating a one-to-many relationship.
        // Each post has a status (active, draft, archived), which lets us test different query scenarios.
        // For example, we can filter posts by status, or get all posts by a specific user.
        const post1 = await Post.create({ title: 'Alice’s first post', content: 'Alice discusses web development tips.', userId: user1.id, status: 'active' });
        const post2 = await Post.create({ title: 'Alice’s second post', content: 'Exploring JavaScript frameworks.', userId: user1.id, status: 'draft' });
        const post3 = await Post.create({ title: 'Bob’s first post', content: 'Understanding the software development life cycle.', userId: user2.id, status: 'archived' });
        const post4 = await Post.create({ title: 'Charlie’s first post', content: 'An introduction to data science.', userId: user3.id, status: 'active' });
        const post5 = await Post.create({ title: 'Diana’s first post', content: 'Managing software projects effectively.', userId: user4.id, status: 'draft' });
        const post6 = await Post.create({ title: 'Eve’s first post', content: 'Designing for mobile applications.', userId: user5.id, status: 'archived' });
        const post7 = await Post.create({ title: 'Bob’s second post', content: 'Version control with Git.', userId: user2.id, status: 'active' });
        const post8 = await Post.create({ title: 'Alice’s third post', content: 'Introduction to CSS Grid.', userId: user1.id, status: 'active' });

        // Creating tags for categorizing posts.
        // This setup lets us simulate a many-to-many relationship between Posts and Tags.
        const tag1 = await Tag.create({ name: 'Technology' });
        const tag2 = await Tag.create({ name: 'Programming' });
        const tag3 = await Tag.create({ name: 'Lifestyle' });
        const tag4 = await Tag.create({ name: 'Management' });
        const tag5 = await Tag.create({ name: 'Data Science' });
        const tag6 = await Tag.create({ name: 'Design' });
        const tag7 = await Tag.create({ name: 'Web Development' });

        // Associating tags with posts to simulate post categorization.
        // By adding tags to posts, we create a realistic many-to-many relationship.
        // Example: Alice's first post is tagged with 'Technology', 'Programming', and 'Web Development'.
        await post1.addTags([tag1, tag2, tag7]);
        await post2.addTags([tag2, tag7]);
        await post3.addTags([tag1, tag4]);
        await post4.addTags([tag1, tag5]);
        await post5.addTags([tag1, tag4]);
        await post6.addTags([tag6, tag3]);
        await post7.addTags([tag2]);
        await post8.addTags([tag7]);

        // Logging success message after all data is populated.
        console.log('Data populated successfully with more users, posts, statuses, and tags.');
    } catch (error) {
        // If there is any error during the seeding process, log it here.
        console.error('Error populating data:', error);
    }
}

// Calling the seedData function to execute the seeding process.
// This function will populate the database with the sample data defined above.
seedData();
