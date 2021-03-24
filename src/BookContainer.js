import { Container, Header, Button, List, Image } from "semantic-ui-react";
import React from "react";

const BookContainer = (props) => {
    return (
        <Container text>
            <Header>{props.currentBook.title}</Header>
            <Image src={props.currentBook.img_url} size="small" />
            <p>{props.currentBook.description}</p>
            <Button
                color="red"
                content="Like"
                icon="heart"
                label={{
                    basic: true,
                    color: "red",
                    pointing: "left",
                    content: "2,048",
                }}
                onClick={props.patchUsers}
            />
            <Header>Liked by</Header>
            <List>
                {props.currentBook.users.map((user) => {
                    return <List.Item icon="user" content={user.username} />;
                })}
            </List>
        </Container>
    );
};

export default BookContainer;
