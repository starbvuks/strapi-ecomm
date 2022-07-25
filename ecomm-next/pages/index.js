import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      {posts &&
        posts.data.map((post) => (
          <div className={styles.blogs}>
            {post &&
              post.attributes.image.data.map((pos) => (
                <img
                  style={{ maxWidth: "20%" }}
                  src={`http://localhost:1337${pos.attributes.url}`}
                />
              ))}
            {console.log(post.attributes.image.data)}
            <h2>{post.attributes.title}</h2>
            <h3 className={styles.author}>{post.attributes.price}</h3>
            <h3 className={styles.author}>SKU: {post.attributes.SKU}</h3>
            <h4 className={styles.author}>
              Category: {post.attributes.category.data.attributes.title}
            </h4>
            <p>{post.attributes.description}</p>
          </div>
        ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  // const res = await fetch("http://localhost:1337/api/posts?populate=*");
  const posts = await res.json();

  // console.log(posts.data[0].attributes.category.data.attributes.title);

  // posts.data.attributes to access data
  // console.log(posts.data[1].attributes.user.data.attributes.username);

  return {
    props: { posts },
  };
}
