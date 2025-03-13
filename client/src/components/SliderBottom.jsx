import { Link } from "react-router-dom";
import "../styles/Slider.css";

const SliderBottom = () => {
  return (
    <div className="slider">
     
        <Link to="/products" className="slider-button">More Details</Link>
     
    </div>
  );
};

export default SliderBottom;
