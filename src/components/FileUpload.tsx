import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import axiosInstance from "../axiosInstance";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  LinearProgress,
  Paper,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { styled } from "@mui/system";
import S3FileList from "./FileList";

const DropzoneContainer = styled(Paper)({
  border: "2px dashed #3f51b5",
  padding: "16px",
  textAlign: "center",
  cursor: "pointer",
  borderRadius: "8px",
  backgroundColor: "#f5f5f5",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

type UploadedFile = {
  isOpen: boolean;
  handleClose: () => void;
};

const FileUpload = ({ isOpen, handleClose }: UploadedFile) => {
  const [uploadedFiles, setUploadedFiles] = useState<
    { fileName: string; fileUrl: string }[]
  >([]);

  const fileListRef = useRef<{ refresh: () => void } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: async (acceptedFiles) => handleFileUpload(acceptedFiles),
  });

  const handleFileUpload = async (acceptedFiles: File[]) => {
    setUploadedFiles([]);
    const formData = new FormData();
    acceptedFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await axiosInstance.post("/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(percentCompleted);
        },
      });
      setUploadedFiles(response.data.files);
      fileListRef.current?.refresh();
      setUploadProgress(100);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <>
      {/* ✅ Background Overlay for Modal Effect */}

      {/* ✅ Sliding Panel */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "800px",
          height: "100vh",
          backgroundColor: "#fff",
          boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          // overflowY: "auto",
          zIndex: 1300, // ✅ Ensures panel stays above other content
          transition: "transform 0.3s ease-in-out",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          flexDirection: "column",
        }}
      >
        {/* ✅ Header with Close Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0, // ✅ Prevents shrinking
          }}
        >
          <Typography variant="h6">File Upload</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* ✅ Drag and Drop Upload Area */}
        <DropzoneContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography>Drag and drop files here, or click to select</Typography>
        </DropzoneContainer>

        {/* ✅ Upload Progress Indicator */}
        {uploadProgress > 0 && (
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{ marginTop: "16px" }}
          />
        )}

        {/* ✅ List of Uploaded Files */}
        <List sx={{ marginTop: "16px" }}>
          {uploadedFiles.map((file, index) => (
            <ListItem
              key={index}
              sx={{ borderBottom: "1px solid #ddd", padding: "12px" }}
            >
              <InsertDriveFileIcon sx={{ marginRight: "8px", color: "blue" }} />
              <ListItemText
                primary={file.fileName}
                sx={{
                  maxWidth: "300px",
                  wordBreak: "break-word",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              />
              <Button href={file.fileUrl} target="_blank">
                Download
              </Button>
            </ListItem>
          ))}
        </List>

        {/* ✅ File List Panel */}
        <Box sx={{ marginTop: "16px", maxWidth: "750px", overflowY: "auto" }}>
          <S3FileList ref={fileListRef} />
        </Box>
      </Box>
    </>
  );
};

export default FileUpload;
