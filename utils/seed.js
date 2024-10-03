const { User, Profile, Post, Tag } = require('../models');

async function seedData() {
    try {
        // Create Users
        const user1 = await User.create({ firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com' });
        const user2 = await User.create({ firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com' });
        const user3 = await User.create({ firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com' });
        const user4 = await User.create({ firstName: 'Diana', lastName: 'Doe', email: 'diana@example.com' });
        const user5 = await User.create({ firstName: 'Eve', lastName: 'Adams', email: 'eve@example.com' });

        // Create Profiles (One-to-One)
        await Profile.create({ bio: 'Alice is a web developer', userId: user1.id });
        await Profile.create({ bio: 'Bob is a software engineer', userId: user2.id });
        await Profile.create({ bio: 'Charlie is a data scientist', userId: user3.id });
        await Profile.create({ bio: 'Diana is a project manager', userId: user4.id });
        await Profile.create({ bio: 'Eve is a UI/UX designer', userId: user5.id });

        // Create Posts (One-to-Many) with statuses
        const post1 = await Post.create({ title: 'Alice’s first post', content: 'Alice discusses web development tips.', userId: user1.id, status: 'active' });
        const post2 = await Post.create({ title: 'Alice’s second post', content: 'Exploring JavaScript frameworks.', userId: user1.id, status: 'draft' });
        const post3 = await Post.create({ title: 'Bob’s first post', content: 'Understanding the software development life cycle.', userId: user2.id, status: 'archived' });
        const post4 = await Post.create({ title: 'Charlie’s first post', content: 'An introduction to data science.', userId: user3.id, status: 'active' });
        const post5 = await Post.create({ title: 'Diana’s first post', content: 'Managing software projects effectively.', userId: user4.id, status: 'draft' });
        const post6 = await Post.create({ title: 'Eve’s first post', content: 'Designing for mobile applications.', userId: user5.id, status: 'archived' });
        const post7 = await Post.create({ title: 'Bob’s second post', content: 'Version control with Git.', userId: user2.id, status: 'active' });
        const post8 = await Post.create({ title: 'Alice’s third post', content: 'Introduction to CSS Grid.', userId: user1.id, status: 'active' });

        // Create Tags (Many-to-Many)
        const tag1 = await Tag.create({ name: 'Technology' });
        const tag2 = await Tag.create({ name: 'Programming' });
        const tag3 = await Tag.create({ name: 'Lifestyle' });
        const tag4 = await Tag.create({ name: 'Management' });
        const tag5 = await Tag.create({ name: 'Data Science' });
        const tag6 = await Tag.create({ name: 'Design' });
        const tag7 = await Tag.create({ name: 'Web Development' });

        // Associate Tags with Posts (Many-to-Many)
        await post1.addTags([tag1, tag2, tag7]); // Alice's first post (Web development, technology)
        await post2.addTags([tag2, tag7]); // Alice's second post (Programming, web development)
        await post3.addTags([tag1, tag4]); // Bob's first post (Technology, Management)
        await post4.addTags([tag1, tag5]); // Charlie's first post (Technology, Data Science)
        await post5.addTags([tag1, tag4]); // Diana's first post (Technology, Management)
        await post6.addTags([tag6, tag3]); // Eve's first post (Design, Lifestyle)
        await post7.addTags([tag2]); // Bob's second post (Programming)
        await post8.addTags([tag7]); // Alice's third post (Web Development)

        console.log('Data populated successfully with more users, posts, statuses, and tags.');
    } catch (error) {
        console.error('Error populating data:', error);
    }
}

seedData();
