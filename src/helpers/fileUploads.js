export const fileUploads = async (files) => {
  // CLOUDINARY_API_URL;
  const formData = new FormData();

  if (!files)
    throw new Error("No seleccionaste los archivos que quieres subir");
  formData.append("file", files);
  formData.append("upload_preset", "react-journal");

  try {
    const resp = await fetch(import.meta.env.VITE_CLOUDINARY_API_URL, {
      method: "POST",
      body: formData,
    });
    // console.log(resp);
    if (!resp.ok) throw new Error("No se pudo subir la imagen");
    const cloudResp = await resp.json();
    // console.log({ cloudResp });
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
