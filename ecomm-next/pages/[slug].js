import { React, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Post({ posts, flavors }) {
  const [currFlavor, setCurrFlavor] = useState("Zero Sugar");
  // console.log(posts.data[0].attributes.image.data[0]);

  function handleSubmit(id) {
    fetch(`http://localhost:1337/api/flavors/${id}?populate=*`)
      .then((data) => data.json())
      .then((data) => setCurrFlavor(data))
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.container}>
      {posts &&
        posts.data.map((post) => (
          <div className={styles.blogs}>
            {currFlavor.data ? (
              <img
                style={{ maxWidth: "20%" }}
                src={`http://localhost:1337${currFlavor.data.attributes.image.data[0].attributes.url}`}
              />
            ) : (
              <img
                style={{ maxWidth: "20%" }}
                src={`http://localhost:1337${post.attributes.image.data[0].attributes.url}`}
              />
            )}
            <h2>{post.attributes.title}</h2>
            {currFlavor.data ? (
              <h2>Flavor: {currFlavor.data.attributes.title}</h2>
            ) : (
              <h2>Flavor: {currFlavor}</h2>
            )}
            <h3 className={styles.author}>Price: {post.attributes.price}</h3>
            {flavors &&
              flavors.data.map((flavor) => (
                <button onClick={() => handleSubmit(flavor.id)}>
                  {flavor.attributes.title}
                </button>
              ))}
          </div>
        ))}
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  const posts = await res.json();

  const paths = posts.data.map((post) => ({
    params: { slug: post.attributes.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const res = await fetch(
    `http://localhost:1337/api/products?filters[slug]=${slug}&populate=*`
  );
  const posts = await res.json();

  const res2 = await fetch("http://localhost:1337/api/flavors?populate=*");
  const flavors = await res2.json();

  return {
    props: { posts, flavors },
  };
}
