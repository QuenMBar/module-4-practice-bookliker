import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import BookList from "./BookList";
import BookContainer from "./BookContainer";

class App extends Component {
    state = {
        bookList: [],
        currentBook: {
            title: "Book Title",
            img_url: "https://react.semantic-ui.com/images/wireframe/image.png",
            description: "Book description",
            users: [{ id: -1, username: "Username" }],
            id: 0,
        },
    };

    componentDidMount() {
        fetch("http://localhost:3000/books")
            .then((res) => res.json())
            .then((bookList) => {
                this.setState({ bookList });
            });
    }

    patchUsers = () => {
        if (this.state.currentBook.id) {
            let userElemInd = this.state.currentBook.users.findIndex((user) => user.username === "pouros");
            if (userElemInd === -1) {
                const data = { users: [...this.state.currentBook.users] };
                data.users.push({ id: 1, username: "pouros" });
                this.patchRequest(data);
            } else {
                const data = { users: [...this.state.currentBook.users] };
                data.users.splice(userElemInd, 1);
                this.patchRequest(data);
            }
        }
    };

    patchRequest = (data) => {
        fetch(`http://localhost:3000/books/${this.state.currentBook.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((currentBook) => {
                this.setState({ currentBook });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    setBook = (id) => {
        let currentBook = this.state.bookList.find((book) => book.id === id);
        this.setState({ currentBook });
    };

    render() {
        return (
            <div>
                <Menu inverted>
                    <Menu.Item header>Bookliker</Menu.Item>
                </Menu>
                <main>
                    <Menu vertical inverted>
                        <BookList setBook={this.setBook} books={this.state.bookList} />
                    </Menu>
                    <BookContainer patchUsers={this.patchUsers} currentBook={this.state.currentBook} />
                </main>
            </div>
        );
    }
}

export default App;
