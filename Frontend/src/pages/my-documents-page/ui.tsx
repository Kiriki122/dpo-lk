import { Typography } from "@mui/material";

import { DocumentList } from "@/widgets/document-list";

export const MyDocumentsPage: React.FC = () => {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Мои документы
      </Typography>
      <DocumentList />
    </>
  );
};

export default MyDocumentsPage;
