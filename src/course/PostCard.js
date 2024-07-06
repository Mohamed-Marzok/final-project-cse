import React from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export const PostCard = ({ post, deleteFun }) => {
  const role = JSON.parse(localStorage.getItem("role"));
  let fileContent = null;

  console.log("Post object:", post); // Debug log

  if (post && post.File) {
    try {
      const byteCharacters = atob(post.File);
      const byteArray = Uint8Array.from(byteCharacters, (char) =>
        char.charCodeAt(0)
      );

      // Default to image/png if fileType is not provided
      const fileType = post.fileType || "image/png";
      const blob = new Blob([byteArray], { type: fileType });
      const url = URL.createObjectURL(blob);

      console.log("Image URL:", url); // Debug log

      if (fileType.startsWith("image/")) {
        fileContent = <Image src={url} alt="Post Content" />;
      } else {
        console.error("Unsupported file type:", fileType);
      }
    } catch (error) {
      console.error("Error processing image content: ", error);
    }
  } else {
    console.warn("No file found in post object.");
  }

  return (
    <Container>
      <ContentCard key={post.id}>
        {fileContent}
        <TextContent>
          <StyledH3>{post.Tittle}</StyledH3>
          <StyledP>{post.Content}</StyledP>
        </TextContent>
        {role === "Instructor" && (
          <IconButton
            aria-label="delete"
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              zIndex: 100,
            }}
            color="error"
            size="small"
            onClick={deleteFun}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </ContentCard>
    </Container>
  );
};

const StyledH3 = styled.h3`
  color: #471fade3;
  margin: 0 0 8px 0;
`;

const StyledP = styled.p`
  color: #777;
  background-color: #f9f9f9;
  padding: 8px;
  border-radius: 4px;
  white-space: pre-wrap;
  width: 100%;
  word-wrap: break-word;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const ContentCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px;
    margin: 12px 0;
  }
`;

const TextContent = styled.div`
  width: 100%;
  max-width: 100%;
`;

const Image = styled.img`
  max-height: 400px;
  max-width: 90%;
  border-radius: 4px;
  margin-bottom: 16px;
  object-fit: cover;

  @media (max-width: 768px) {
    max-height: 250px;
  }
`;
