import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./MyCard.css";
import { NavLink } from "react-router-dom";

function MyCard({ restaurant }) {
    return (
        <div className="card">
            <Card.Img variant="top" src={restaurant.coverImage} className="coverImage" />
            <Card.Body className="card-body">
                <Card.Title className="restaurant-name">{restaurant.name}</Card.Title>
                <p className="restaurant-info">
                    {restaurant.address} | 📞 {restaurant.contact}
                </p>

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

                {/* Use NavLink with dynamic ID */}
                <NavLink to={`/restaurant/${restaurant._id}`}>
                    <Button className="restaurant-details-btn">Details</Button>
                </NavLink>
            </Card.Body>
        </div>
    );
}

export default MyCard;
