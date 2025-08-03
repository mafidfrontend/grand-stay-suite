import admin from 'firebase-admin';
import { hotelData } from './src/lib/demoData.ts';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./mehmonxona.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

async function seedDatabase() {
  // Branches
  for (const branch of hotelData.branches) {
    await db.collection('branches').doc(branch.id).set(branch);
  }

  // Rooms
  for (const room of hotelData.rooms) {
    await db.collection('rooms').doc(`room-${room.id}`).set(room);
  }

  // Bookings
  for (const booking of hotelData.bookings) {
    await db.collection('bookings').doc(booking.id).set(booking);
  }

  // Complaints
  for (const complaint of hotelData.complaints) {
    await db.collection('complaints').doc(`complaint-${complaint.id}`).set(complaint);
  }

  // Staff (users)
  for (const staff of hotelData.staff) {
    await db.collection('users').doc(staff.id).set(staff);
  }

  console.log('✅ Firestore seeding complete!');
}

seedDatabase().catch(console.error);