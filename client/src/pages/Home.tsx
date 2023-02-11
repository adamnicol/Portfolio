import { NewsFeed } from "./news/NewsFeed";

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <div className="callout">
        <p>
          Hi, thanks for visiting my site. My name is Adam and this is my online
          portfolio and blog. Please use the main menu if you would like to know
          more about what I do.
        </p>
      </div>
      <NewsFeed />
    </div>
  );
}

export default Home;
