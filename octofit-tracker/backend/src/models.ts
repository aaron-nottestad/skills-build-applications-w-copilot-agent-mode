import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		avatarUrl: { type: String, default: '' },
		team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	},
	{ timestamps: true },
);

const teamSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		motto: { type: String, required: true, trim: true },
		color: { type: String, required: true },
		members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: true },
);

const activitySchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		type: { type: String, required: true, enum: ['run', 'cycle', 'strength', 'yoga', 'swim'] },
		durationMinutes: { type: Number, required: true, min: 1 },
		distanceKm: { type: Number, min: 0 },
		calories: { type: Number, required: true, min: 0 },
		completedAt: { type: Date, required: true },
	},
	{ timestamps: true },
);

const leaderboardSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
		team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
		points: { type: Number, required: true, min: 0 },
		workoutsCompleted: { type: Number, required: true, min: 0 },
		rank: { type: Number, required: true, min: 1 },
		weekStarting: { type: Date, required: true },
	},
	{ timestamps: true },
);

const workoutSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		category: { type: String, required: true, enum: ['cardio', 'strength', 'mobility', 'recovery'] },
		difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
		durationMinutes: { type: Number, required: true, min: 1 },
		exercises: [{ name: String, sets: Number, reps: Number }],
	},
	{ timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema, 'users');
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema, 'teams');
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema, 'activities');
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema, 'leaderboard');
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema, 'workouts');