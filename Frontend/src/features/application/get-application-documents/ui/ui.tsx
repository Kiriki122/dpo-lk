import { Alert, Button } from "@mui/material";

import { useApplicationDocumentsLinks } from "../model/queries";

export const DocumentDownloadButton = ({ DocNumber }: { DocNumber: string }) => {
  const { download, error, isPending } = useApplicationDocumentsLinks(DocNumber);

  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Button fullWidth variant="contained" onClick={() => download()} loading={isPending}>
      Скачать документы для подписания
    </Button>
  );
};
