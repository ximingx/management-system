import API from "@/services";

export function loginRequest(data: any) {
  console.log(data);
  return API.post({
    url: "/login",
    data
  });
}
