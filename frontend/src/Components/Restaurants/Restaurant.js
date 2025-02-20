import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./MyCard.css";

function MyCard({ restaurant }) {
    return (
        <div className="card">
            {/* Restaurant Cover Image */}
            <Card.Img variant="top" src={restaurant.coverImage} className="coverImage" />

            {/* Restaurant Details */}
            <Card.Body className="card-body">
                <Card.Title className="restaurant-name">{restaurant.name}</Card.Title>

                {/* Address & Contact */}
                <p className="restaurant-info">
                    {restaurant.address} | 📞 {restaurant.contact}
                </p>

                {/* Cuisines Section */}
                {/* Cuisines Section */}
                <div className="cuisines-container">
                    {restaurant.cuisines.length > 0 ? (
                        restaurant.cuisines.map((cuisine, index) => (
                            <span key={index} className="cuisine-tag">
                                {cuisine.category}
                            </span>
                        ))
                    ) : (
                        <p className="no-cuisines">No cuisines available</p>
                    )}
                </div>

                {/* Add to Cart Button */}
                <Button variant="primary">Add to Cart</Button>
            </Card.Body>
        </div>
    );
}

export default MyCard;
