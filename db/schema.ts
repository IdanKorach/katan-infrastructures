import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const contactsInfoTable = pgTable('contacts_info', {
  name: varchar('name').notNull(),
  phone: integer('phone').notNull(),
  email: varchar('email').notNull(),
  messageType: varchar('message_type'),
  message: text('message'),
});

export const projectsTable = pgTable('projects', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title').notNull(),
  description: text('description').notNull(),
  location: varchar('location'),
  serviceType: varchar('service_type'), // e.g., "חפירה", "ניקוז"
  imageUrl: varchar('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
})