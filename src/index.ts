import express, { NextFunction, Request, Response } from 'express';

import { API_VERSION, PORT } from './config';
import router from './routes';
import { ErrorInstanceType } from './types/error';
import { handleResponseError } from './utils/error';

const app = express();

app.use(`${API_VERSION}`, router);

app.use(
  (
    err: ErrorInstanceType,
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error("Error: ", err);

    res.status(err.statusCode ?? 500).json();
  }
);

app.get("*", (req, res) => {
  res.status(404).json(
    handleResponseError({
      statusCode: 404,
      name: req.url,
      message: "not found api",
    })
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
