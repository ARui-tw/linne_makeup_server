
import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

// rule components
const idRule = {
    type: 'multi',
    rules: [{ type: 'string' }, { type: 'object' }],
};
const nameRule = {
    type: 'string',
    empty: false,  
};

const keywordController = {
    async create(req, res) {
        try {

            const create_rule = {
                name: nameRule,
            };
            validator.validate(req.body, create_rule);

            const result = await service.keyword.createOne(req.body);

            logger.info('[Keyword Controller] create one successfully');
            res.json(result); 

        } catch (error) {

            logger.error('[Keyword Controller] Failed to create keyword:', error);
            res.status(400).json({ message: `Failed to create keyword, ${error}` });

        }
    },

    async modify(req, res) {
        try {

            const modify_rule = {
                _id: idRule,
                name: nameRule,
            };
            validator.validate(req.body, modify_rule);

            const result = await service.keyword.modifyOne(req.body);

            logger.info('[Keyword Controller] modify one successfully');
            res.json(result);

        } catch (error) {

            logger.error('[Keyword Controller] Failed to modify keyword:', error);
            res.status(400).json({ message: `Failed to modify keyword, ${error}` });

        }  
    },
  
    async get(req, res) {      
        try {

            const get_rule = {
                _id: idRule,
            };
            validator.validate(req.body, get_rule);

            const result = await service.keyword.getOne(req.body);

            logger.info('[Keyword Controller] get one successfully');
            res.json(result);   

        } catch (error) {                                   

            logger.error('[Keyword Controller] Failed to get keyword:', error);                
            res.status(400).json({ message: `Failed to get keyword, ${error}` });

        }
    },
  
    async gets(req, res) {
        try {

            const gets_rule = {
                filter: {
                    type: 'object',
                    optional: true,
                },
                limit: {
                    type: 'number',
                    optional: true,
                },
                skip: {
                    type: 'number',
                    optional: true,
                },
                sort: {
                    type: 'object',
                    optional: true,
                },
            };
            validator.validate(req.body, gets_rule);

            const results = await service.keyword.getAll(req.body);
            
            logger.info('[Keyword Controller] get all successfully');
            res.json(results);

        } catch (error) {

            logger.error('[Keyword Controller] Failed to get keywords:', error);
            res.status(400).json({ message: `Failed to get keywords, ${error}` });

        }
    },
  
    async remove(req, res) {  
        try {

            const remove_rule = {
                _id: idRule,
            };
            validator.validate(req.body, remove_rule);
            
            const result = await service.keyword.removeOne(req.body);

            logger.info('[Keyword Controller] Remove one successfully');
            res.json(result);   

        } catch (error) {

            logger.error('[Keyword Controller] Failed to remove keyword:', error);
            res.status(400).json({ message: `Failed to remove keyword, ${error}` });

        }
    },
  };

export default keywordController;
