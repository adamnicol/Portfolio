import express from "express";
import jsdoc from "swagger-jsdoc";
import jsdocOptions from "../../swagger.json";
import swaggerUI from "swagger-ui-express";

function swagger() {
  const router = express.Router();
  const docs = jsdoc(jsdocOptions);

  return router.use(swaggerUI.serve, swaggerUI.setup(docs));
}

export default swagger;
