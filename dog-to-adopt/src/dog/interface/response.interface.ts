import { DogDocument } from '../schema/dogs.shema';


class ResponseInterface {
  results?:  {};
  error?: boolean;
  message: string;
  status: number;
}


export class ResponseSuccessInterface extends ResponseInterface {
  results?: {};
}
  
export class ResponseErrorInterface extends ResponseInterface {
  error?: boolean;
}
  