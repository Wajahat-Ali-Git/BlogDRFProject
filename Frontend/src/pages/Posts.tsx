import React, { useEffect } from "react";
import { api } from "../services/TokenAuth";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";


// MUI imports
import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { FaEye } from "react-icons/fa";

import { categories } from "../constants/constant";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [data, setData] = React.useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const language =
    localStorage.getItem("language") || localStorage.setItem("language", "en");
  const params = new URLSearchParams(location.search);
  const selectedCategorySlug = params.get("category");


  const handlegetPosts = async (category?: string) => {
    try {
      const url = category
        ? `blog/posts/?category=${category}&lang=${language}`
        : `blog/posts/?lang=${language}`;
      const res = await api.get(url);
      console.log("Posts fetched successfully", res.data);
      setData(res.data);
    } catch (error: any) {
      console.error("Error while fetching posts", error);
    }
  };


  useEffect(() => {
    handlegetPosts(selectedCategorySlug || undefined);
  }, [selectedCategorySlug]);

  const currentCategory = categories.find(
    (cat) => cat.slug === selectedCategorySlug,
  );
  const { t } = useTranslation();
  const title = currentCategory
    ? `${t(currentCategory.titleKey || `category.${currentCategory.slug}`)} Posts`
    : t("popularPosts");

  return (
    <div className="bg-black">
      <Header />
      <Container className="bg-black h-auto">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mt: 3,
            fontWeight: "bold",
            color: "white",
            borderBottom: "2px solid #358395",
            width: "fit-content",
            pb: 1,
            mb: 4,
          }}
        >
          {title}
        </Typography>
        {(data === null || data.length === 0) && (
          <div className="text-red-500/80">
            No content available for this category
          </div>
        )}

        <Grid container spacing={3}>
          {data.map((post: any) => (
            <Grid xs={12} sm={6} md={4} key={post.id}>
              <Card
                sx={{
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.01)",
                    boxShadow: 6,
                  },
                }}
                className="on"
              >
                <CardContent
                  className="border border-cyan-400"
                  onClick={() => navigate(`/posts/post-detail/?id=${post.id}`)}
                >
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${categories.find((c) => c.slug === post.category)?.bg || "bg-gray-600"}`}
                  >
                    {t(
                      categories.find((c) => c.slug === post.category)
                        ?.titleKey || `category.${post.category}`
                    )}
                  </span>
                  {/* IMAGE */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    />
                  )}

                  <Typography variant="h5" gutterBottom className="text-center">
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-center"
                  >
                    {post.content?.slice(0, 300)}...
                  </Typography>

                  <Typography variant="caption">
                    Author: <b>@{post.author_name}</b>
                  </Typography>
                  <div className="flex justify-end gap-1 mt-2">
                    <IconButton
                      aria-label="add to favorites"
                      sx={{ color: "red" }}
                    >
                      <FavoriteIcon />
                      <sub className="text-red/70 text-sm">
                        {post?.likes_count || 0}
                      </sub>
                    </IconButton>
                    <IconButton>
                      <FaEye className="text-[#358395]" />
                      <sub className="text-blue/70 text-sm">
                        {post?.views || 0}
                      </sub>
                    </IconButton>
                    <IconButton
                      aria-label="share"
                      sx={{ color: "blue" }}
                      className=""
                    >
                      <ShareIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Posts;
