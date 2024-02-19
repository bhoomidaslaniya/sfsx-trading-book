import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import dotenv from "dotenv";
dotenv.config();
import { SERVER_CONFIG } from "./config/server.config";
import { router } from "./routes";
import { sendErrorResponse } from "./utils/server-responses.util";
import { HttpStatus } from "./constants/http-status.constant";

const app = express();
app.use(express.json());
app.use(router);

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  let errorBody: { data?: any; message: string } = {
    message: "Internal Server Error",
  };

  if (SERVER_CONFIG.ENV === "development") {
    errorBody = {
      message: err.message,
      data: err.stack,
    };
  }
  return sendErrorResponse(res, errorBody, HttpStatus.INTERNAL_SERVER_ERROR);
});

app.listen(SERVER_CONFIG.PORT, SERVER_CONFIG.HOST, () => {
  console.log(
    `Server started at http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}`
  );
});
