import News from "./news/News";

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <div className="callout">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          hic nobis aliquid iure laborum eum, fugit obcaecati maiores fuga illum
          nemo, similique eaque ratione quo inventore eos error soluta. Eius?
        </p>
      </div>
      <News />
    </div>
  );
}

export default Home;
