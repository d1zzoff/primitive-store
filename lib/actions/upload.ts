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

  const response = await fetch("http://localhost:8080/upload", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());

  if (!response.ok) {
    throw new Error("Не удалось загрузить картинку.");
  }

  const resData = await response.json();

  return resData;
}
