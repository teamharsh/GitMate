import SearchBox from "./component/SearchBox";

// const GithubApi = "https://api.github.com/users/";

function App() {
  return (
    <div className="bg-gray-900 h-screen">
      <div className="flex justify-center m-8 ">
        <h1 className="text-white text-4xl font-mono ">Github Profile</h1>
      </div>
      <SearchBox />
    </div>
  );
}

export default App;
