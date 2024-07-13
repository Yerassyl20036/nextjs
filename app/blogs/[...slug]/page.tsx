"use client";

// Import necessary dependencies
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import api from "../../api/api";
import styled from "styled-components";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "@/components/BlockRendererClient";

// Define types for blog post
type BlogPost = {
  id: number;
  attributes: {
    Title: string;
    Description: string;
    Content: BlocksContent;
    Publishedat: string;
    Author: string;
    slug: string;
  };
};

// Define Post component
const Post = (props: { params: { slug: string[] } }) => {
  console.log(props);
  // const router = useRouter();
  // const { slug } = router;
  const [post, setPost] = useState<BlogPost | null>(null);

  // Fetch individual post from Strapi
  useEffect(() => {
    const slug = props.params.slug[0];
    if (slug) {
      const fetchPost = async () => {
        try {
          const res = await api.get(`/blogs/${slug}`);
          setPost(res.data.data);
        } catch (error) {
          console.error("Error fetching blog post:", error);
        }
      };
      fetchPost();
    }
  }, []);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-container">
      <div className="post-header">
        <h1 className="post-title">{post.attributes.Title}</h1>
        <p className="post-description">{post.attributes.Description}</p>
      </div>
      <div className="post-meta">
        <p className="post-author">{post.attributes.Author}</p>
        <p className="post-publishedat">{new Date(post.attributes.Publishedat).toLocaleDateString()}</p>
      </div>
      <hr />
      <BlockRendererClient content={post.attributes.Content} />
    </div>
  );
};

export default Post;
