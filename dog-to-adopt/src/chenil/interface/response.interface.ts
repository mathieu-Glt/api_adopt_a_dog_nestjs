import { ChenilDocument } from "../schema/chenils.chema";

class ResponseInterface {
  results?: any;
  error?: boolean;
  message: string;
  status: number;
}


export class ResponseSuccessInterface extends ResponseInterface {
  results?: any;
}
  
export class ResponseErrorInterface extends ResponseInterface {
  error?: boolean;
}
  