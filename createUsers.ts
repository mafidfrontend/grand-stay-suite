import admin from 'firebase-admin';
import { hotelData } from './src/lib/demoData.ts';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./mehmonxona.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const auth = admin.auth();

async function createUsers() {
  try {
    // Create director user
    await auth.createUser({
      email: 'director@hotel.com',
      password: 'password123',
      displayName: 'Director Admin',
    });
    console.log('✅ Created director user');

    // Create admin user
    await auth.createUser({
      email: 'admin@hotel.com',
      password: 'password123',
      displayName: 'Branch Manager',
    });
    console.log('✅ Created admin user');

    // Create client user
    await auth.createUser({
      email: 'client@hotel.com',
      password: 'password123',
      displayName: 'John Smith',
    });
    console.log('✅ Created client user');

    console.log('✅ All users created successfully!');
    console.log('\nTest credentials:');
    console.log('Director: director@hotel.com / password123');
    console.log('Admin: admin@hotel.com / password123');
    console.log('Client: client@hotel.com / password123');

  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
      console.log('⚠️  Users already exist, skipping creation');
    } else {
      console.error('❌ Error creating users:', error.message);
    }
  }
}

createUsers().catch(console.error); 