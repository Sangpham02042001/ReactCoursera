import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle heading>{dish.name}</CardTitle>
                                <CardText>
                                    {dish.description}
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-5 m-1">
                        <CardTitle>
                            Comments
                            </CardTitle>
                        <RenderComments comments={dish.comments} />
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div></div>
        );
    }
}

function RenderComments({ comments }) {
    const memu = comments.map((ele) => {
        return (
            <div key={ele.id}>
                <CardText>{ele.comment}</CardText>
                <CardText>-- {ele.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(ele.date)))}</CardText>
            </div>
        );
    });

    return (
        <div>
            {memu}
        </div>
    )
}

const DishDetail = (props) => {
    return (
        <RenderDish dish={props.dish} />
    )
}

export default DishDetail;