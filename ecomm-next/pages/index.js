import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home({ posts, flavors }) {
  const [currFlavor, setCurrFlavor] = useState("Zero Sugar");

  function handleSubmit(id) {
    fetch(`http://localhost:1337/api/flavors/${id}?populate=*`)
      .then((data) => data.json())
      .then((data) => setCurrFlavor(data))
      .catch((error) => console.log(error));

    // console.log(currFlavor.data.attributes.image.data[0].attributes.url);
  }

  return (
    <div className={styles.container}>
      {posts &&
        posts.data.map((post) => (
          <div className={styles.blogs}>
            {post &&
              post.attributes.image.data.map((pos) =>
                currFlavor.data ? (
                  <img
                    style={{ maxWidth: "20%" }}
                    src={`http://localhost:1337${currFlavor.data.attributes.image.data[0].attributes.url}`}
                  />
                ) : (
                  <img
                    style={{ maxWidth: "20%" }}
                    src={`http://localhost:1337${pos.attributes.url}`}
                  />
                )
              )}
            <h2>{post.attributes.title}</h2>
            {currFlavor.data ? (
              <h2>Flavor: {currFlavor.data.attributes.title}</h2>
            ) : (
              <h2>Flavor: {currFlavor}</h2>
            )}
            <h3 className={styles.author}>{post.attributes.price}</h3>
            <h3 className={styles.author}>SKU: {post.attributes.SKU}</h3>
            <h4 className={styles.author}>
              Category: {post.attributes.category.data.attributes.title}
            </h4>
            <p>{post.attributes.description}</p>
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

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  const res2 = await fetch("http://localhost:1337/api/flavors?populate=*");
  // const res = await fetch("http://localhost:1337/api/posts?populate=*");

  const posts = await res.json();
  const flavors = await res2.json();

  // console.log(posts.data[0].attributes.category.data.attributes.title);

  // posts.data.attributes to access data
  // console.log(posts.data[1].attributes.user.data.attributes.username);

  return {
    props: { posts, flavors },
  };
}
