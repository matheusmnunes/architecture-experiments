import { validate } from '../../middlewares/validate.middleware.js';
import { generateReportParamsDTO, generateReportQueryDTO } from '../dtos/report.dto.js';
import { get } from '../controllers/report.controller.js';

const report = (router: any) => 
    router
        .get('/report-pdf/:id', 
            validate({
                params: generateReportParamsDTO
            }), 
            get
        )

export default report;
