import { useState } from "react";

const GithubApi = "https://api.github.com/users/";

function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    fetch(GithubApi + searchQuery)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("User not found");
      })
      .then((data) => {
        setUserData(data);
        setError(null);
      })
      .catch((error) => {
        setUserData(null);
        setError(error.message);
      });
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
      {error && (
        <div className="flex justify-center mt-4">
          <p className="text-red-500 font-bold">{error}</p>
        </div>
      )}
      {userData && (
        <div className=" p-4 rounded-lg flex justify-center items-center">
          {/* <p className="text-lg font-bold">User Found:</p> */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-center items-center">
            <img
              className="rounded-full w-16 h-16 mr-4"
              src={userData.avatar_url}
              alt={userData.login}
            />
            <div>
              <h1 className="text-xl font-bold">{userData.name}</h1>
              <p className="text-base text-gray-600">{userData.login}</p>
              <p className="text-base">{userData.bio}</p>
              <p className="text-base">Public Repos: {userData.public_repos}</p>
              <p className="text-base">Followers: {userData.followers}</p>
              <p className="text-base">Following: {userData.following}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchBox;
