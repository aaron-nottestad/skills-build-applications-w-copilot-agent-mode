import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [teamNorthstar, teamMomentum] = await Team.create([
      { name: 'Northstar', motto: 'Small steps, strong finish', color: '#2563eb', members: [] },
      { name: 'Momentum', motto: 'Show up and move forward', color: '#16a34a', members: [] },
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', avatarUrl: '/avatars/maya.png', team: teamNorthstar._id },
      { name: 'Jordan Brooks', email: 'jordan.brooks@example.com', avatarUrl: '/avatars/jordan.png', team: teamNorthstar._id },
      { name: 'Samira Patel', email: 'samira.patel@example.com', avatarUrl: '/avatars/samira.png', team: teamMomentum._id },
      { name: 'Leo Martinez', email: 'leo.martinez@example.com', avatarUrl: '/avatars/leo.png', team: teamMomentum._id },
    ]);

    await Team.bulkWrite([
      { updateOne: { filter: { _id: teamNorthstar._id }, update: { members: [users[0]._id, users[1]._id] } } },
      { updateOne: { filter: { _id: teamMomentum._id }, update: { members: [users[2]._id, users[3]._id] } } },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'run', durationMinutes: 32, distanceKm: 5.2, calories: 410, completedAt: new Date('2026-09-10T07:30:00.000Z') },
      { user: users[1]._id, type: 'strength', durationMinutes: 45, calories: 360, completedAt: new Date('2026-09-09T18:00:00.000Z') },
      { user: users[2]._id, type: 'cycle', durationMinutes: 50, distanceKm: 18.4, calories: 520, completedAt: new Date('2026-09-10T06:45:00.000Z') },
      { user: users[3]._id, type: 'yoga', durationMinutes: 28, calories: 140, completedAt: new Date('2026-09-08T07:00:00.000Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teamNorthstar._id, points: 860, workoutsCompleted: 7, rank: 1, weekStarting: new Date('2026-09-07') },
      { user: users[2]._id, team: teamMomentum._id, points: 790, workoutsCompleted: 6, rank: 2, weekStarting: new Date('2026-09-07') },
      { user: users[1]._id, team: teamNorthstar._id, points: 640, workoutsCompleted: 5, rank: 3, weekStarting: new Date('2026-09-07') },
      { user: users[3]._id, team: teamMomentum._id, points: 510, workoutsCompleted: 4, rank: 4, weekStarting: new Date('2026-09-07') },
    ]);

    await Workout.create([
      { title: 'Tempo Run Builder', description: 'Build endurance with alternating easy and strong intervals.', category: 'cardio', difficulty: 'intermediate', durationMinutes: 35, exercises: [{ name: 'Easy run', sets: 1, reps: 10 }, { name: 'Tempo interval', sets: 4, reps: 3 }] },
      { title: 'Full Body Foundation', description: 'A balanced strength session for the whole body.', category: 'strength', difficulty: 'beginner', durationMinutes: 30, exercises: [{ name: 'Bodyweight squat', sets: 3, reps: 12 }, { name: 'Push-up', sets: 3, reps: 8 }] },
      { title: 'Evening Reset', description: 'Release tension and restore comfortable range of motion.', category: 'recovery', difficulty: 'beginner', durationMinutes: 20, exercises: [{ name: 'Cat-cow', sets: 2, reps: 10 }, { name: 'Child pose', sets: 1, reps: 5 }] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
