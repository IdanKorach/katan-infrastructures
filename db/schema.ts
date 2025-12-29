import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const inquiriesTable = pgTable('inquiries', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name').notNull(),
  phone: varchar('phone').notNull(),  
  email: varchar('email').notNull(),
  subject: varchar('subject').notNull(),  
  message: text('message').notNull(),
  status: varchar('status').default('new'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const projectsTable = pgTable('projects', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title').notNull(),
  description: text('description').notNull(),
  location: varchar('location'),
  serviceType: varchar('service_type'),
  imageUrl: varchar('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});