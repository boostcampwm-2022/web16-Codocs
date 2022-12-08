import { setupServer } from 'msw/node';
import { handler } from './handler';

export const server = setupServer(...handler);
