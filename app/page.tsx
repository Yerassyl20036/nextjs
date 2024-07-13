"use client";

// Import necessary dependencies
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "./api/api";
import styled from "styled-components";
import BlockRendererClient from "@/components/BlockRendererClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";

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

// Define Home component
const Home = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Fetch posts from Strapi
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/blogs");
        console.log(res.data.data);
        setPosts(res.data.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <div className="prose dark:prose-invert">
        {posts.map((post) => (
          <article key={post.id} className="flex justify-between items-center">
            <div>
              <Link href={"/blogs/" + post.attributes.slug}>
                <h2>{post.attributes.Title}</h2>
              </Link>
              {<p>{post.attributes.Description}</p>}
            </div>
            <div>
              <p>{post.attributes.Author}</p>
              <p>
                {new Date(post.attributes.Publishedat).toLocaleDateString()}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
