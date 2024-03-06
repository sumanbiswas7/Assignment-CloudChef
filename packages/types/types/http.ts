export const HTTP_STATUS = {
   OK: 200,
   CREATED: 201,
   NO_CONTENT: 204,
   BAD_REQUEST: 400,
   UNAUTHORIZED: 401,
   FORBIDDEN: 403,
   NOT_FOUND: 404,
   INTERNAL_SERVER_ERROR: 500,
   SERVICE_UNAVAILABLE: 503,
};

export class HttpResponse {
   isError: boolean;
   status: number;
   message: string | null;
   [key: string]: any; // Index signature to allow any additional properties

   constructor({ status, message, isError }: ConstructorType) {
      this.isError = isError || false;
      this.status = status || 500;
      this.message = message || null;
   }
}

/**
 * ------------------
 *       Types
 * ------------------
 */

type ConstructorType = {
   isError?: boolean;
   status?: number;
   message?: string | null;
};
