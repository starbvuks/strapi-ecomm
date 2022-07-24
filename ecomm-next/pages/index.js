import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      {posts &&
        posts.data.map((post) => (
          <div>
            <h2>{post.attributes.Title}</h2>
            <h3>{post.attributes.user.data.attributes.username}</h3>
          </div>
        ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/api/posts?populate=*");
  const posts = await res.json();

  // posts.data.attributes to access data
  console.log(posts.data[1].attributes.user.data.attributes.username);

  return {
    props: { posts },
  };
}
