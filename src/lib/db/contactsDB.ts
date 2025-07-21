import Dexie, { type Table } from 'dexie';

export interface Contact {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ContactsDB extends Dexie {
  contacts!: Table<Contact>;

  constructor() {
    super('contactsDB');
    this.version(1).stores({
      contacts: '++id, name, phone, email, createdAt, updatedAt'
    });
  }
}

export const db = new ContactsDB();
