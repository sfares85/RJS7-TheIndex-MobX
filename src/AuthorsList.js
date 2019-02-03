import React from "react";
import { observer } from "mobx-react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";

// Store
import authorStore from "./stores/authorStore";

function AuthorsList() {
  const authorCards = authorStore.filteredAuthors.map(author => (
    <AuthorCard key={author.id} author={author} />
  ));

  return (
    <div>
      <h3>Authors</h3>
      <SearchBar store={authorStore} />
      <div className="row">{authorCards}</div>
    </div>
  );
}

export default observer(AuthorsList);
