import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', documentSchema, 'users');
export const Team = mongoose.models.Team || mongoose.model('Team', documentSchema, 'teams');
export const Activity = mongoose.models.Activity || mongoose.model('Activity', documentSchema, 'activities');
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', documentSchema, 'leaderboard');
export const Workout = mongoose.models.Workout || mongoose.model('Workout', documentSchema, 'workouts');