import { decorate, observable, computed } from "mobx";
import axios from "axios";
import { async } from "q";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class AuthorStore {
  authors = [];

  loading = true;
  authorloading = true;

  query = "";
  author = null;

  fetchAuthors = async () => {
    try {
      const res = await instance.get("/api/authors/");
      const authors = res.data;
      this.authors = authors;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };
  fetchAuthorById = async id => {
    try {
      const res = await instance.get(`/api/authors/${id}`);
      const author = res.data;
      this.author = author;
      this.authorloading = false;
    } catch (err) {
      console.error(err);
    }
  };

  get filteredAuthors() {
    return this.authors.filter(author =>
      `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(this.query.toLowerCase())
    );
  }

  getAuthorById = id => this.authors.find(author => +author.id === +id);
}

decorate(AuthorStore, {
  author: observable,
  authors: observable,
  loading: observable,
  authorloading: observable,
  query: observable,
  filteredAuthors: computed
});

const authorStore = new AuthorStore();
authorStore.fetchAuthors();

export default authorStore;
