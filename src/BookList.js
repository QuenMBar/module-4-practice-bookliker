import React, { Fragment } from "react";
import { Menu } from "semantic-ui-react";

const BookList = (props) => {
    return (
        <Fragment>
            {props.books.map((book) => (
                <Menu.Item as={"a"} onClick={() => props.setBook(book.id)}>
                    {book.title}
                </Menu.Item>
            ))}
        </Fragment>
    );
};

export default BookList;
