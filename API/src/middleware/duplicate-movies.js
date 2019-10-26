import MovieServices from '../services/movie';
import Res from '../helpers/responses';
const Movie = MovieServices;

export default async (req, res, next) => {
    const { name } = req.body;

    const movie = await Movie.checkDuplicates(name);
    if (movie.length > 0) {
        Res.handleError(409, 'Duplicate movies are not allowed', res);
        return userResponse.send(res);
    }

    next();
};
