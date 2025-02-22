import Carousel from "react-bootstrap/Carousel";

function FoodImageCarousel({ restaurant }) {
    return (
        <>
            {restaurant?.images?.length > 0 ? (
                <Carousel data-bs-theme="dark" interval={2000} controls indicators>
                    {restaurant.images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img className="d-block w-100" src={image.url} alt={`Slide ${index + 1}`} />
                            <Carousel.Caption>
                                <h5>{`Slide ${index + 1}`}</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <p>Loading images...</p>
            )}
        </>
    );
}

export default FoodImageCarousel;
