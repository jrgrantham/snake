const Infopanel = ({ snakePosition, snakeLength, interval, dimensions }) => {
  return (
    <div className="text-sm">
      <div>{`Dimensions ${dimensions.rows} x ${dimensions.cols}`}</div>
      <div>{`Interval (ms) ${interval}`}</div>
      <div>{`Snake head ${snakePosition[[0][0]]}`}</div>
    </div>
  );
};

export default Infopanel;
