import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import TableChartIcon from "@mui/icons-material/TableChart";
import axiosInstance from "../axiosInstance";
import { Close, Preview } from "@mui/icons-material";

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").at(-1)?.toLowerCase();

  switch (extension) {
    case "pdf":
      return <PictureAsPdfIcon sx={{ color: "#FF6666", fontSize: 40 }} />; // Soft red
    case "png":
    case "jpg":
    case "jpeg":
      return <ImageIcon sx={{ color: "#66B2FF", fontSize: 40 }} />; // Vibrant blue
    case "xlsx":
    case "csv":
      return <TableChartIcon sx={{ color: "#66CC66", fontSize: 40 }} />; // Soft green
    case "docx":
    case "txt":
      return <DescriptionIcon sx={{ color: "#A366FF", fontSize: 40 }} />; // Refined purple
    default:
      return <InsertDriveFileIcon sx={{ color: "#999999", fontSize: 40 }} />; // Neutral gray
  }
};

const FileCard: React.FC<{ file: any }> = ({ file }) => {
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

  const handleDownload = async (fileUrl: string, fileKey: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/download?fileKey=${encodeURIComponent(fileKey)}`,
        { responseType: "blob" }
      );

      const blobUrl = URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileKey;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const FilePreviewPanel: React.FC<{ file: any; onClose: () => void }> = ({
    file,
    onClose,
  }) => {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "600px",
          height: "100vh",
          backgroundColor: "#fff",
          boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          overflowY: "auto",
          zIndex: 1409, // ✅ Places it behind the upload panel
          transition: "transform 0.3s ease-in-out",
          transform: selectedFile ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* ✅ Header with Close Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            {file?.fileName.split("/").pop()}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* ✅ Render File Preview Based on Type */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          {file?.fileUrl?.match(/\.(png|jpg|jpeg)$/i) ? (
            <img
              src={file.fileUrl}
              alt={file.fileName}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : file?.fileUrl?.endsWith(".pdf") ? (
            <iframe
              src={file.fileUrl}
              width="100%"
              height="100%"
              title="PDF Preview"
            ></iframe>
          ) : file?.fileUrl?.endsWith(".docx") ? (
            <iframe
              src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                file.fileUrl
              )}`}
              width="100%"
              height="100%"
              title="DOCX Preview"
            ></iframe>
          ) : (
            <Typography>No preview available</Typography>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Card
        sx={{
          width: "98%",
          // maxWidth: 400,
          marginBottom: 2,
          padding: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "nowrap", // ✅ Prevents wrapping
        }}
      >
        {/* ✅ File Icon */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {getFileIcon(file.fileName)}
        </Box>

        {/* ✅ Title with Max Lines and Ellipsis */}
        <CardContent sx={{ flexGrow: 1, minWidth: 250 }}>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 3, // ✅ Limits title to 3 lines
            }}
          >
            {file.fileName.split("/").pop()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Size: {(file.fileSize / 1024 / 1024).toFixed(2)} MB
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last Modified: {new Date(file.lastModified).toLocaleString()}
          </Typography>
        </CardContent>

        {/* ✅ Download Button */}
        <IconButton onClick={() => handleDownload(file.fileUrl, file.fileKey)}>
          <DownloadIcon sx={{ color: "#a7a7a7", fontSize: 20 }} />
        </IconButton>

        <IconButton onClick={() => setSelectedFile(file)}>
          <Preview sx={{ color: "#a7a7a7", fontSize: 20 }} />
        </IconButton>
      </Card>
      {selectedFile && (
        <FilePreviewPanel
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </>
  );
};

export default FileCard;
