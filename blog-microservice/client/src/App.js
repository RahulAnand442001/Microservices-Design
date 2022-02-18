import "./App.css";
import PostCreate from "./components/PostComponents/PostCreate";
import PostList from "./components/PostComponents/PostList";

function App() {
  return (
    <div className="App">
      <header className="header__primary">
        <span>BLOG APP</span>
        <hr />
      </header>
      <main>
        <PostCreate />
        <h1 className="m-3 p- post-list-header">POSTS</h1>
        <PostList />
      </main>
    </div>
  );
}

export default App;
