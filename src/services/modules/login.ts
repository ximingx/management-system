import API from "@/services";

export function loginRequest(data: any) {
  return API.post({
    url: "/login",
    data
  });
}

export function getUserInfoRequest(id: any) {
  return API.get({
    url: "/users/" + id
  });
}

export function getUserMenuRequest(id: any) {
  return API.get({
    url: `/role/${id}/menu`
  });
}
