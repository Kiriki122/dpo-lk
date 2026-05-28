import { AttachFile, Close } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, Typography, Chip, Alert, Collapse, Divider } from "@mui/material";
import { useForm } from "react-hook-form";

import { userStore } from "@/entities/user";
import { useUploadUserDocsMutation } from "../model/query";
import { type UploadSchema } from "../model/schema";

export const UploadUserDocsForm = () => {
  type UploadFileTypes = "passport" | "snils" | "education" | "obrPD" | "peredPD";
  const email = userStore.useUser().email;
  const { mutate, isPending, isSuccess, isError, error } = useUploadUserDocsMutation();

  const {
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<{
    passport: File | null;
    snils: File | null;
    education: File | null;
    obrPD: File | null;
    peredPD: File | null;
  }>({
    defaultValues: {
      passport: null,
      snils: null,
      education: null,
      obrPD: null,
      peredPD: null,
    },
  });

  const passport = watch("passport");
  const snils = watch("snils");
  const education = watch("education");
  const obrPD = watch("obrPD");
  const peredPD = watch("peredPD");

  // Обработчик для каждого поля – берёт первый выбранный файл
  const handleFileChange = (field: UploadFileTypes) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setValue(field, file, { shouldValidate: false });
  };

  const removeFile = (field: UploadFileTypes) => {
    setValue(field, null, { shouldValidate: false });
  };

  const onSubmit = () => {
    const docsData = [
      { file: passport, type: "ДокументУдостоверяющийЛичность" },
      { file: snils, type: "СНИЛС" },
      { file: education, type: "ДокументОПолученномОбразовании" },
      { file: obrPD, type: "ОбработкаПД" },
      { file: peredPD, type: "ОбработкаПД" },
    ].filter((item): item is { file: File; type: string } => item.file !== null);

    if (docsData.length === 0) {
      setError("root", { message: "Прикрепите хотя бы один документ" });
      return;
    }

    clearErrors("root");

    const payload: UploadSchema = {
      email,
      docs: docsData,
    };
    setValue("passport", null);
    setValue("snils", null);
    setValue("education", null);

    mutate(payload);
  };

  const renderFileField = (label: string, field: UploadFileTypes, file: File | null) => (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button variant="outlined" component="label" startIcon={<AttachFile />} disabled={isPending}>
          Выбрать файл
          <input type="file" hidden onChange={handleFileChange(field)} accept=".pdf,.jpg,.jpeg,.png" />
        </Button>
        {file && (
          <Chip label={file.name} onDelete={() => removeFile(field)} deleteIcon={<Close />} variant="outlined" />
        )}
      </Box>
    </Box>
  );

  if (isSuccess) return <Alert severity="success">Документы успешно загружены</Alert>;

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box hidden={isSuccess}>
          {renderFileField("Паспорт", "passport", passport)}
          <Divider sx={{ my: 2 }} />
          {renderFileField("СНИЛС", "snils", snils)}
          <Divider sx={{ my: 2 }} />
          {renderFileField("Документ об образовании", "education", education)}
          <Divider sx={{ my: 2 }} />
          {renderFileField("Согласие на обработку персональных данных", "obrPD", obrPD)}
          <Divider sx={{ my: 2 }} />
          {renderFileField("Согласие на передачу персональных данных", "peredPD", peredPD)}
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Шаблоны документов
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DownloadIcon />}
              href="/Soglasie_na_obrabotku_PD_STANKIN_1.docx"
              download="Soglasie_na_obrabotku_PD_STANKIN_1.docx"
              sx={{ flexGrow: 1 }}
            >
              Согласие на обработку персональных данных
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DownloadIcon />}
              href="/Soglasie_na_peredachu_PD_STANKIN_2.docx"
              download="Soglasie_na_peredachu_PD_STANKIN_2.docx"
              sx={{ flexGrow: 1 }}
            >
              Согласие на передачу персональных данных
            </Button>
          </Box>
        </Box>
        <Collapse
          in={!!errors.root}
          timeout={{ exit: 0, enter: 500 }}
          sx={{ mt: isError ? 2 : 0, width: "100%", alignSelf: "center" }}
        >
          <Alert severity="error">{errors.root?.message || "Прикрепите хотя бы один документ"}</Alert>
        </Collapse>

        <Button type="submit" variant="contained" disabled={isPending || isSuccess} loading={isPending}>
          Отправить
        </Button>

        <Collapse
          in={isError}
          timeout={{ exit: 0, enter: 500 }}
          sx={{ mt: isError ? 2 : 0, width: "100%", alignSelf: "center" }}
        >
          <Alert severity="error">{error?.message ?? "Ошибка при загрузке"}</Alert>
        </Collapse>
      </Box>

      <Collapse
        in={isSuccess}
        timeout={{ exit: 0, enter: 500 }}
        sx={{ mt: isError ? 2 : 0, width: "100%", alignSelf: "center" }}
      >
        <Alert severity="success">Документы успешно загружены</Alert>
      </Collapse>
    </>
  );
};
