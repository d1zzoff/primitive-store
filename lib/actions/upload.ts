"use server";

interface IUploadImageResponse {
  ok: boolean;
  filename: string;
}

export async function uploadImage(
  imageFile: File
): Promise<IUploadImageResponse> {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${process.env.API_URL}/upload`, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());

  if (!response.ok) {
    throw new Error("Не удалось загрузить картинку.");
  }

  const resData = await response.json();

  return resData;
}
