import React from "react";

export default function Post({ posts }) {
  return <div>{posts.data[0].attributes.Title}</div>;
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/api/posts?populate=*");
  const posts = await res.json();

  const paths = posts.data.map((post) => ({
    params: { slug: post.attributes.Slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const res = await fetch(
    `http://localhost:1337/api/posts?filters[Slug]=${slug}`
  );
  const posts = await res.json();

  return {
    props: { posts },
  };
}
