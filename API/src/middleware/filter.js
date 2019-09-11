import { movie } from '../models';
import _ from 'lodash';
import Res from '../helpers/responses';

const filter = async (req, res, next) => {
    const query = req.query;
    if(_.isEmpty(query)){
        return next()
    }
    const key = Object.keys(query)[0];
    console.log(query[key]);
    if (!_.includes(['genre', 'country', 'status'], key.toLowerCase()) || query[key] == '') {
        return Res.handleError(400, `Wrong filter applied`, res);
    }
    const Movies = await movie.findAll({
        where: {
            [key]: query[key]
        }
    })
    if (Movies.length === 0) {
            return Res.handleError(404, `movies found currently from ${key} - ${query[key]}`, res);
        }
    return Res.handleSuccess(200, 'successful found movies', Movies, res);
};

export default filter
