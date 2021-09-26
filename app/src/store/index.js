import { createStore } from 'easy-peasy';

// MODELS
import { rootModel } from './models';

export const rootStore = createStore(rootModel);
