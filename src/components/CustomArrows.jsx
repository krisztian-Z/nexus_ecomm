import React from "react";

const arrowStyle = {
  display: "flex",
  background: "black",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  zIndex: 2, // Ensure arrows are above the slides
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...arrowStyle, left: "-50px", top: "50%", transform: "translateY(-50%)" }} // Adjusted left arrow position
      onClick={onClick}
    >
      <i className="slick-prev-icon" style={{ color: "white", fontSize: "20px" }}>‹</i>
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...arrowStyle, right: "-50px", top: "50%", transform: "translateY(-50%)" }} // Adjusted right arrow position
      onClick={onClick}
    >
      <i className="slick-next-icon" style={{ color: "white", fontSize: "20px" }}>›</i>
    </div>
  );
};

export { CustomPrevArrow, CustomNextArrow };







// import React from "react";

// const arrowStyle = {
//   display: "block",
//   background: "black",
//   borderRadius: "50%",
//   width: "40px",
//   height: "40px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   position: "absolute",
//   zIndex: 2, // Ensure arrows are above the slides
// };

// const CustomPrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, ...arrowStyle, left: "-50px", top: "50%", transform: "translateY(-50%)" }} // Adjusted left arrow position
//       onClick={onClick}
//     >
//       <i className="slick-prev-icon" style={{ color: "white", fontSize: "20px" }}>‹</i>
//     </div>
//   );
// };

// const CustomNextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, ...arrowStyle, right: "-50px", top: "50%", transform: "translateY(-50%)" }} // Adjusted right arrow position
//       onClick={onClick}
//     >
//       <i className="slick-next-icon" style={{ color: "white", fontSize: "20px" }}>›</i>
//     </div>
//   );
// };

// export { CustomPrevArrow, CustomNextArrow };
