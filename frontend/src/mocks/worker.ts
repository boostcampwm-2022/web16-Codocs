import { setupWorker } from 'msw';
import { handler } from './handler';

export const worker = setupWorker(...handler);
