import { reducer } from './reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer,
})

export {
    store
}