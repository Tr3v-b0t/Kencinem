import { movie } from '../models';

export default class MovieServices {
    static async checkDuplicates(name) {
        const movies = await movie.findAll({
            where: {
                name
            }
        });
        return movies;
    }
}
