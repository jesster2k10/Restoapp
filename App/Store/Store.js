/**
 * Created by jesseonolememen on 04/11/2017.
 */
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../Reducers';
import sagas from '../Sagas';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const loggerMiddleware = createLogger();

    const devMiddleware = applyMiddleware(
        sagaMiddleware,
        ReduxThunk,
        loggerMiddleware,
    );

    const productionMiddleware = applyMiddleware(
        sagaMiddleware,
        ReduxThunk,
    );

    const finalCreateStore = compose(
        __DEV__ ? devMiddleware : productionMiddleware,
    )(createStore);

    const store = finalCreateStore(reducers, undefined);

    sagaMiddleware.run(sagas);

    return store;
};

export default configureStore;