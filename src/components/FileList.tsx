import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import axiosInstance from "../axiosInstance";
import FileCard from "./FileCard";

const S3FileList = forwardRef((props, ref) => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/files");
      setFiles(response.data.files || []);
    } catch (err) {
      setError("Failed to fetch files. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    refresh: fetchFiles,
  }));

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Uploaded Files
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={{ maxHeight: "70vh", overflowY: "auto", padding: 2 }}>
          {files.map((file) => (
            <FileCard key={file.fileName} file={file} />
          ))}
        </Box>
      )}
    </Box>
  );
});

export default S3FileList;
