import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import User from 'models/User';
import mongoose from 'mongoose';

dotenv.config();

const setup = async () => {
  let client;

  try {
    client = await mongoose.connect(process.env.MONGODB_URI);

    const hasData = await User.countDocuments().lean();

    if (hasData) {
      console.log('Database already exists with data');
      mongoose.disconnect();
      return;
    }

    const records = [...Array(10)].map(() => {
      const [fName, lName] = faker.name.findName().split(' ');
      const username = faker.internet.userName(fName, lName);
      const email = faker.internet.email(fName, lName);
      const image = faker.image.people(640, 480, true);

      return {
        name: `${fName} ${lName}`,
        username,
        email,
        image,
        followers: 0,
        emailVerified: null
      };
    });

    const insert = await User
      .insertMany(records);

    if (insert.acknowledged) {
      console.log('Successfully inserted records');
    }
  } catch (error) {
    return 'Database is not ready yet';
  } finally {
    if (mongoose) {
      await mongoose.disconnect();
    }
  }
};

try {
  setup();
} catch {
  console.warn('Database is not ready yet. Skipping seeding...');
}

export { setup };
