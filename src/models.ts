/* eslint-disable import/prefer-default-export */
import mongoose, { Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
	id: string
	token: string | undefined
	refreshToken: string | undefined
}

const UserSchema: Schema = new Schema({
	id: { type: String, required: true, unique: true },
	token: { type: String, required: true },
	refreshToken: { type: String, required: true },
})

export const User = mongoose.model<UserDocument>('User', UserSchema)
