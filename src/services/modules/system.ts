import API from "@/services";

// 增删改查
export function addRequest(path: string, userInfo: any) {
  return API.post({
    url: `/${path}`,
    data: userInfo
  });
}

export function deleteRequest(path: string, id: number) {
  return API.delete({
    url: `/${path}/${id}`
  });
}

export function editRequest(path: string, id: number, userInfo: any) {
  return API.patch({
    url: `/${path}/${id}`,
    data: userInfo
  });
}

export function getRequest(path: string, data: any) {
  return API.post({
    url: `/${path}/list`,
    data
  });
}
