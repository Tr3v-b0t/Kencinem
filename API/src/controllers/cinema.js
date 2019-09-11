import { cinema } from '../models'
import Res from '../helpers/responses';

export default class CinemaController {
    static async getAll(req, res) {
        try {
            const cinemas = await cinema.findAll();
            if (cinemas.length === 0) {
                return Res.handleError(404, 'No cinemas currently', res);
            }
            return Res.handleSuccess(200, 'successful found cinemas', cinemas, res);
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }

    static async getOne(req, res) {
        try {
            const id = req.params.id;
            const Cinema = await cinema.findByPk(id);
            if(Cinema) {
                return Res.handleSuccess(200, 'successful found cinema', Cinema, res);
            }
            return Res.handleError(404, 'No cinema Found with such id', res);
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }
}