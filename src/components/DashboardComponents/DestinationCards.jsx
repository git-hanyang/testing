import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

//destructuring props to get only the key and its value
function DestinationCards({data}) {

  const cityName = data.data.attributes.name;
  const cityBudget = data.data.attributes.budget[cityName].text;
  const cityRating = Math.round(data.data.attributes.average_rating*10)/10;

  const included = data.included;
        const photoId = included[0].relationships.featured_photo.data.id;
        const photo = included.find(
            (item) => item.id !== photoId && item.type === "photo"
          ).attributes.image.medium;

  // function display(){
  //   console.log(data)
  //   console.log(photo)
  // }

  return (
    <>
    
    <Card className="flex-grow-0 flex-shrink-0 w-25 text-start">
      <Card.Body>
      

      
        <div className="img-wrap">
          <img src={photo} alt={photo} />
        </div>

        <Card.Title>{cityName}</Card.Title>

        <Card.Text>
          Budget : {cityBudget}
          <br />
          Rating : {cityRating}/5
        </Card.Text>
        <LinkContainer to={`/destination/${data.data.attributes.slug}`}>
          <Button variant="primary">See More</Button>
        </LinkContainer>
      </Card.Body>
    </Card>

    </>
  );
}

export default DestinationCards;
