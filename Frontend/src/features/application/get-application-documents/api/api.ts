import { privateApi } from "@/shared/api/instance";

export const getApplicationDocumentsApi = {
  getApplicationDocuments: async (DocNumber: string) => {
    const response = await privateApi.post(
      "/applications/download-file",
      { DocNumber },
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: response.headers["content-type"] });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const contentDisposition = response.headers["content-disposition"];
    let fileName = `document_${DocNumber}.pdf`;
    if (contentDisposition && contentDisposition.includes("filename=")) {
      fileName = contentDisposition.split("filename=")[1].split(";")[0].replace(/"/g, "");
      fileName = decodeURIComponent(fileName);
    }

    link.setAttribute("download", fileName);
    document.body.appendChild(link);

    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

    return response.data;
  },
};
