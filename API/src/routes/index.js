import user from './user-routes';
import Res from '../helpers/responses';

const prefix = '/api/v1';

/** 
* combines all the routes together
* @param {method} app - used in routing
*/
const router = (app) => {
    app.use(prefix, user);
    app.get('/', (req, res) => Res.handleOk(200, 'Welcome to Kenya cinema API', res));
    app.all('/', (req, res) => Res.handleError(405, 'Invalid method', res));
    app.use('*', (req, res) => Res.handleError(404, 'Invalid route', res));
};

export default router;