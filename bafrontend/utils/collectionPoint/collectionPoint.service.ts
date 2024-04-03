import { COLLECTION_POINT_API } from "utils/constants";

export interface CollectionPointCreateRequest {
  userId: string;
  userName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  name: string;
  agreement: string;
  address: string;
  city: string;
  state: string;
  country: string;
  statusId: number;
}

interface GenericResponse {
    status_code: number;
    data: any;
    message: string;
}

export async function CreateCollectionPoint(request: CollectionPointCreateRequest): Promise<GenericResponse> {
  const res = await fetch(COLLECTION_POINT_API + "request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request)
  });
  const data = await res.json();
  return data;
}
