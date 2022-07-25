import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      {posts &&
        posts.data.map((post) => (
          <div className={styles.blogs}>
            <img
              style={{ maxWidth: "20%" }}
              src={`http://localhost:1337${posts.data[0].attributes.image.data[0].attributes.url}`}
            />
            <h2>{post.attributes.title}</h2>
            <h3 className={styles.author}>{post.attributes.price}</h3>
            <p>{post.attributes.description}</p>
            <br></br>
          </div>
        ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  // const res = await fetch("http://localhost:1337/api/posts?populate=*");
  const posts = await res.json();

  console.log(posts.data[0].attributes.image.data[0].attributes.url);

  // posts.data.attributes to access data
  // console.log(posts.data[1].attributes.user.data.attributes.username);

  return {
    props: { posts },
  };
}
