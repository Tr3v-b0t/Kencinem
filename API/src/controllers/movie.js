import { movie } from '../models'
import Res from '../helpers/responses';

export default class MovieController {
    static async getAll(req, res) {
        try {
            const Movies = await movie.findAll();
            if (Movies.length === 0) {
                return Res.handleError(404, 'No movies currently', res);
            }
            return Res.handleSuccess(200, 'successful found movies', Movies, res);
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }

    static async getOne(req, res) {
        try {
            const id = req.params.id;
            const Movie = await movie.findByPk(id);
            if(Movie) {
                return Res.handleSuccess(200, 'successful found movie', Movie, res);
            }
            return Res.handleError(404, 'No movie Found with such id', res);
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }
}