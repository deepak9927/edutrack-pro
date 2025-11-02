import { test, expect } from 'vitest';
import { LoginSchema, RegisterSchema } from '@/lib/validations/auth';

// Test cases for LoginSchema
test('LoginSchema validates a valid login payload', () => {
  const validPayload = {
    email: 'test@example.com',
    password: 'password123',
  };
  expect(() => LoginSchema.parse(validPayload)).not.toThrow();
});

test('LoginSchema invalidates an invalid email format', () => {
  const invalidPayload = {
    email: 'invalid-email',
    password: 'password123',
  };
  expect(() => LoginSchema.parse(invalidPayload)).toThrowError('Please enter a valid email.');
});

test('LoginSchema invalidates a missing password', () => {
  const invalidPayload = {
    email: 'test@example.com',
    password: '',
  };
  expect(() => LoginSchema.parse(invalidPayload)).toThrowError('Password is required.');
});

test('LoginSchema invalidates a missing email', () => {
  const invalidPayload = {
    password: 'password123',
  };
  expect(() => LoginSchema.parse(invalidPayload)).toThrow(); // Zod throws a generic error for missing fields
});

// Test cases for RegisterSchema
test('RegisterSchema validates a valid registration payload', () => {
  const validPayload = {
    name: 'Test User',
    email: 'register@example.com',
    password: 'securepassword',
  };
  expect(() => RegisterSchema.parse(validPayload)).not.toThrow();
});

test('RegisterSchema invalidates a name shorter than 2 characters', () => {
  const invalidPayload = {
    name: 'A',
    email: 'register@example.com',
    password: 'securepassword',
  };
  expect(() => RegisterSchema.parse(invalidPayload)).toThrowError('Name must be at least 2 characters.');
});

test('RegisterSchema invalidates an invalid email format', () => {
  const invalidPayload = {
    name: 'Test User',
    email: 'invalid-email',
    password: 'securepassword',
  };
  expect(() => RegisterSchema.parse(invalidPayload)).toThrowError('Please enter a valid email.');
});

test('RegisterSchema invalidates a password shorter than 6 characters', () => {
  const invalidPayload = {
    name: 'Test User',
    email: 'register@example.com',
    password: 'short',
  };
  expect(() => RegisterSchema.parse(invalidPayload)).toThrowError('Password must be at least 6 characters.');
});

test('RegisterSchema invalidates a missing name', () => {
  const invalidPayload = {
    email: 'register@example.com',
    password: 'securepassword',
  };
  expect(() => RegisterSchema.parse(invalidPayload)).toThrow();
});

test('RegisterSchema invalidates a missing email', () => {
  const invalidPayload = {
    name: 'Test User',
    password: 'securepassword',
  };
  expect(() => RegisterSchema.parse(invalidPayload)).toThrow();
});

test('RegisterSchema invalidates a missing password', () => {
  const invalidPayload = {
    name: 'Test User',
    email: 'register@example.com',
  };
  expect(() => RegisterSchema.parse(invalidPayload)).toThrow();
});