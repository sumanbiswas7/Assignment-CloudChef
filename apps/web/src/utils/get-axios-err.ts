import axios from "axios";

export function getMsgFromAxiosErr(error: unknown) {
   if (axios.isAxiosError(error)) {
      const res = error.response;
      const msg = res?.data?.msg || res?.data?.message || res?.data?.error;
      return msg;
   }

   return "Something wen't wrong";
}
