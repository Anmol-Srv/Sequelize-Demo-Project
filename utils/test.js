const { User, Profile, Post, Tag } = require('../models');

async function createTestData() {
    try {
        // Create a new user
        const user = await User.create({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com'
        });

        // Create a profile for the user
        const profile = await Profile.create({
            bio: 'Software Engineer',
            userId: user.id
        });

        // Create some posts for the user
        const post1 = await Post.create({
            title: 'First Post',
            content: 'This is my first post.',
            userId: user.id
        });

        const post2 = await Post.create({
            title: 'Second Post',
            content: 'This is my second post.',
            userId: user.id
        });

        // Create some tags
        const tag1 = await Tag.create({ name: 'Tech' });
        const tag2 = await Tag.create({ name: 'Programming' });

        // Associate tags with posts
        await post1.addTags([tag1, tag2]);
        await post2.addTag(tag2);

        console.log('Test data created successfully!');
    } catch (error) {
        console.error('Error creating test data:', error);
    }
}

createTestData();
