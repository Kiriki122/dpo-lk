import { zodResolver } from "@hookform/resolvers/zod";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Box, FormHelperText, List, ListItem, ListItemText, IconButton, Collapse, Alert } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useUploadMutation } from "../model/queries";
import { uploadSchema, type UploadSchema } from "../model/schema";

interface UploadFormProps {
  DocNumber: string;
}

export const ApplicationsDocumentsUploadForm = ({ DocNumber }: UploadFormProps) => {
  const { mutate, isPending, isSuccess, isError, error } = useUploadMutation(DocNumber); // Используем мутацию
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      DocNumber, // Устанавливаем значение из пропсов
      files: [],
    },
  });

  useEffect(() => {
    setValue("DocNumber", DocNumber);
  }, [DocNumber, setValue]);

  // Следим за выбранными файлами для отображения списка
  const selectedFiles = watch("files") as File[];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setValue("files", [...selectedFiles, ...newFiles], { shouldValidate: true });
    }
  };
  const removeFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setValue("files", updatedFiles, { shouldValidate: true });
  };

  const onSubmit = (data: UploadSchema) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}
    >
      <input type="hidden" {...register("DocNumber")} />

      <Box hidden={isSuccess}>
        {selectedFiles.length > 0 && (
          <List dense sx={{ mt: 1, bgcolor: "background.paper", borderRadius: 1 }}>
            {selectedFiles.map((file, index) => (
              <ListItem
                key={`${file.name}-${index}`}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => removeFile(index)} disabled={isPending}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(1)} KB`} />
              </ListItem>
            ))}
          </List>
        )}

        {errors.files && (
          <FormHelperText error sx={{ py: 2 }}>
            {errors.files.message as string}
          </FormHelperText>
        )}

        <Button variant="outlined" component="label" fullWidth disabled={isPending}>
          Выбрать файлы
          <input type="file" hidden multiple onChange={handleFileChange} accept=".pdf,.jpg,.jpeg" />
        </Button>
      </Box>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!selectedFiles.length || isPending || !!errors.files}
        loading={isPending}
        sx={{ display: isSuccess ? "none" : "block" }}
      >
        Отправить
      </Button>

      <Collapse
        in={isSuccess}
        timeout={{ exit: 0, enter: 300 }}
        sx={{ mt: isSuccess ? 2 : 0, width: "100%", alignSelf: "center" }}
      >
        <Alert severity="success">Документы успешно загружены!</Alert>
      </Collapse>

      <Collapse
        in={isError}
        timeout={{ exit: 0, enter: 500 }}
        sx={{ mt: isError ? 2 : 0, width: "100%", alignSelf: "center" }}
      >
        <Alert severity="error">{error?.message}</Alert>
      </Collapse>
    </Box>
  );
};
